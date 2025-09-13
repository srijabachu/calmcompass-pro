import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Calendar, BarChart3 } from "lucide-react";

interface MoodData {
  date: string;
  mood: number;
  energy: number;
}

interface MoodChartProps {
  data: MoodData[];
}

export const MoodChart = ({ data }: MoodChartProps) => {
  const getMoodLabel = (mood: number) => {
    if (mood >= 5) return "Excellent";
    if (mood >= 4) return "Good";
    if (mood >= 3) return "Neutral";
    if (mood >= 2) return "Low";
    return "Poor";
  };

  const averageMood = data.reduce((sum, item) => sum + item.mood, 0) / data.length;
  const averageEnergy = data.reduce((sum, item) => sum + item.energy, 0) / data.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{label}</p>
          <div className="space-y-1">
            <p className="text-wellness-primary">
              Mood: {getMoodLabel(payload[0].value)} ({payload[0].value}/5)
            </p>
            <p className="text-wellness-secondary">
              Energy: {payload[1].value}/5
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-0 shadow-card-wellness">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-wellness-primary" />
              <span className="font-semibold">{averageMood.toFixed(1)}/5</span>
            </div>
            <p className="text-sm text-muted-foreground">Average Mood</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-card-wellness">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <BarChart3 className="h-5 w-5 text-wellness-secondary" />
              <span className="font-semibold">{averageEnergy.toFixed(1)}/5</span>
            </div>
            <p className="text-sm text-muted-foreground">Average Energy</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card-wellness">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-wellness-accent" />
              <span className="font-semibold">{data.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Days Tracked</p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Trend Chart */}
      <Card className="bg-gradient-card border-0 shadow-card-wellness">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-wellness-primary" />
            <span>Weekly Mood & Energy Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 5]} 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="hsl(var(--wellness-primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--wellness-primary))", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "hsl(var(--wellness-primary))", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="hsl(var(--wellness-secondary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--wellness-secondary))", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "hsl(var(--wellness-secondary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Breakdown */}
      <Card className="bg-gradient-card border-0 shadow-card-wellness">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-wellness-secondary" />
            <span>Daily Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 5]} 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="mood" 
                fill="hsl(var(--wellness-primary))" 
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
              <Bar 
                dataKey="energy" 
                fill="hsl(var(--wellness-secondary))" 
                radius={[4, 4, 0, 0]}
                opacity={0.6}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};