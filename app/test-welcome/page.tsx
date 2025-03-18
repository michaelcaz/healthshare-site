'use client'

import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { sendWelcomeEmailAction } from '../actions/welcome-email'

export default function TestWelcomeEmail() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | { success: boolean; error?: string }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      // Create a minimal user object for testing
      const mockUser: User = {
        id: 'test-' + Date.now(),
        email,
        app_metadata: {},
        user_metadata: { first_name: firstName },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as User

      const welcomeResult = await sendWelcomeEmailAction(mockUser, firstName)
      setResult(welcomeResult)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Welcome Email</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-300"
        >
          {isLoading ? 'Sending...' : 'Send Test Welcome Email'}
        </button>
      </form>
      
      {result && (
        <div className={`mt-6 p-4 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <h2 className="font-semibold">Result:</h2>
          <p>{result.success ? 'Email sent successfully!' : `Failed: ${result.error}`}</p>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-medium">Testing Instructions:</h3>
        <ol className="list-decimal pl-5 space-y-1 mt-2">
          <li>Enter a real email address you can check</li>
          <li>Enter a first name</li>
          <li>Click the send button</li>
          <li>Check server logs for detailed results</li>
          <li>Check your email inbox for the welcome email</li>
        </ol>
        <p className="mt-4">
          <strong>Note:</strong> If you're testing in development, make sure the ConvertKit API key and 
          sequence ID are correctly set in your environment variables.
        </p>
      </div>
    </div>
  )
} 