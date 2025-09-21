import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, Gift, Coffee, ShoppingBag, Fuel, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  icon: React.ReactNode;
  available: boolean;
}

const Rewards = () => {
  const [currentPoints] = useState(245);
  const [userLevel] = useState(3);
  const { toast } = useToast();

  const rewardCategories = [
    { id: "vouchers", label: "Vouchers", icon: <Gift className="w-4 h-4" /> },
    { id: "food", label: "Food & Drink", icon: <Coffee className="w-4 h-4" /> },
    { id: "retail", label: "Retail", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "services", label: "Services", icon: <Fuel className="w-4 h-4" /> },
  ];

  const rewards: Reward[] = [
    {
      id: "1",
      title: "$5 Coffee Shop Voucher",
      description: "Redeemable at participating local coffee shops",
      pointsCost: 50,
      category: "food",
      icon: <Coffee className="w-6 h-6" />,
      available: true,
    },
    {
      id: "2",
      title: "$10 Gas Station Credit",
      description: "Fuel credit for major gas station chains",
      pointsCost: 100,
      category: "services",
      icon: <Fuel className="w-6 h-6" />,
      available: true,
    },
    {
      id: "3",
      title: "$15 Shopping Voucher",
      description: "General shopping credit for local retailers",
      pointsCost: 150,
      category: "retail",
      icon: <ShoppingBag className="w-6 h-6" />,
      available: true,
    },
    {
      id: "4",
      title: "$25 Amazon Gift Card",
      description: "Digital gift card delivered instantly",
      pointsCost: 250,
      category: "vouchers",
      icon: <Gift className="w-6 h-6" />,
      available: false,
    },
    {
      id: "5",
      title: "$20 Restaurant Voucher",
      description: "Dining credit at participating restaurants",
      pointsCost: 200,
      category: "food",
      icon: <Coffee className="w-6 h-6" />,
      available: true,
    },
    {
      id: "6",
      title: "$50 Premium Voucher",
      description: "High-value voucher for premium services",
      pointsCost: 500,
      category: "vouchers",
      icon: <Star className="w-6 h-6" />,
      available: false,
    },
  ];

  const achievements = [
    { title: "First Report", description: "Submit your first incident report", completed: true },
    { title: "Fact Checker", description: "Verify 10 incidents", completed: true },
    { title: "Community Hero", description: "Reach level 5", completed: false },
    { title: "Truth Seeker", description: "Verify 50 incidents", completed: false },
  ];

  const handleRedeem = (reward: Reward) => {
    if (currentPoints >= reward.pointsCost && reward.available) {
      toast({
        title: "Reward Redeemed!",
        description: `You've redeemed ${reward.title}. Check your email for details.`,
      });
    } else if (!reward.available) {
      toast({
        title: "Insufficient Level",
        description: "This reward requires a higher level to unlock.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.pointsCost - currentPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  const nextLevelPoints = userLevel * 100;
  const progressToNextLevel = (currentPoints % 100);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Rewards & Achievements</h1>
        <p className="text-muted-foreground">Redeem your points for vouchers and rewards</p>
      </div>

      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{currentPoints}</div>
            <div className="text-sm text-muted-foreground">Available Points</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">Level {userLevel}</div>
            <div className="text-sm text-muted-foreground">Current Level</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {userLevel + 1}</span>
                <span>{progressToNextLevel}/100</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {100 - progressToNextLevel} points to next level
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rewards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {rewardCategories.map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-card transition-all">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mx-auto mb-2">
                    {category.icon}
                  </div>
                  <div className="text-sm font-medium">{category.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`transition-all ${!reward.available ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        {reward.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{reward.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {reward.pointsCost} points
                          </Badge>
                          {!reward.available && (
                            <Badge variant="secondary" className="text-xs">
                              Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {reward.description}
                  </p>
                  
                  <Button 
                    onClick={() => handleRedeem(reward)}
                    disabled={currentPoints < reward.pointsCost || !reward.available}
                    className="w-full"
                    variant={currentPoints >= reward.pointsCost && reward.available ? "default" : "outline"}
                  >
                    {currentPoints >= reward.pointsCost && reward.available ? "Redeem" : "Insufficient Points"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`transition-all ${achievement.completed ? 'bg-primary/5 border-primary/20' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      achievement.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                    {achievement.completed && (
                      <Badge className="bg-verified text-verified-foreground">
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Rewards;