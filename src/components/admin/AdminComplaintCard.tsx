import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  User, 
  Image, 
  MoreHorizontal,
  Eye,
  MessageCircle,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Complaint {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  status: string;
  priority: string;
  location: string;
  coordinates: string;
  reportedBy: string;
  reportedAt: string;
  description: string;
  images: string[];
  department: string;
  resolvedAt?: string;
}

interface AdminComplaintCardProps {
  complaint: Complaint;
  onStatusChange: (id: number, newStatus: string) => void;
}

export const AdminComplaintCard = ({ complaint, onStatusChange }: AdminComplaintCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'resolved': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertTriangle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <Card className="card-civic">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{complaint.title}</h3>
                <Badge className={getPriorityColor(complaint.priority)} variant="secondary">
                  {complaint.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {complaint.reportedBy}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDate(complaint.reportedAt)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(complaint.status)} variant="secondary">
                <div className="flex items-center gap-1">
                  {getStatusIcon(complaint.status)}
                  {complaint.status}
                </div>
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-slate-700">
                  <DropdownMenuItem onClick={() => onStatusChange(complaint.id, 'pending')}>
                    Mark as Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(complaint.id, 'in-progress')}>
                    Mark as In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(complaint.id, 'resolved')}>
                    Mark as Resolved
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Categories and Department */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{complaint.category}</Badge>
            <Badge variant="outline">{complaint.subcategory}</Badge>
            <Badge variant="outline" className="bg-civic-blue/20 text-civic-blue border-civic-blue/30">
              {complaint.department}
            </Badge>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-civic-blue" />
            <span>{complaint.location}</span>
            <span className="text-muted-foreground">({complaint.coordinates})</span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-sm">
              {isExpanded ? complaint.description : complaint.description.substring(0, 150)}
              {complaint.description.length > 150 && (
                <>
                  {!isExpanded && '...'}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="ml-2 text-civic-blue hover:underline text-sm"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Images */}
          {complaint.images.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image className="h-4 w-4" />
              <span>{complaint.images.length} image(s) attached</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Contact Reporter
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              View on Map
            </Button>
          </div>

          {/* Resolution info */}
          {complaint.status === 'resolved' && complaint.resolvedAt && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Resolved on {formatDate(complaint.resolvedAt)}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};