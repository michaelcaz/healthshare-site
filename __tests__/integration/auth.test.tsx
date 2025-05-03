import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { it, expect, describe, beforeEach } from 'vitest';

// Mock the supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ 
        data: { user: { id: '123', email: 'test@example.com' } },
        error: null
      }),
      signUp: vi.fn().mockResolvedValue({
        data: { user: { id: '123', email: 'test@example.com' } },
        error: null
      }),
      signOut: vi.fn().mockResolvedValue({ error: null })
    }
  })
}));

// Mock the providers
vi.mock('@/components/ui/providers', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    pathname: '/',
  }),
  redirect: vi.fn(),
}));

// Import the components to test
// Adjust these imports based on your actual auth components
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

describe('Authentication Flows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('Login Flow', () => {
    it('allows users to log in with valid credentials', async () => {
      render(<LoginForm />);
      
      // Fill in login form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      });
      
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' },
      });
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
      
      // Verify success state
      await waitFor(() => {
        expect(screen.getByText(/signed in successfully/i)).toBeInTheDocument();
      });
    });
    
    it('displays an error message with invalid credentials', async () => {
      // Override the mock for this test
      const mockSignIn = vi.fn().mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid email or password' }
      });
      
      const supabaseMock = require('@/lib/supabase/client');
      supabaseMock.createClient = () => ({
        auth: {
          signInWithPassword: mockSignIn
        }
      });
      
      render(<LoginForm />);
      
      // Fill in login form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'wrong@example.com' },
      });
      
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'wrongpassword' },
      });
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
      
      // Verify error message
      await waitFor(() => {
        expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
      });
    });
  });
  
  describe('Signup Flow', () => {
    it('allows users to create an account', async () => {
      render(<SignupForm />);
      
      // Fill in signup form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'newuser@example.com' },
      });
      
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'newpassword123' },
      });
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
      
      // Verify success state
      await waitFor(() => {
        expect(screen.getByText(/account created successfully/i)).toBeInTheDocument();
      });
    });
  });
}); 