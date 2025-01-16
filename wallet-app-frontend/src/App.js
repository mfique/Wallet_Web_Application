import React, { useState } from 'react';
import BankingInfo from './components/auth/BankingInfo';
import LoginStep from './components/auth/LoginStep';
import SignUpStep from './components/auth/SignUpStep';
import ForgotPasswordStep from './components/auth/ForgotPasswordStep';
import VerificationStep from './components/auth/VerificationStep';

const App = () => {
  const [step, setStep] = useState('login'); // login, verify, signup, forgot-password, or complete

  const handleLogin = () => {
    setStep('verify');
  };

  const handleVerify = () => {
    setStep('complete');
  };

  const handleSignUp = () => {
    setStep('verify');
  };

  const handleForgotPassword = () => {
    setStep('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 p-4">
        <BankingInfo />
        {step === 'login' && (
          <LoginStep 
            onLogin={handleLogin}
            onSignUp={() => setStep('signup')}
            onForgotPassword={() => setStep('forgot-password')}
          />
        )}
        {step === 'signup' && (
          <SignUpStep 
            onBack={() => setStep('login')}
            onSignUp={handleSignUp}
          />
        )}
        {step === 'forgot-password' && (
          <ForgotPasswordStep 
            onBack={() => setStep('login')}
            onSubmit={() => setStep('login')}
          />
        )}
        {step === 'verify' && (
          <VerificationStep 
            onBack={() => setStep('login')}
            onVerify={handleVerify}
          />
        )}
        {step === 'complete' && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600">Welcome! 🎉</h1>
            <p className="mt-4">Your account has been successfully set up.</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={() => setStep('login')}
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;