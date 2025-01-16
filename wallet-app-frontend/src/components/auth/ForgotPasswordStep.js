import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ForgotPasswordStep = ({ onBack, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="hover:bg-gray-100 p-1 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <CardTitle>Reset Password</CardTitle>
          </div>
          <CardDescription>
            Enter your email address and we'll send you instructions to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <Alert>
              <AlertDescription>
                If an account exists with {email}, you will receive password reset instructions at your email address.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Email address</label>
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Instructions
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordStep;