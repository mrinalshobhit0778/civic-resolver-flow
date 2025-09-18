import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

interface LoginFormProps {
  userType: 'user' | 'admin';
  onSuccess: () => void;
  onToggleMode: () => void;
}

export const LoginForm = ({ userType, onSuccess, onToggleMode }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: `Welcome to ${userType === 'admin' ? 'Admin' : 'Citizen'} Portal!`,
      });
      onSuccess();
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Enter your username"
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
          placeholder="Enter your password"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full btn-civic-primary flex items-center gap-2"
      >
        {isLoading ? (
          "Signing In..."
        ) : (
          <>
            <LogIn className="h-4 w-4" />
            Sign In
          </>
        )}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <button
          type="button"
          onClick={onToggleMode}
          className="text-civic-blue hover:underline font-medium"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};