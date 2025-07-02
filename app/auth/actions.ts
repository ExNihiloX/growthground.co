'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Response type for auth actions
export type AuthResponse = {
  success?: boolean;
  error?: string;
  user?: any;
  redirectTo?: string;
  needsEmailVerification?: boolean;
};

// Validation schemas for form data
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Please enter your name'),
});

/**
 * Server action for user login
 */
export async function login(formData: FormData): Promise<AuthResponse> {
  // Extract and validate form data
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  // Validate inputs
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    return { 
      error: result.error.errors[0].message 
    };
  }

  // Create Supabase client for server environment
  const supabase = await createClient();
  
  // Authenticate the user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Login error:', error.message);
    return { 
      error: 'Invalid email or password' 
    };
  }

  // Successful login
  console.log('User logged in:', data.user.email);
  
  // No need to redirect here - this allows the client to handle
  // success/error states and show appropriate messages
  return { success: true };
}

/**
 * Server action for user signup
 */
export async function signup(formData: FormData): Promise<AuthResponse> {
  // Extract and validate form data
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  
  console.log('Server action signup called with:', { email, name });
  
  // Validate inputs
  const result = signupSchema.safeParse({ email, password, name });
  if (!result.success) {
    console.error('Validation error:', result.error.errors);
    return { 
      error: result.error.errors[0].message 
    };
  }

  // Create Supabase client for server environment
  const supabase = await createClient();
  
  try {
    // Register the user
    console.log('Attempting to create user in Supabase...');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
      },
    });
    
    if (error) {
      console.error('Supabase signup error:', error);
      return { 
        error: error.message || 'Failed to create account' 
      };
    }

    console.log('Supabase signup successful:', { 
      user: data.user?.email, 
      session: !!data.session,
      needsConfirmation: !data.session 
    });

    // Check if email confirmation is required
    const requiresEmailVerification = !data.session;
    
    if (!requiresEmailVerification && data.user) {
      // User is auto-confirmed, create profile
      console.log('User auto-confirmed, creating profile...');
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          name: name,
          email: email,
          avatar_url: null,
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't fail the signup for profile creation errors
      } else {
        console.log('Profile created successfully');
      }

      // Create default user preferences
      const { error: prefsError } = await supabase
        .from('user_preferences')
        .insert({
          id: data.user.id,
          theme: 'light',
          email_notifications: true,
          push_notifications: false,
          reminder_notifications: true,
          profile_visible: true,
          progress_visible: true,
          daily_goal_minutes: 30,
          reminder_time: '09:00',
          autoplay: true,
        });

      if (prefsError) {
        console.error('User preferences creation error:', prefsError);
      }

      // Create initial progress record
      const { error: progressError } = await supabase
        .from('user_progress')
        .insert({
          user_id: data.user.id,
          total_time_spent_minutes: 0,
          current_streak_days: 0,
          last_activity_date: new Date().toISOString().split('T')[0],
        });

      if (progressError) {
        console.error('User progress creation error:', progressError);
      }
    }
    
    return { 
      success: true,
      needsEmailVerification: requiresEmailVerification,
      user: data.user
    };
    
  } catch (err: any) {
    console.error('Unexpected signup error:', err);
    return { 
      error: 'An unexpected error occurred during signup' 
    };
  }
}

/**
 * Server action for password reset request
 */
export async function forgotPassword(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string;
  
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address' };
  }

  // Create Supabase client for server environment
  const supabase = await createClient();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback?next=/auth/reset-password`,
  });
  
  if (error) {
    console.error('Password reset error:', error);
    return { error: 'Failed to send password reset email' };
  }

  return { success: true };
}

/**
 * Server action for password reset execution
 */
export async function resetPassword(formData: FormData): Promise<AuthResponse> {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  
  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }
  
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  // Create Supabase client for server environment
  const supabase = await createClient();
  
  const { error } = await supabase.auth.updateUser({
    password,
  });
  
  if (error) {
    console.error('Reset password error:', error);
    return { error: 'Failed to reset password' };
  }

  return { success: true };
}

/**
 * Server action for user logout
 */
export async function logout(): Promise<AuthResponse> {
  // Create Supabase client for server environment
  const supabase = await createClient();
  
  // Sign out the user
  await supabase.auth.signOut();
  
  // Sign out the user from Supabase should handle most cookie clearing
  // but we'll let the client-side navigation handle the rest
  
  // For security, we will use an alternative approach to ensure logout:
  // We'll return specific instructions to force the client to clear cookies and reload
  
  // Return success with redirect information
  return { success: true, redirectTo: '/' };
}