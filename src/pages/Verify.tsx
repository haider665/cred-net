import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Users, CheckCircle2, XCircle, AlertTriangle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IncidentForVerification {
  id: string;
  title: string;
  description: string;
  location: string;
  distance: string;
  timestamp: string;
  reportedBy: string;
  category: string;
  urgency: "low" | "medium" | "high";
  imageCount: number;
}

const Verify = () => {
  const [selectedIncident, setSelectedIncident] = useState<IncidentForVerification | null>(null);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const incidentsToVerify: IncidentForVerification[] = [
    {
      id: "1",
      title: "Road Construction Blocking Lane",
      description: "Unexpected road work has started on Highway 101, causing significant delays during rush hour.",
      location: "Highway 101 North",
      distance: "0.5 miles",
      timestamp: "5 minutes ago",
      reportedBy: "Alex K.",
      category: "Traffic",
      urgency: "medium",
      imageCount: 2,
    },
    {
      id: "2",
      title: "Gas Leak Smell Reported",
      description: "Strong gas odor reported in residential area. Emergency services may be en route.",
      location: "Pine Street Residential",
      distance: "0.8 miles",
      timestamp: "12 minutes ago",
      reportedBy: "Maria S.",
      category: "Emergency",
      urgency: "high",
      imageCount: 0,
    },
    {
      id: "3",
      title: "Local Store Offering Free Services",
      description: "Coffee shop reportedly giving away free drinks to celebrate anniversary.",
      location: "Main Street Coffee Co.",
      distance: "1.1 miles",
      timestamp: "25 minutes ago",
      reportedBy: "John D.",
      category: "Other",
      urgency: "low",
      imageCount: 1,
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "border-l-false";
      case "medium": return "border-l-disputed";
      case "low": return "border-l-verified";
      default: return "border-l-muted";
    }
  };

  const handleVerificationSubmit = () => {
    if (!verificationStatus) {
      toast({
        title: "Verification Required",
        description: "Please select whether this report is accurate.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Verification Submitted",
      description: "Thank you for helping verify this incident. You've earned 10 points!",
    });

    setSelectedIncident(null);
    setVerificationStatus("");
    setComment("");
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Verify Incidents</h1>
        <p className="text-muted-foreground">Help validate reports from your area and earn points</p>
      </div>

      {!selectedIncident ? (
        <div className="space-y-4">
          {incidentsToVerify.map((incident) => (
            <Card 
              key={incident.id} 
              className={`transition-all hover:shadow-card cursor-pointer border-l-4 ${getUrgencyColor(incident.urgency)}`}
              onClick={() => setSelectedIncident(incident)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-lg line-clamp-1">{incident.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{incident.location}</span>
                      </div>
                      <span>•</span>
                      <span>{incident.distance}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{incident.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {incident.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {incident.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Reported by {incident.reportedBy}</span>
                    {incident.imageCount > 0 && (
                      <>
                        <span>•</span>
                        <span>{incident.imageCount} photo{incident.imageCount > 1 ? 's' : ''}</span>
                      </>
                    )}
                  </div>
                  
                  <Button size="sm">
                    Verify This Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">{selectedIncident.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedIncident.location}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedIncident.distance}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{selectedIncident.timestamp}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedIncident(null)}>
                Back to List
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Incident Details</h3>
              <p className="text-muted-foreground">{selectedIncident.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Reported by:</span> {selectedIncident.reportedBy}
              </div>
              <div>
                <span className="font-medium">Category:</span> {selectedIncident.category}
              </div>
            </div>

            {selectedIncident.imageCount > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Attached Media</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: selectedIncident.imageCount }).map((_, i) => (
                    <div key={i} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Photo {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Your Verification</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Is this report accurate?</label>
                <Select value={verificationStatus} onValueChange={setVerificationStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select verification status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-verified" />
                        True - I can confirm this is accurate
                      </div>
                    </SelectItem>
                    <SelectItem value="false">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-false" />
                        False - This report is incorrect
                      </div>
                    </SelectItem>
                    <SelectItem value="misleading">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-disputed" />
                        Misleading - Partially true but exaggerated
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Comments (Optional)</label>
                <Textarea
                  placeholder="Provide any additional context or details..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <p className="text-xs text-muted-foreground">
                  Accurate verifications earn you 10 points
                </p>
                <Button onClick={handleVerificationSubmit} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Submit Verification
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Verify;