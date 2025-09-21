import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Shield, 
  Settings, 
  Bell, 
  MapPin, 
  Trophy, 
  CheckCircle2, 
  AlertTriangle,
  Edit2,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [userName, setUserName] = useState("Sarah Johnson");
  const [email, setEmail] = useState("sarah.j@email.com");
  const [location, setLocation] = useState("Downtown Seattle");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const { toast } = useToast();

  const userStats = {
    level: 3,
    points: 245,
    reportsSubmitted: 12,
    verificationsCompleted: 28,
    accuracyRate: 94,
    joinDate: "March 2024",
  };

  const recentActivity = [
    {
      id: 1,
      type: "report",
      title: "Traffic Accident on Main Street",
      points: 15,
      timestamp: "2 hours ago",
      status: "verified",
    },
    {
      id: 2,
      type: "verification",
      title: "Power Outage Downtown",
      points: 10,
      timestamp: "1 day ago",
      status: "accurate",
    },
    {
      id: 3,
      type: "verification",
      title: "Road Construction Update",
      points: 10,
      timestamp: "2 days ago",
      status: "accurate",
    },
    {
      id: 4,
      type: "report",
      title: "Water Main Break",
      points: 20,
      timestamp: "3 days ago",
      status: "disputed",
    },
  ];

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleVerificationRequest = () => {
    toast({
      title: "Verification Requested",
      description: "Your ID verification request has been submitted. You'll receive an update within 24 hours.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your TruthTrack activity</p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-xl">{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 w-8 h-8">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <h2 className="text-xl font-semibold">{userName}</h2>
                <Badge className="bg-verified text-verified-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  ID Verified
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{email}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </div>
                <span>•</span>
                <span>Joined {userStats.joinDate}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold text-primary">{userStats.level}</div>
              <div className="text-sm text-muted-foreground">Level</div>
              <Progress value={75} className="w-20 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{userStats.points}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{userStats.reportsSubmitted}</div>
            <div className="text-sm text-muted-foreground">Reports</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{userStats.verificationsCompleted}</div>
            <div className="text-sm text-muted-foreground">Verifications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{userStats.accuracyRate}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      activity.status === 'verified' || activity.status === 'accurate' 
                        ? 'bg-verified text-verified-foreground' 
                        : 'bg-disputed text-disputed-foreground'
                    }`}>
                      {activity.status === 'verified' || activity.status === 'accurate' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{activity.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {activity.type === 'report' ? 'Report submitted' : 'Verification completed'} • {activity.timestamp}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    +{activity.points} pts
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your general location"
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Privacy & Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Push Notifications</div>
                    <div className="text-xs text-muted-foreground">Receive alerts for nearby incidents</div>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Location Sharing</div>
                    <div className="text-xs text-muted-foreground">Allow TruthTrack to access your location</div>
                  </div>
                  <Switch
                    checked={locationSharing}
                    onCheckedChange={setLocationSharing}
                  />
                </div>
              </div>

              <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                ID Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-verified/10 border border-verified/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-verified" />
                <div>
                  <div className="font-medium">Verification Complete</div>
                  <div className="text-sm text-muted-foreground">
                    Your identity has been verified. This increases trust in your reports.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <div className="text-sm font-medium mb-1">Verification Level</div>
                  <div className="text-2xl font-bold text-verified">Level 2</div>
                  <div className="text-xs text-muted-foreground">Government ID + Phone</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Trust Score</div>
                  <div className="text-2xl font-bold text-primary">98/100</div>
                  <div className="text-xs text-muted-foreground">Excellent</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Upgrade Verification</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Upgrade to Level 3 verification by adding biometric confirmation for maximum trust.
                </p>
                <Button variant="outline" onClick={handleVerificationRequest}>
                  Request Level 3 Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;