import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Users, Search, Filter, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  distance: string;
  timestamp: string;
  reportedBy: string;
  verificationCount: number;
  status: "pending" | "verified" | "disputed" | "false";
  category: string;
  urgency: "low" | "medium" | "high";
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const mockIncidents: Incident[] = [
    {
      id: "1",
      title: "Traffic Accident on Main Street",
      description: "Multi-vehicle collision blocking two lanes near the shopping center intersection.",
      location: "Main St & 5th Ave",
      distance: "0.3 miles",
      timestamp: "2 minutes ago",
      reportedBy: "Sarah M.",
      verificationCount: 3,
      status: "verified",
      category: "Traffic",
      urgency: "high",
    },
    {
      id: "2", 
      title: "Power Outage in Downtown Area",
      description: "Electricity out for several blocks, traffic lights not working.",
      location: "Downtown District",
      distance: "0.8 miles",
      timestamp: "15 minutes ago",
      reportedBy: "Mike R.",
      verificationCount: 7,
      status: "verified",
      category: "Infrastructure",
      urgency: "medium",
    },
    {
      id: "3",
      title: "Suspicious Activity at Park",
      description: "Unconfirmed reports of suspicious individuals near playground area.",
      location: "Central Park",
      distance: "1.2 miles", 
      timestamp: "32 minutes ago",
      reportedBy: "Anonymous",
      verificationCount: 1,
      status: "disputed",
      category: "Safety",
      urgency: "medium",
    },
    {
      id: "4",
      title: "Water Main Break Reported",
      description: "Large water leak flooding Oak Street near residential area.",
      location: "Oak St",
      distance: "2.1 miles",
      timestamp: "1 hour ago", 
      reportedBy: "Tom K.",
      verificationCount: 5,
      status: "verified",
      category: "Infrastructure",
      urgency: "high",
    },
    {
      id: "5",
      title: "False Fire Alarm at School",
      description: "Fire department confirms false alarm, building evacuated unnecessarily.",
      location: "Lincoln Elementary",
      distance: "0.5 miles",
      timestamp: "2 hours ago",
      reportedBy: "Jennifer L.",
      verificationCount: 8,
      status: "false",
      category: "Emergency",
      urgency: "low",
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="w-4 h-4 text-verified" />;
      case "disputed":
        return <AlertTriangle className="w-4 h-4 text-disputed" />;
      case "false":
        return <XCircle className="w-4 h-4 text-false" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      verified: { color: "bg-verified text-verified-foreground", label: "Verified" },
      disputed: { color: "bg-disputed text-disputed-foreground", label: "Disputed" },
      false: { color: "bg-false text-false-foreground", label: "False" },
      pending: { color: "bg-muted text-muted-foreground", label: "Pending" },
    };
    
    const config = configs[status as keyof typeof configs];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "border-l-false";
      case "medium":
        return "border-l-disputed";
      case "low":
        return "border-l-verified";
      default:
        return "border-l-muted";
    }
  };

  const filteredIncidents = mockIncidents.filter((incident) => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || incident.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Local Incident Feed</h1>
        <p className="text-muted-foreground">Reports from your area awaiting verification</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search incidents, locations, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Traffic">Traffic</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
                <SelectItem value="Weather">Weather</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incident Feed */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <Card 
            key={incident.id} 
            className={cn(
              "transition-all hover:shadow-card cursor-pointer border-l-4",
              getUrgencyColor(incident.urgency)
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg line-clamp-1">{incident.title}</CardTitle>
                    {getStatusIcon(incident.status)}
                  </div>
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
                {getStatusBadge(incident.status)}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {incident.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Reported by {incident.reportedBy}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{incident.verificationCount} verifications</span>
                  </div>
                  <span>•</span>
                  <Badge variant="outline" className="text-xs">
                    {incident.category}
                  </Badge>
                </div>
                
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredIncidents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No incidents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to see more results.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;