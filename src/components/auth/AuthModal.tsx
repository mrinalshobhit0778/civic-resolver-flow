import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'user' | 'admin';
}

export const AuthModal = ({ isOpen, onClose, userType }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSuccess = () => {
    onClose();
    // Navigate based on user type
    if (userType === 'admin') {
      window.location.href = '/admin-dashboard';
    } else {
      window.location.href = '/user-dashboard';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {userType === 'admin' ? 'Admin Portal' : 'Citizen Portal'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {isLogin ? (
            <LoginForm 
              userType={userType} 
              onSuccess={handleSuccess}
              onToggleMode={() => setIsLogin(false)}
            />
          ) : (
            <SignupForm 
              userType={userType} 
              onSuccess={handleSuccess}
              onToggleMode={() => setIsLogin(true)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};