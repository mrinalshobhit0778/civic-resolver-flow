import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Camera, MapPin, Mic, Upload, X } from "lucide-react";

interface ComplaintFormProps {
  category: string;
  subcategory: string;
  onSubmit: () => void;
}

export const ComplaintForm = ({ category, subcategory, onSubmit }: ComplaintFormProps) => {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    voiceNote: null as File | null,
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileUpload = (type: 'image' | 'voice', file: File) => {
    setFormData(prev => ({
      ...prev,
      [type === 'image' ? 'image' : 'voiceNote']: file
    }));
  };

  const removeFile = (type: 'image' | 'voice') => {
    setFormData(prev => ({
      ...prev,
      [type === 'image' ? 'image' : 'voiceNote']: null
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Complaint Submitted Successfully",
        description: "Your complaint has been registered. You will receive updates on its progress.",
      });
      onSubmit();
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
          toast({
            title: "Location Captured",
            description: "Your current location has been added to the complaint.",
          });
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "Please enter your location manually or enable location services.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Please enter your location manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Info */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="text-center">
            <h3 className="font-semibold text-lg">{subcategory}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Problem Description *</Label>
        <Textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleInputChange}
          className="input-civic min-h-[100px]"
          placeholder="Describe the issue in detail..."
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <div className="flex gap-2">
          <Input
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleInputChange}
            className="input-civic flex-1"
            placeholder="Enter location or coordinates"
          />
          <Button
            type="button"
            onClick={getCurrentLocation}
            className="btn-civic-secondary px-3"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Upload Image</Label>
        {formData.image ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Camera className="h-5 w-5 text-civic-blue" />
                  <span className="text-sm">{formData.image.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile('image')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Upload a photo of the issue</p>
            <Button
              type="button"
              variant="outline"
              className="relative"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Image
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload('image', file);
                }}
              />
            </Button>
          </div>
        )}
      </div>

      {/* Voice Message */}
      <div className="space-y-2">
        <Label>Voice Message (Optional)</Label>
        {formData.voiceNote ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mic className="h-5 w-5 text-civic-green" />
                  <span className="text-sm">{formData.voiceNote.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile('voice')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-full relative"
          >
            <Mic className="h-4 w-4 mr-2" />
            Record Voice Message
            <input
              type="file"
              accept="audio/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('voice', file);
              }}
            />
          </Button>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !formData.description || !formData.location}
        className="w-full btn-civic-primary"
      >
        {isSubmitting ? "Submitting Complaint..." : "Submit Complaint"}
      </Button>
    </form>
  );
};