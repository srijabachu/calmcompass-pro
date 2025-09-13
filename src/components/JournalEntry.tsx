import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Save, 
  Sparkles, 
  Heart,
  Lightbulb,
  Target
} from "lucide-react";

export const JournalEntry = () => {
  const [journalText, setJournalText] = useState("");
  const [sentiment, setSentiment] = useState<"positive" | "neutral" | "negative" | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const { toast } = useToast();

  // Simple sentiment analysis (in a real app, this would use AI)
  const analyzeSentiment = (text: string) => {
    const positiveWords = ["happy", "good", "great", "amazing", "wonderful", "excited", "grateful", "love", "excellent", "perfect"];
    const negativeWords = ["sad", "bad", "terrible", "awful", "hate", "angry", "frustrated", "worried", "anxious", "stressed"];
    
    const words = text.toLowerCase().split(/\s+/);
    const foundKeywords: string[] = [];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) {
        positiveCount++;
        foundKeywords.push(word);
      } else if (negativeWords.includes(word)) {
        negativeCount++;
        foundKeywords.push(word);
      }
    });
    
    setKeywords([...new Set(foundKeywords)]);
    
    if (positiveCount > negativeCount) {
      setSentiment("positive");
    } else if (negativeCount > positiveCount) {
      setSentiment("negative");
    } else {
      setSentiment("neutral");
    }
  };

  const handleSave = () => {
    if (!journalText.trim()) {
      toast({
        title: "Please write something",
        description: "Your journal entry cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    analyzeSentiment(journalText);
    
    toast({
      title: "Journal entry saved! 📝",
      description: "Your thoughts have been recorded and analyzed.",
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "mood-good";
      case "negative": return "mood-poor";
      default: return "mood-neutral";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <Heart className="h-4 w-4" />;
      case "negative": return <Lightbulb className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getSentimentInsight = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "Your writing shows positive emotions. This is great for your mental wellbeing!";
      case "negative": return "Your writing indicates some challenging emotions. Consider reaching out for support.";
      default: return "Your writing shows balanced emotions. Reflection is a healthy practice.";
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="bg-gradient-card border-0 shadow-card-wellness">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-wellness-primary" />
            <span>Personal Journal</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Express your thoughts and feelings. Your entries will be analyzed to provide insights.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Textarea
              placeholder="What's on your mind today? Share your thoughts, feelings, or experiences..."
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              className="min-h-[200px] resize-none text-base leading-relaxed"
            />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{journalText.length} characters</span>
              <span>{journalText.trim().split(/\s+/).filter(word => word.length > 0).length} words</span>
            </div>
          </div>

          <Button 
            onClick={handleSave}
            className="w-full bg-gradient-wellness text-white shadow-wellness hover:shadow-lg transition-all duration-200"
            size="lg"
          >
            <Save className="h-4 w-4 mr-2" />
            Save & Analyze Entry
          </Button>
        </CardContent>
      </Card>

      {/* Sentiment Analysis Results */}
      {sentiment && (
        <Card className="bg-gradient-card border-0 shadow-card-wellness">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-wellness-accent" />
              <span>Entry Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full bg-${getSentimentColor(sentiment)}/20`}>
                <div className={`text-${getSentimentColor(sentiment)}`}>
                  {getSentimentIcon(sentiment)}
                </div>
              </div>
              <div>
                <div className="font-semibold capitalize">{sentiment} Sentiment</div>
                <div className="text-sm text-muted-foreground">
                  {getSentimentInsight(sentiment)}
                </div>
              </div>
            </div>

            {keywords.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Emotions Detected</h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="capitalize"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-wellness-calm/20 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Wellness Tip</h4>
              <p className="text-sm text-muted-foreground">
                {sentiment === "positive" 
                  ? "Keep nurturing these positive feelings! Consider what specifically contributed to this good mood."
                  : sentiment === "negative"
                  ? "It's okay to have difficult emotions. Consider talking to someone or trying a calming activity."
                  : "Regular journaling helps with emotional awareness. Try to write consistently for better insights."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};