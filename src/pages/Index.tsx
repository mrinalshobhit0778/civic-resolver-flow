import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, MapPin, Clock, BarChart3, Smartphone } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [userType, setUserType] = useState<'user' | 'admin'>('user');

  const handleRoleSelection = (role: 'user' | 'admin') => {
    setUserType(role);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-civic-blue/10 to-civic-green/10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent">
                Civic Pulse
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                A smart civic engagement platform designed to make cities more responsive, 
                transparent, and citizen-friendly
              </p>
            </div>

            {/* Role Selection Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Button
                size="lg"
                onClick={() => handleRoleSelection('user')}
                className="btn-civic-primary px-8 py-6 text-lg font-semibold flex items-center gap-3 w-full sm:w-auto"
              >
                <Users className="h-6 w-6" />
                Citizen Portal
              </Button>
              <Button
                size="lg"
                onClick={() => handleRoleSelection('admin')}
                className="btn-civic-secondary px-8 py-6 text-lg font-semibold flex items-center gap-3 w-full sm:w-auto"
              >
                <Shield className="h-6 w-6" />
                Admin Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">How Civic Pulse Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bridging the gap between communities and local governments through technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-civic card-civic-hover">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-civic-blue to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Easy Reporting</h3>
                <p className="text-muted-foreground">
                  Report issues like potholes, broken streetlights, or overflowing bins with photos, 
                  location tagging, and voice descriptions
                </p>
              </CardContent>
            </Card>

            <Card className="card-civic card-civic-hover">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-civic-green to-green-600 rounded-2xl flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Tracking</h3>
                <p className="text-muted-foreground">
                  Track your reports through every stage with live updates and notifications 
                  from submission to resolution
                </p>
              </CardContent>
            </Card>

            <Card className="card-civic card-civic-hover">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-civic-orange to-orange-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Automated Routing</h3>
                <p className="text-muted-foreground">
                  Smart system automatically routes reports to the right departments 
                  based on issue type and location
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Admin Tools</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive dashboard for municipal staff to manage and resolve issues efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-civic">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-civic-blue to-blue-600 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Analytics & Reporting</h3>
                </div>
                <p className="text-muted-foreground">
                  Get insights into reporting trends, departmental response times, and overall system effectiveness 
                  to drive better civic engagement and government accountability
                </p>
              </CardContent>
            </Card>

            <Card className="card-civic">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-civic-green to-green-600 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Priority Management</h3>
                </div>
                <p className="text-muted-foreground">
                  Filter and prioritize issues by category, location, or urgency. Assign tasks to departments 
                  and track progress with real-time status updates
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        userType={userType}
      />
    </div>
  );
};

export default Index;