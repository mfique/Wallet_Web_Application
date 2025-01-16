import { Button } from '@/components/ui/button';

const VerificationStep = ({ onVerify }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Second Step Verification</CardTitle>
          <CardDescription>Enter the verification code we sent to +38(067)707-77-77</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="text"
              placeholder="Type code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
            <div className="flex justify-between text-sm">
              <span>Didn't get the code? <span className="text-blue-500 hover:underline cursor-pointer">Resend</span></span>
              <span className="text-blue-500 hover:underline cursor-pointer">Call me</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationStep;