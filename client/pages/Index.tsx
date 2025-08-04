import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Leaf, Brain, Heart, Sun, Moon, Droplets } from "lucide-react";

interface Question {
  id: number;
  category: "physical" | "mental" | "habits" | "environment";
  question: string;
  answers: {
    text: string;
    dosha: "vata" | "pitta" | "kapha";
    score: number;
  }[];
}

interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

interface Results {
  dominant: "vata" | "pitta" | "kapha";
  scores: DoshaScores;
  percentage: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

const questions: Question[] = [
  {
    id: 1,
    category: "physical",
    question: "What best describes your body frame?",
    answers: [
      { text: "Thin, light build with prominent joints", dosha: "vata", score: 2 },
      { text: "Medium build with good muscle definition", dosha: "pitta", score: 2 },
      { text: "Large, solid build with broad shoulders", dosha: "kapha", score: 2 }
    ]
  },
  {
    id: 2,
    category: "physical",
    question: "How is your skin generally?",
    answers: [
      { text: "Dry, rough, thin with visible veins", dosha: "vata", score: 2 },
      { text: "Warm, oily, prone to acne or rashes", dosha: "pitta", score: 2 },
      { text: "Thick, oily, smooth, and cool", dosha: "kapha", score: 2 }
    ]
  },
  {
    id: 3,
    category: "physical",
    question: "What's your natural hair texture?",
    answers: [
      { text: "Dry, brittle, curly or frizzy", dosha: "vata", score: 2 },
      { text: "Fine, straight, oily, early graying", dosha: "pitta", score: 2 },
      { text: "Thick, wavy, lustrous, strong", dosha: "kapha", score: 2 }
    ]
  },
  {
    id: 4,
    category: "physical",
    question: "How is your appetite?",
    answers: [
      { text: "Irregular, I forget to eat or get full quickly", dosha: "vata", score: 2 },
      { text: "Strong, I get irritable when hungry", dosha: "pitta", score: 2 },
      { text: "Steady but can skip meals easily", dosha: "kapha", score: 2 }
    ]
  },
  {
    id: 5,
    category: "mental",
    question: "How do you handle stress?",
    answers: [
      { text: "I get anxious and worry a lot", dosha: "vata", score: 2 },
      { text: "I become irritable and angry", dosha: "pitta", score: 2 },
      { text: "I withdraw and become sluggish", dosha: "kapha", score: 2 }
    ]
  },
  {
    id: 6,
    category: "mental",
    question: "What's your learning style?",
    answers: [
      { text: "Quick to learn but also quick to forget", dosha: "vata", score: 2 },
      { text: "Sharp intellect with good comprehension", dosha: "pitta", score: 2 },
      { text: "Slow to learn but excellent retention", dosha: "kapha", score: 2 }
    ]
  },
  {
    id: 7,
    category: "mental",
    question: "How would you describe your personality?",
    answers: [
      { text: "Creative, enthusiastic, but changeable", dosha: "vata", score: 2 },
      { text: "Determined, focused, and goal-oriented", dosha: "pitta", score: 2 },
      { text: "Calm, steady, and compassionate", dosha: "kapha", score: 2 }
    ]
  },
  {
    id: 8,
    category: "habits",
    question: "What's your sleep pattern like?",
    answers: [
      { text: "Light sleeper, toss and turn, vivid dreams", dosha: "vata", score: 2 },
      { text: "Moderate sleep, wake up refreshed", dosha: "pitta", score: 2 },
      { text: "Deep sleeper, hard to wake up, love long sleep", dosha: "kapha", score: 2 }
    ]
  },
  {
    id: 9,
    category: "habits",
    question: "How is your energy throughout the day?",
    answers: [
      { text: "Comes in bursts, then I crash", dosha: "vata", score: 2 },
      { text: "Steady and intense, peak in midday", dosha: "pitta", score: 2 },
      { text: "Slow to start but steady once going", dosha: "kapha", score: 2 }
    ]
  },
  {
    id: 10,
    category: "environment",
    question: "What weather do you prefer?",
    answers: [
      { text: "Warm, humid weather; dislike cold and wind", dosha: "vata", score: 2 },
      { text: "Cool, dry weather; dislike heat and sun", dosha: "pitta", score: 2 },
      { text: "Warm, dry weather; dislike cold and damp", dosha: "kapha", score: 2 }
    ]
  }
];

const doshaInfo = {
  vata: {
    name: "Vata",
    element: "Air & Space",
    qualities: "Movement, Creativity, Flexibility",
    icon: <Droplets className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Vata governs movement and is associated with creativity, flexibility, and quick thinking.",
    tips: [
      "Maintain regular routines and meal times",
      "Stay warm and avoid excessive cold",
      "Practice calming activities like yoga and meditation",
      "Eat warm, nourishing foods",
      "Get adequate rest and avoid overstimulation"
    ]
  },
  pitta: {
    name: "Pitta",
    element: "Fire & Water",
    qualities: "Transformation, Intelligence, Passion",
    icon: <Sun className="w-6 h-6" />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Pitta governs transformation and is associated with intelligence, passion, and strong digestion.",
    tips: [
      "Keep cool and avoid excessive heat",
      "Practice moderation in all activities",
      "Engage in cooling activities like swimming",
      "Eat cooling foods and avoid spicy meals",
      "Manage stress and avoid excessive competition"
    ]
  },
  kapha: {
    name: "Kapha",
    element: "Earth & Water",
    qualities: "Structure, Stability, Compassion",
    icon: <Leaf className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Kapha governs structure and is associated with stability, compassion, and strong immunity.",
    tips: [
      "Stay active and engage in regular exercise",
      "Embrace variety and new experiences",
      "Eat light, warm foods and avoid heavy meals",
      "Wake up early and avoid excessive sleep",
      "Stimulate your mind with learning and challenges"
    ]
  }
};

export default function Index() {
  const [currentStep, setCurrentStep] = useState<"intro" | "quiz" | "results">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Results | null>(null);

  const handleStartQuiz = () => {
    setCurrentStep("quiz");
  };

  const handleAnswerChange = (questionId: number, answerIndex: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const scores: DoshaScores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const answer = question.answers[parseInt(answerIndex)];
        scores[answer.dosha] += answer.score;
      }
    });

    const total = scores.vata + scores.pitta + scores.kapha;
    const percentage = {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: Math.round((scores.kapha / total) * 100)
    };

    const dominant = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof DoshaScores] > scores[b[0] as keyof DoshaScores] ? a : b
    )[0] as "vata" | "pitta" | "kapha";

    setResults({
      dominant,
      scores,
      percentage
    });
    setCurrentStep("results");
  };

  const resetQuiz = () => {
    setCurrentStep("intro");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
  };

  if (currentStep === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Leaf className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Discover Your Ayurvedic Constitution
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Uncover your unique Prakriti (body constitution) through ancient Ayurvedic wisdom. 
                Learn whether you're primarily Vata, Pitta, or Kapha and get personalized lifestyle recommendations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-blue-200 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Droplets className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-blue-600">Vata</CardTitle>
                  </div>
                  <CardDescription>Air & Space</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Creative, energetic, and quick-thinking. Governs movement and nervous system.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200 hover:border-red-300 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Sun className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className="text-red-600">Pitta</CardTitle>
                  </div>
                  <CardDescription>Fire & Water</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Intelligent, passionate, and goal-oriented. Governs metabolism and transformation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:border-green-300 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-green-600">Kapha</CardTitle>
                  </div>
                  <CardDescription>Earth & Water</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Stable, compassionate, and grounded. Governs structure and immunity.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">What You'll Discover</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Your Dominant Dosha</h4>
                    <p className="text-sm text-muted-foreground">
                      Understand your primary constitution and how it influences your mind and body.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Personalized Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Get tailored recommendations for diet, lifestyle, and wellness practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleStartQuiz} size="lg" className="px-8 py-3 text-lg">
              Start Your Assessment
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              10 questions • Takes about 5 minutes
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "quiz") {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const selectedAnswer = answers[currentQuestion.id];

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {currentQuestion.category}
                </Badge>
              </div>
              <Progress value={progress} className="mb-4" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswer}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                >
                  {currentQuestion.answers.map((answer, index) => (
                    <div key={index} className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                      <Label htmlFor={`answer-${index}`} className="flex-1 cursor-pointer">
                        {answer.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                  >
                    {currentQuestionIndex === questions.length - 1 ? "Get Results" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "results" && results) {
    const dominantDosha = doshaInfo[results.dominant];

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Your Ayurvedic Constitution
              </h1>
              <p className="text-lg text-muted-foreground">
                Based on your responses, here's your personalized Prakriti analysis
              </p>
            </div>

            <div className="grid gap-8 mb-8">
              <Card className={`${dominantDosha.bgColor} border-2`}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-white rounded-full ${dominantDosha.color}`}>
                      {dominantDosha.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        Your Dominant Dosha: {dominantDosha.name}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {dominantDosha.element} • {dominantDosha.qualities}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-6">{dominantDosha.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {results.percentage.vata}%
                      </div>
                      <div className="text-sm text-muted-foreground">Vata</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-1">
                        {results.percentage.pitta}%
                      </div>
                      <div className="text-sm text-muted-foreground">Pitta</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {results.percentage.kapha}%
                      </div>
                      <div className="text-sm text-muted-foreground">Kapha</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personalized Lifestyle Recommendations</CardTitle>
                  <CardDescription>
                    Follow these tips to maintain balance and optimize your wellbeing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dominantDosha.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button onClick={resetQuiz} size="lg">
                Take Assessment Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
