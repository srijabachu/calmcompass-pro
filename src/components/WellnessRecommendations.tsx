import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Heart, 
  Activity, 
  Brain, 
  Music, 
  Coffee,
  Users,
  Book,
  Sun,
  Moon
} from "lucide-react";

interface WellnessRecommendationsProps {
  currentMood: number;
}

export const WellnessRecommendations = ({ currentMood }: WellnessRecommendationsProps) => {
  const getRecommendations = (mood: number) => {
    if (mood >= 4) {
      return [
        {
          title: "Maintain Your Momentum",
          description: "You're feeling great! Keep this positive energy going.",
          actions: ["Share your positivity with friends", "Tackle a challenging goal", "Help someone else"],
          icon: Sun,
          color: "wellness-secondary"
        },
        {
          title: "Physical Activity",
          description: "Channel your good mood into energizing activities.",
          actions: ["Go for a run", "Try a new workout", "Dance to your favorite music"],
          icon: Activity,
          color: "wellness-energy"
        }
      ];
    } else if (mood >= 3) {
      return [
        {
          title: "Gentle Boost",
          description: "Small steps can help lift your spirits today.",
          actions: ["Take a short walk", "Listen to uplifting music", "Practice gratitude"],
          icon: Heart,
          color: "wellness-primary"
        },
        {
          title: "Social Connection",
          description: "Connecting with others can brighten your day.",
          actions: ["Call a friend", "Join a study group", "Attend a social event"],
          icon: Users,
          color: "wellness-accent"
        }
      ];
    } else {
      return [
        {
          title: "Self-Care Focus",
          description: "Be gentle with yourself and prioritize comfort.",
          actions: ["Practice deep breathing", "Take a warm shower", "Get extra sleep"],
          icon: Moon,
          color: "wellness-calm"
        },
        {
          title: "Professional Support",
          description: "Consider reaching out for additional support.",
          actions: ["Contact counseling services", "Talk to a trusted adult", "Use campus resources"],
          icon: Brain,
          color: "wellness-focus"
        }
      ];
    }
  };

  const recommendations = getRecommendations(currentMood);

  const quickActions = [
    { label: "5-min meditation", icon: Brain, color: "wellness-focus" },
    { label: "Breathing exercise", icon: Heart, color: "wellness-primary" },
    { label: "Gratitude journal", icon: Book, color: "wellness-secondary" },
    { label: "Play music", icon: Music, color: "wellness-accent" },
  ];

  return (
    <Card className="bg-gradient-card border-0 shadow-card-wellness">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-wellness-accent" />
          <span>Personalized Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Recommendations */}
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div key={index} className="p-4 rounded-lg bg-white/50 space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 text-${rec.color}`} />
                  <h4 className="font-semibold">{rec.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="flex flex-wrap gap-2">
                  {rec.actions.map((action, actionIndex) => (
                    <Badge 
                      key={actionIndex} 
                      variant="outline" 
                      className="text-xs hover:bg-wellness-primary/10 cursor-pointer"
                    >
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start space-x-2 h-auto p-3 hover:bg-wellness-primary/10"
                >
                  <Icon className={`h-4 w-4 text-${action.color}`} />
                  <span className="text-xs">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Emergency Resources */}
        <div className="p-3 bg-wellness-primary/10 rounded-lg border border-wellness-primary/20">
          <h4 className="font-semibold text-sm text-wellness-primary mb-2">Need immediate support?</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• Campus Counseling: (555) 123-4567</p>
            <p>• Crisis Hotline: 988</p>
            <p>• Student Support Services</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};