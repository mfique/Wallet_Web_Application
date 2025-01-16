import React from 'react';
import { CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const BankingInfo = () => (
  <div className="w-full max-w-md mx-auto p-4">
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-48 h-48 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-24 h-24 text-blue-500" />
            </div>
          </div>
          <h2 className="text-xl font-semibold">Receive payments from any banking system</h2>
          <p className="text-gray-600">Connect your bank cards and create accounts in the selected currency.</p>
          <div className="flex gap-1 mt-4">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default BankingInfo;