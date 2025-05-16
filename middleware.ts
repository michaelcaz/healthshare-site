import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

// In-memory store for rate limiting form submissions
// This is reset when the server restarts, which is okay for basic protection
const formSubmissionMap = new Map<string, { count: number, timestamp: number }>()

// Clean up old entries periodically
const CLEANUP_INTERVAL = 60 * 60 * 1000 // 1 hour
setInterval(() => {
  const now = Date.now()
  // Use Array.from to convert Map entries to an array that can be iterated
  Array.from(formSubmissionMap.entries()).forEach(([ip, data]) => {
    if (now - data.timestamp > CLEANUP_INTERVAL) {
      formSubmissionMap.delete(ip)
    }
  })
}, CLEANUP_INTERVAL)

export async function middleware(req: NextRequest) {
  let res = NextResponse.next()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rate limiting for all requests
  const ip = req.ip ?? req.headers.get('x-forwarded-for')
  const rateLimit = {
    window: 60 * 1000, // 1 minute
    max: 100 // max requests per window
  }

  // Additional rate limiting specifically for questionnaire form submissions
  // This is a much stricter limit since normal users wouldn't submit many forms
  if (req.method === 'POST' && 
      (req.nextUrl.pathname.includes('/api/questionnaire') || 
       req.nextUrl.pathname.includes('/questionnaire-submit'))) {
    
    const formIp = ip || 'unknown-ip'
    const now = Date.now()
    const formRateLimit = {
      window: 3600 * 1000, // 1 hour window
      max: 5 // max 5 submissions per hour per IP
    }

    // Get the existing record or create a new one
    const record = formSubmissionMap.get(formIp) || { count: 0, timestamp: now }
    
    // Reset the count if the window has expired
    if (now - record.timestamp > formRateLimit.window) {
      record.count = 0
      record.timestamp = now
    }
    
    // Check if over the limit
    if (record.count >= formRateLimit.max) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many form submissions. Please try again later.' }),
        { 
          status: 429, 
          headers: { 
            'content-type': 'application/json',
            'Retry-After': '3600'
          } 
        }
      )
    }
    
    // Increment the count and update the map
    record.count++
    formSubmissionMap.set(formIp, record)
  }

  // Protected routes
  if (req.nextUrl.pathname.startsWith('/admin') && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    res = NextResponse.redirect(redirectUrl)
  }

  // Add CSP headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.sentry.io https://*.launchdarkly.com;
    style-src 'self' 'unsafe-inline' https://api.fontshare.com https://cdn.fontshare.com;
    style-src-elem 'self' 'unsafe-inline' https://api.fontshare.com https://cdn.fontshare.com;
    font-src 'self' data: https://api.fontshare.com https://cdn.fontshare.com;
    img-src 'self' https://cdn.sanity.io https://lrwewkxwfgmzkvhozdin.supabase.co https://images.unsplash.com data: blob:;
    connect-src 'self' 
      https://lrwewkxwfgmzkvhozdin.supabase.co 
      https://*.supabase.co 
      https://api.fontshare.com 
      https://cdn.fontshare.com
      https://*.sentry.io
      https://*.launchdarkly.com
      https://events.launchdarkly.com
      wss://*.supabase.co
      https://formspree.io;
    frame-ancestors 'self';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
    worker-src 'self' blob:;
    child-src 'self' blob:;
    frame-src 'self';
    upgrade-insecure-requests;
  `.replace(/\s+/g, ' ').trim()

  // Set security headers
  res.headers.set('Content-Security-Policy', cspHeader)
  res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  res.headers.set('X-XSS-Protection', '1; mode=block')

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 