import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Smile, 
  Meh, 
  Frown, 
  Heart,
  Activity,
  Coffee,
  Moon,
  Users,
  Book
} from "lucide-react";

interface MoodCheckInProps {
  onMoodChange: (mood: number) => void;
}

export const MoodCheckIn = ({ onMoodChange }: MoodCheckInProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const moods = [
    { value: 5, label: "Excellent", icon: Smile, color: "mood-excellent", emoji: "😊" },
    { value: 4, label: "Good", icon: Smile, color: "mood-good", emoji: "🙂" },
    { value: 3, label: "Neutral", icon: Meh, color: "mood-neutral", emoji: "😐" },
    { value: 2, label: "Low", icon: Frown, color: "mood-low", emoji: "😕" },
    { value: 1, label: "Poor", icon: Frown, color: "mood-poor", emoji: "😞" },
  ];

  const factors = [
    { id: "sleep", label: "Sleep", icon: Moon },
    { id: "exercise", label: "Exercise", icon: Activity },
    { id: "social", label: "Social", icon: Users },
    { id: "work", label: "Study/Work", icon: Book },
    { id: "nutrition", label: "Nutrition", icon: Coffee },
    { id: "stress", label: "Stress", icon: Heart },
  ];

  const toggleFactor = (factorId: string) => {
    setSelectedFactors(prev => 
      prev.includes(factorId) 
        ? prev.filter(f => f !== factorId)
        : [...prev, factorId]
    );
  };

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select your mood",
        description: "Choose how you're feeling today to continue.",
        variant: "destructive",
      });
      return;
    }

    onMoodChange(selectedMood);
    toast({
      title: "Check-in completed! ✨",
      description: "Your mood has been recorded. Keep up the great work!",
    });

    // Reset form
    setSelectedMood(null);
    setSelectedFactors([]);
    setNotes("");
  };

  return (
    <Card className="mx-auto max-w-2xl bg-gradient-card border-0 shadow-mood">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Daily Mood Check-in</CardTitle>
        <p className="text-muted-foreground">How are you feeling today?</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Selection */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Select your mood</h3>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-center space-y-2 hover:scale-105 ${
                  selectedMood === mood.value
                    ? `border-${mood.color} bg-${mood.color}/10 shadow-lg`
                    : "border-border hover:border-wellness-primary/50"
                }`}
              >
                <div className="text-3xl">{mood.emoji}</div>
                <div className="text-sm font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Factors */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">What's affecting your mood?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {factors.map((factor) => {
              const Icon = factor.icon;
              return (
                <Badge
                  key={factor.id}
                  variant={selectedFactors.includes(factor.id) ? "default" : "outline"}
                  className={`p-3 justify-center cursor-pointer transition-all duration-200 ${
                    selectedFactors.includes(factor.id)
                      ? "bg-wellness-primary text-white"
                      : "hover:bg-wellness-primary/10"
                  }`}
                  onClick={() => toggleFactor(factor.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {factor.label}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Additional notes (optional)</h3>
          <Textarea
            placeholder="Share what's on your mind..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-wellness text-white shadow-wellness hover:shadow-lg transition-all duration-200"
          size="lg"
        >
          Complete Check-in
        </Button>
      </CardContent>
    </Card>
  );
};