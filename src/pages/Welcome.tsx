import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, MapPin, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: MapPin,
      title: "Location-Based Reporting",
      description: "Report incidents happening in your area with precise location data",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "Community Verification",
      description: "Help verify reports from others nearby with firsthand knowledge",
      color: "text-verified",
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Gain points for accurate reporting and verification contributions",
      color: "text-disputed",
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "All users are ID-verified to ensure accountability and trust",
      color: "text-purple-600",
    },
  ];

  const slides = [
    {
      title: "Welcome to TruthTrack",
      subtitle: "Combat misinformation through community verification",
      description: "Join a trusted network of local reporters and fact-checkers working together to keep information accurate and reliable.",
    },
    {
      title: "Report Local Incidents",
      subtitle: "Share what's happening around you",
      description: "Use your phone to quickly report local events, emergencies, or news as they unfold. Your location helps others understand what's really happening.",
    },
    {
      title: "Verify Together",
      subtitle: "Help confirm the truth",
      description: "Review reports from others in your area. Use your local knowledge to verify facts and help the community separate truth from misinformation.",
    },
    {
      title: "Earn Recognition",
      subtitle: "Get rewarded for accuracy",
      description: "Build your reputation and earn points for helpful contributions. Redeem rewards while helping create a more informed community.",
    },
  ];

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleGetStarted();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-2xl font-bold">TruthTrack</h1>
        </div>
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
          Community-Verified News
        </Badge>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <Card className="bg-white/95 backdrop-blur-sm shadow-elevation border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-foreground">
              {slides[currentSlide].title}
            </CardTitle>
            <CardDescription className="text-lg font-medium text-primary">
              {slides[currentSlide].subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-center leading-relaxed">
              {slides[currentSlide].description}
            </p>

            {/* Features Grid - Show on first slide */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className={`${feature.color} flex justify-center`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Action Button */}
            <Button 
              onClick={nextSlide} 
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
            >
              {currentSlide === slides.length - 1 ? (
                <>
                  Get Started
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-white/80 text-sm">
          Secure • Community-Driven • Rewarding
        </p>
      </footer>
    </div>
  );
};

export default Welcome;