import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Phone } from "lucide-react";

interface SignupFormProps {
  userType: 'user' | 'admin';
  onSuccess: () => void;
  onToggleMode: () => void;
}

export const SignupForm = ({ userType, onSuccess, onToggleMode }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    aadhar: ''
  });
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!showOtpVerification) {
      // Simulate sending OTP
      setTimeout(() => {
        setIsLoading(false);
        setShowOtpVerification(true);
        toast({
          title: "OTP Sent",
          description: `Verification code sent to ${formData.phone}`,
        });
      }, 1000);
    } else {
      // Simulate OTP verification and account creation
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Account Created Successfully",
          description: "Welcome to Civic Pulse!",
        });
        onSuccess();
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (showOtpVerification) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center space-y-2">
          <Phone className="h-12 w-12 text-civic-blue mx-auto" />
          <h3 className="text-lg font-semibold">Verify Phone Number</h3>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to {formData.phone}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            name="otp"
            type="text"
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input-civic text-center text-lg font-mono"
            placeholder="000000"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || otp.length !== 6}
          className="w-full btn-civic-primary"
        >
          {isLoading ? "Verifying..." : "Verify & Create Account"}
        </Button>

        <button
          type="button"
          onClick={() => setShowOtpVerification(false)}
          className="w-full text-sm text-civic-blue hover:underline"
        >
          ← Back to registration
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="input-civic"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleInputChange}
            className="input-civic"
            placeholder="johndoe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className="input-civic"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleInputChange}
          className="input-civic"
          placeholder="+91 98765 43210"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleInputChange}
          className="input-civic"
          placeholder="Create strong password"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="aadhar">Aadhar Number (Optional)</Label>
        <Input
          id="aadhar"
          name="aadhar"
          type="text"
          value={formData.aadhar}
          onChange={handleInputChange}
          className="input-civic"
          placeholder="XXXX XXXX XXXX"
          maxLength={14}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full btn-civic-primary flex items-center gap-2"
      >
        {isLoading ? (
          "Sending OTP..."
        ) : (
          <>
            <UserPlus className="h-4 w-4" />
            Create Account
          </>
        )}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <button
          type="button"
          onClick={onToggleMode}
          className="text-civic-blue hover:underline font-medium"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};