import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  FileText, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  LogOut,
  Settings
} from "lucide-react";
import { ComplaintModal } from "@/components/complaint/ComplaintModal";

export default function UserDashboard() {
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    phone: "+91 98765 43210"
  };

  // Mock complaints data
  const complaints = [
    {
      id: 1,
      title: "Pothole on Main Street",
      category: "Infrastructure",
      status: "in-progress",
      date: "2024-01-15",
      description: "Large pothole causing traffic issues"
    },
    {
      id: 2,
      title: "Streetlight not working",
      category: "Public Service",
      status: "resolved",
      date: "2024-01-10",
      description: "Street light near park is not functioning"
    },
    {
      id: 3,
      title: "Overflowing garbage bin",
      category: "Environment",
      status: "pending",
      date: "2024-01-20",
      description: "Garbage bin near market is overflowing"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-civic-blue text-white text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="card-civic card-civic-hover cursor-pointer" onClick={() => setShowComplaintModal(true)}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-civic-blue to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">New Complaint</h3>
              <p className="text-sm text-muted-foreground">Report an issue</p>
            </CardContent>
          </Card>

          <Card className="card-civic">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-civic-green to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">My Complaints</h3>
              <p className="text-sm text-muted-foreground">{complaints.length} total</p>
            </CardContent>
          </Card>

          <Card className="card-civic">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-civic-orange to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Feedback</h3>
              <p className="text-sm text-muted-foreground">Share experience</p>
            </CardContent>
          </Card>

          <Card className="card-civic">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Profile</h3>
              <p className="text-sm text-muted-foreground">Update details</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Complaints */}
        <Card className="card-civic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(complaint.status)} mt-2`}></div>
                    <div>
                      <h4 className="font-semibold">{complaint.title}</h4>
                      <p className="text-sm text-muted-foreground">{complaint.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{complaint.category}</Badge>
                        <span className="text-xs text-muted-foreground">{complaint.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(complaint.status)}
                    <Badge className={`${getStatusColor(complaint.status)} text-white border-0`}>
                      {complaint.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Complaint Modal */}
        <ComplaintModal
          isOpen={showComplaintModal}
          onClose={() => setShowComplaintModal(false)}
        />
      </div>
    </div>
  );
}