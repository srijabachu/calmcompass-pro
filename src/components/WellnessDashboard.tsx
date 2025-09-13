import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  TrendingUp, 
  Calendar, 
  Brain, 
  Smile,
  Meh,
  Frown,
  Target,
  BookOpen,
  Lightbulb
} from "lucide-react";
import { MoodCheckIn } from "./MoodCheckIn";
import { MoodChart } from "./MoodChart";
import { WellnessRecommendations } from "./WellnessRecommendations";
import { JournalEntry } from "./JournalEntry";

const WellnessDashboard = () => {
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [weeklyGoalProgress, setWeeklyGoalProgress] = useState(65);

  const moodData = [
    { date: "Mon", mood: 4, energy: 3 },
    { date: "Tue", mood: 3, energy: 4 },
    { date: "Wed", mood: 5, energy: 4 },
    { date: "Thu", mood: 2, energy: 2 },
    { date: "Fri", mood: 4, energy: 5 },
    { date: "Sat", mood: 5, energy: 4 },
    { date: "Sun", mood: 3, energy: 3 },
  ];

  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return <Smile className="h-5 w-5 text-mood-excellent" />;
    if (mood >= 3) return <Meh className="h-5 w-5 text-mood-neutral" />;
    return <Frown className="h-5 w-5 text-mood-poor" />;
  };

  const getMoodLabel = (mood: number) => {
    if (mood >= 5) return "Excellent";
    if (mood >= 4) return "Good";
    if (mood >= 3) return "Neutral";
    if (mood >= 2) return "Low";
    return "Poor";
  };

  return (
    <div className="min-h-screen bg-gradient-wellness p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Student Wellness Monitor</h1>
          <p className="text-white/80 text-lg">Track your mental health and discover personalized wellness insights</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-0 shadow-card-wellness">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {getMoodIcon(currentMood)}
                <span className="font-semibold">{getMoodLabel(currentMood)}</span>
              </div>
              <p className="text-sm text-muted-foreground">Current Mood</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-card-wellness">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-wellness-secondary" />
                <span className="font-semibold">7 Days</span>
              </div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-wellness">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-wellness-accent" />
                <span className="font-semibold">{weeklyGoalProgress}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Weekly Goal</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-wellness">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Brain className="h-5 w-5 text-wellness-focus" />
                <span className="font-semibold">85%</span>
              </div>
              <p className="text-sm text-muted-foreground">Wellness Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white data-[state=active]:text-wellness-primary">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="checkin" className="data-[state=active]:bg-white data-[state=active]:text-wellness-primary">
              Check-in
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-white data-[state=active]:text-wellness-primary">
              Trends
            </TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-white data-[state=active]:text-wellness-primary">
              Journal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-card-wellness">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-wellness-primary" />
                    <span>Today's Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Weekly Wellness Goal</span>
                      <span>{weeklyGoalProgress}%</span>
                    </div>
                    <Progress value={weeklyGoalProgress} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-wellness-calm/20 rounded-lg">
                      <div className="text-2xl font-bold text-wellness-primary">5</div>
                      <div className="text-sm text-muted-foreground">Check-ins</div>
                    </div>
                    <div className="text-center p-3 bg-wellness-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-wellness-secondary">3</div>
                      <div className="text-sm text-muted-foreground">Activities</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <WellnessRecommendations currentMood={currentMood} />
            </div>
          </TabsContent>

          <TabsContent value="checkin">
            <MoodCheckIn onMoodChange={setCurrentMood} />
          </TabsContent>

          <TabsContent value="trends">
            <MoodChart data={moodData} />
          </TabsContent>

          <TabsContent value="journal">
            <JournalEntry />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WellnessDashboard;