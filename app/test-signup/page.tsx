'use client'

import { signUp } from '../actions/auth'

export default function TestSignup() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await signUp(formData)
    console.log('Signup result:', result)
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2"
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Test Signup
        </button>
      </form>
    </div>
  )
} 