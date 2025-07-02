'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password cannot be empty'),
});

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Please enter your name'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  hash: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});


/**
 * Server action for user login.
 */
export async function login(formData: FormData) {
  const supabase = createClient();

  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errorQuery = new URLSearchParams({ error: result.error.errors[0].message }).toString();
    return redirect(`/auth/login?${errorQuery}`);
  }

  const { email, password } = result.data;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Login error:', error.message);
    return redirect('/auth/login?error=Invalid email or password');
  }

  return redirect('/dashboard');
}

/**
 * Server action for user signup.
 */
export async function signup(formData: FormData) {
  const supabase = createClient();

  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errorQuery = new URLSearchParams({ error: result.error.errors[0].message }).toString();
    return redirect(`/auth/signup?${errorQuery}`);
  }
  
  const { email, password, name } = result.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error('Supabase signup error:', error);
    return redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user && !data.session) {
    return redirect(`/auth/verification?email=${encodeURIComponent(email)}`);
  }

  return redirect('/dashboard');
}

/**
 * Server action for sending a password reset link.
 */
export async function forgotPassword(formData: FormData) {
  const supabase = createClient();

  const result = forgotPasswordSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errorQuery = new URLSearchParams({ error: result.error.errors[0].message }).toString();
    return redirect(`/auth/forgot-password?${errorQuery}`);
  }

  const { email } = result.data;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
  });

  if (error) {
    console.error('Forgot password error:', error.message);
    return redirect(`/auth/forgot-password?error=${encodeURIComponent('Could not send password reset email.')}`);
  }

  return redirect('/auth/forgot-password?message=Password reset link sent. Please check your email.');
}

/**
 * Server action for resetting the user's password.
 */
export async function resetPassword(formData: FormData) {
  const supabase = createClient();

  const result = resetPasswordSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errorQuery = new URLSearchParams({ error: result.error.errors[0].message }).toString();
    return redirect(`/auth/reset-password?${errorQuery}`);
  }

  const { password, hash } = result.data;

  await supabase.auth.exchangeCodeForSession(hash);

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error('Reset password error:', error.message);
    return redirect(`/auth/reset-password?error=${encodeURIComponent('Failed to reset password. The link may have expired.')}`);
  }

  return redirect('/auth/login?message=Password reset successfully. Please log in.');
}

/**
 * Server action for user logout.
 */
export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/auth/login');
}