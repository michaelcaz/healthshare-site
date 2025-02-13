import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendWelcomeEmail } from '../welcome'

describe('sendWelcomeEmail', () => {
  const mockUser = {
    id: 'test-id',
    email: 'test@example.com',
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
  }

  beforeEach(() => {
    // Mock environment variables
    process.env.CONVERTKIT_API_KEY = 'test-api-key'
    process.env.CONVERTKIT_WELCOME_SEQUENCE_ID = 'test-sequence-id'

    // Mock fetch
    global.fetch = vi.fn()
  })

  it('successfully sends welcome email', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ subscription: { id: 123 } })
    })

    const result = await sendWelcomeEmail({
      user: mockUser,
      firstName: 'Test'
    })

    expect(result).toBe(true)
    expect(fetch).toHaveBeenCalledWith(
      'https://api.convertkit.com/v3/sequences/subscribers',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-api-key'
        },
        body: expect.stringContaining('"email":"test@example.com"')
      })
    )
  })

  it('handles missing configuration', async () => {
    process.env.CONVERTKIT_API_KEY = ''
    process.env.CONVERTKIT_WELCOME_SEQUENCE_ID = ''

    const result = await sendWelcomeEmail({
      user: mockUser,
      firstName: 'Test'
    })

    expect(result).toBe(false)
  })

  it('retries on failure', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ subscription: { id: 123 } })
      })

    const result = await sendWelcomeEmail({
      user: mockUser,
      firstName: 'Test'
    })

    expect(result).toBe(true)
    expect(fetch).toHaveBeenCalledTimes(3)
  })
}) 