import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  BarChart3,
  LogOut,
  Eye,
  MessageCircle
} from "lucide-react";
import { AdminComplaintCard } from "@/components/admin/AdminComplaintCard";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock admin data
  const admin = {
    name: "Admin User",
    role: "Municipal Officer"
  };

  // Mock complaints data for admin view
  const complaints = [
    {
      id: 1,
      title: "Pothole on Main Street",
      category: "Infrastructure",
      subcategory: "Potholes",
      status: "pending",
      priority: "high",
      location: "Main Street, Sector 15",
      coordinates: "28.4595, 77.0266",
      reportedBy: "John Doe",
      reportedAt: "2024-01-20T10:30:00Z",
      description: "Large pothole causing traffic issues and vehicle damage",
      images: ["pothole1.jpg"],
      department: "Public Works"
    },
    {
      id: 2,
      title: "Streetlight not working",
      category: "Public Service",
      subcategory: "Streetlight Malfunctioning",
      status: "in-progress",
      priority: "medium",
      location: "Park Avenue, Near Central Park",
      coordinates: "28.4601, 77.0285",
      reportedBy: "Jane Smith",
      reportedAt: "2024-01-19T15:45:00Z",
      description: "Street light near park entrance is not functioning since 3 days",
      images: ["streetlight1.jpg"],
      department: "Electrical"
    },
    {
      id: 3,
      title: "Overflowing garbage bin",
      category: "Environment",
      subcategory: "Overflowing Garbage Bins",
      status: "resolved",
      priority: "low",
      location: "Market Square, Shop No. 45",
      coordinates: "28.4588, 77.0299",
      reportedBy: "Mike Johnson",
      reportedAt: "2024-01-18T09:15:00Z",
      description: "Garbage bin near market is overflowing and causing hygiene issues",
      images: ["garbage1.jpg"],
      department: "Sanitation",
      resolvedAt: "2024-01-19T14:30:00Z"
    },
    {
      id: 4,
      title: "Water pipe burst",
      category: "Public Service", 
      subcategory: "Water Supply Leaks",
      status: "in-progress",
      priority: "high",
      location: "Residential Block A, Building 12",
      coordinates: "28.4578, 77.0312",
      reportedBy: "Sarah Wilson",
      reportedAt: "2024-01-20T08:20:00Z",
      description: "Main water pipe burst causing flooding in residential area",
      images: ["waterleak1.jpg", "waterleak2.jpg"],
      department: "Water Works"
    }
  ];

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {admin.name}</p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-civic">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-civic-blue to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Reports</p>
            </CardContent>
          </Card>

          <Card className="card-civic">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>

          <Card className="card-civic">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>

          <Card className="card-civic">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">{stats.resolved}</div>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="card-civic">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, location, or reporter..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-civic pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  className="btn-civic-outline"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('pending')}
                  className="btn-civic-outline"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === 'in-progress' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('in-progress')}
                  className="btn-civic-outline"
                >
                  In Progress
                </Button>
                <Button
                  variant={statusFilter === 'resolved' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('resolved')}
                  className="btn-civic-outline"
                >
                  Resolved
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <Card className="card-civic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Complaints ({filteredComplaints.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <AdminComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onStatusChange={(id, newStatus) => {
                    console.log(`Updating complaint ${id} to status: ${newStatus}`);
                  }}
                />
              ))}
              {filteredComplaints.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No complaints found matching your criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}