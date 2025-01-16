import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginStep = ({ onLogin, onForgotPassword, onSignUp }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <CardTitle>Welcome back!</CardTitle>
          </div>
          <CardDescription>Please login to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">E-mail or phone number</label>
              <Input 
                type="text"
                placeholder="Type your e-mail or phone number"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div 
              className="text-sm text-blue-500 hover:underline cursor-pointer"
              onClick={onForgotPassword}
            >
              Forgot Password?
            </div>
            <Button type="submit" className="w-full">
              Log in
            </Button>
            <div className="text-center text-sm">
              Don't have an account? 
              <span 
                className="text-blue-500 hover:underline cursor-pointer ml-1"
                onClick={onSignUp}
              >
                Sign Up
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginStep;