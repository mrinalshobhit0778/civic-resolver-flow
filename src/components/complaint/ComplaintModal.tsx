import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Construction, 
  Lightbulb, 
  Trash2, 
  Zap,
  Droplets,
  TreePine,
  AlertTriangle,
  Camera,
  MapPin,
  Mic
} from "lucide-react";
import { ComplaintForm } from "./ComplaintForm";

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintModal = ({ isOpen, onClose }: ComplaintModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'infrastructure',
      title: 'Infrastructure Issues',
      icon: <Construction className="h-8 w-8" />,
      color: 'from-red-500 to-red-600',
      subcategories: [
        { id: 'potholes', title: 'Potholes', icon: <Construction className="h-6 w-6" /> },
        { id: 'damaged-roads', title: 'Damaged Roads', icon: <Construction className="h-6 w-6" /> },
        { id: 'broken-pavements', title: 'Broken Pavements', icon: <Construction className="h-6 w-6" /> },
        { id: 'damaged-bridges', title: 'Damaged Bridges/Flyovers', icon: <Construction className="h-6 w-6" /> },
        { id: 'broken-furniture', title: 'Broken Public Furniture', icon: <AlertTriangle className="h-6 w-6" /> },
        { id: 'others-infra', title: 'Others', icon: <AlertTriangle className="h-6 w-6" /> }
      ]
    },
    {
      id: 'public-service',
      title: 'Public Service',
      icon: <Lightbulb className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      subcategories: [
        { id: 'streetlight', title: 'Streetlight Malfunctioning', icon: <Lightbulb className="h-6 w-6" /> },
        { id: 'traffic-light', title: 'Traffic Light Failure', icon: <Lightbulb className="h-6 w-6" /> },
        { id: 'water-leak', title: 'Water Supply Leaks', icon: <Droplets className="h-6 w-6" /> },
        { id: 'power-outage', title: 'Power Outages', icon: <Zap className="h-6 w-6" /> },
        { id: 'overflowing-bins', title: 'Overflowing Bins', icon: <Trash2 className="h-6 w-6" /> }
      ]
    },
    {
      id: 'environment',
      title: 'Environment & Sanitation',
      icon: <TreePine className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      subcategories: [
        { id: 'garbage-bins', title: 'Overflowing Garbage Bins', icon: <Trash2 className="h-6 w-6" /> },
        { id: 'littering', title: 'Littering', icon: <Trash2 className="h-6 w-6" /> },
        { id: 'blocked-drains', title: 'Blocked Drains/Sewers', icon: <Droplets className="h-6 w-6" /> },
        { id: 'illegal-dumping', title: 'Illegal Dumping', icon: <Trash2 className="h-6 w-6" /> },
        { id: 'stagnant-water', title: 'Stagnant Water', icon: <Droplets className="h-6 w-6" /> }
      ]
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleBack = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    onClose();
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-slate-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {selectedSubcategory ? 'Report Issue' : 
             selectedCategory ? selectedCategoryData?.title : 
             'Select Issue Category'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Back button */}
          {(selectedCategory || selectedSubcategory) && (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="mb-4"
            >
              ← Back
            </Button>
          )}

          {/* Category Selection */}
          {!selectedCategory && (
            <div className="grid gap-4">
              {categories.map((category) => (
                <Card 
                  key={category.id}
                  className="card-civic card-civic-hover cursor-pointer"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{category.title}</h3>
                        <p className="text-muted-foreground">
                          {category.subcategories.length} types available
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Subcategory Selection */}
          {selectedCategory && !selectedSubcategory && selectedCategoryData && (
            <div className="grid sm:grid-cols-2 gap-4">
              {selectedCategoryData.subcategories.map((subcategory) => (
                <Card 
                  key={subcategory.id}
                  className="card-civic card-civic-hover cursor-pointer"
                  onClick={() => handleSubcategorySelect(subcategory.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 bg-gradient-to-br ${selectedCategoryData.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-white`}>
                      {subcategory.icon}
                    </div>
                    <h4 className="font-semibold text-sm">{subcategory.title}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Complaint Form */}
          {selectedSubcategory && selectedCategoryData && (
            <ComplaintForm
              category={selectedCategoryData.title}
              subcategory={selectedCategoryData.subcategories.find(sub => sub.id === selectedSubcategory)?.title || ''}
              onSubmit={() => {
                handleClose();
                // Show success message or redirect
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};