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
    color: "text-sky-600",
    bgColor: "bg-gradient-to-br from-sky-50 to-blue-100",
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
    color: "text-indigo-600",
    bgColor: "bg-gradient-to-br from-indigo-50 to-purple-100",
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
    color: "text-teal-600",
    bgColor: "bg-gradient-to-br from-teal-50 to-cyan-100",
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <div className="w-12 h-12 text-primary flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path d="M12 2C12 2 17 5 17 11C17 13.5 15 16 12 16C9 16 7 13.5 7 11C7 5 12 2 12 2Z" />
                      <path d="M12 16C12 16 14 18 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18 12 16 12 16Z" />
                      <circle cx="8" cy="9" r="1.5" opacity="0.7" />
                      <circle cx="16" cy="9" r="1.5" opacity="0.7" />
                      <path d="M8 14C8 14 9.5 15 12 15C14.5 15 16 14 16 14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
                    </svg>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Ayur<span className="text-primary">Balance</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Transform your wellness journey with personalized Ayurvedic insights.
                Discover your unique dosha blueprint and unlock a life of natural balance and vitality.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-sky-200 hover:border-sky-300 transition-colors bg-gradient-to-br from-sky-50 to-blue-50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-100 rounded-lg">
                      <Droplets className="w-6 h-6 text-sky-600" />
                    </div>
                    <CardTitle className="text-sky-600">Vata</CardTitle>
                  </div>
                  <CardDescription>Air & Space</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Creative, energetic, and quick-thinking. Governs movement and nervous system.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-indigo-200 hover:border-indigo-300 transition-colors bg-gradient-to-br from-indigo-50 to-blue-50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Sun className="w-6 h-6 text-indigo-600" />
                    </div>
                    <CardTitle className="text-indigo-600">Pitta</CardTitle>
                  </div>
                  <CardDescription>Fire & Water</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Intelligent, passionate, and goal-oriented. Governs metabolism and transformation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-teal-200 hover:border-teal-300 transition-colors bg-gradient-to-br from-teal-50 to-blue-50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Leaf className="w-6 h-6 text-teal-600" />
                    </div>
                    <CardTitle className="text-teal-600">Kapha</CardTitle>
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
            <p className="text-sm text-muted-foreground mt-4 mb-12">
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

    const getCategoryIcon = (category: string) => {
      switch (category) {
        case "physical": return <Heart className="w-5 h-5" />;
        case "mental": return <Brain className="w-5 h-5" />;
        case "habits": return <Moon className="w-5 h-5" />;
        case "environment": return <Sun className="w-5 h-5" />;
        default: return <Leaf className="w-5 h-5" />;
      }
    };

    const getCategoryColor = (category: string) => {
      switch (category) {
        case "physical": return "from-blue-100 to-sky-100 border-blue-200";
        case "mental": return "from-indigo-100 to-purple-100 border-indigo-200";
        case "habits": return "from-cyan-100 to-blue-100 border-cyan-200";
        case "environment": return "from-slate-100 to-blue-100 border-slate-200";
        default: return "from-blue-100 to-indigo-100 border-blue-200";
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header with enhanced styling */}
            <div className="text-center mb-6 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className={`p-2 sm:p-3 rounded-full bg-gradient-to-r ${getCategoryColor(currentQuestion.category)} backdrop-blur-sm`}>
                  {getCategoryIcon(currentQuestion.category)}
                </div>
                <div>
                  <Badge variant="outline" className="mb-2 capitalize bg-white/70 backdrop-blur-sm text-xs sm:text-sm">
                    {currentQuestion.category} traits
                  </Badge>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6 px-2">
                <div className="w-full bg-white/30 rounded-full h-2 sm:h-3 backdrop-blur-sm border border-white/50">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {Math.round(progress)}% Complete
                </div>
              </div>
            </div>

            {/* Question Card with unique design */}
            <div className="relative px-2 sm:px-0">
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/20 rounded-2xl sm:rounded-3xl blur-xl" />
              <Card className="relative bg-white/70 backdrop-blur-lg border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className={`h-1 sm:h-2 bg-gradient-to-r ${getCategoryColor(currentQuestion.category).replace('100', '400').replace('border-', '')}`} />

                <CardHeader className="pb-4 sm:pb-8 pt-4 sm:pt-8 px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-2xl md:text-3xl font-bold text-center leading-relaxed">
                    {currentQuestion.question}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-4 sm:px-8 pb-6 sm:pb-12">
                  {/* Custom card-based answers */}
                  <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {currentQuestion.answers.map((answer, index) => {
                      const isSelected = selectedAnswer === index.toString();
                      const doshaColors = {
                        vata: "from-sky-50 to-blue-50 border-sky-200 hover:border-sky-300",
                        pitta: "from-indigo-50 to-purple-50 border-indigo-200 hover:border-indigo-300",
                        kapha: "from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-300"
                      };

                      return (
                        <div
                          key={index}
                          onClick={() => handleAnswerChange(currentQuestion.id, index.toString())}
                          className={`
                            relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-lg
                            bg-gradient-to-r ${doshaColors[answer.dosha]}
                            ${isSelected
                              ? 'ring-2 sm:ring-4 ring-primary/30 border-primary shadow-xl scale-[1.01] sm:scale-[1.02]'
                              : 'hover:shadow-md'
                            }
                          `}
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className={`
                              w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0
                              ${isSelected
                                ? 'border-primary bg-primary'
                                : 'border-gray-300 bg-white'
                              }
                            `}>
                              {isSelected && (
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm sm:text-lg font-medium leading-relaxed text-gray-800">
                                {answer.text}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    answer.dosha === 'vata' ? 'text-sky-600 border-sky-200' :
                                    answer.dosha === 'pitta' ? 'text-indigo-600 border-indigo-200' :
                                    'text-teal-600 border-teal-200'
                                  }`}
                                >
                                  {answer.dosha}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Enhanced navigation - responsive */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm order-2 sm:order-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">Back</span>
                    </Button>

                    <div className="text-center order-1 sm:order-2">
                      <div className="text-xs sm:text-sm text-muted-foreground mb-1">
                        {currentQuestionIndex + 1} / {questions.length}
                      </div>
                      <div className="flex gap-1 justify-center">
                        {Array.from({ length: questions.length }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                              i <= currentQuestionIndex ? 'bg-primary' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleNext}
                      disabled={!selectedAnswer}
                      className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg order-3"
                    >
                      <span className="hidden sm:inline">
                        {currentQuestionIndex === questions.length - 1 ? "Get Results" : "Next"}
                      </span>
                      <span className="sm:hidden">
                        {currentQuestionIndex === questions.length - 1 ? "Results" : "Next"}
                      </span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "results" && results) {
    const dominantDosha = doshaInfo[results.dominant];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
