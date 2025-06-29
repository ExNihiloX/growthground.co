'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MailCheck } from 'lucide-react';

export default function VerificationPage() {
  // Track whether the user is coming from signup
  useEffect(() => {
    // Any page tracking or analytics could go here
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-6">
              <MailCheck className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We've sent you a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>
            Please check your email inbox and click on the verification link to activate your account.
          </p>
          <p className="text-sm text-muted-foreground">
            If you don't see the email, check your spam folder. The link will expire in 24 hours.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/login">Back to login</Link>
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Didn't receive an email? Check your spam or
            <Button variant="link" className="p-0 h-auto text-xs ml-1">
              <Link href="/auth/signup">try again with a different email</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
