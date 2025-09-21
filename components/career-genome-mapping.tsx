"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: string
  text: string
  category: "psychometric" | "bias" | "neurotype"
  options: { value: string; text: string }[]
}

interface CareerMatch {
  title: string
  similarity: number
  category: string
  growth: string
  explanation: string[]
  vectorMatch: {
    skills: number
    personality: number
    neurotype: number
  }
}

const questions: Question[] = [
  {
    id: "1",
    text: "When facing a complex problem, you typically:",
    category: "psychometric",
    options: [
      { value: "break_down", text: "Break it into smaller, manageable parts" },
      { value: "big_picture", text: "Step back and look at the big picture first" },
      { value: "collaborate", text: "Immediately seek input from others" },
      { value: "research", text: "Research similar problems and solutions" },
    ],
  },
  {
    id: "2",
    text: "In team meetings, you find yourself:",
    category: "bias",
    options: [
      { value: "leading", text: "Naturally taking charge and directing discussion" },
      { value: "supporting", text: "Supporting others' ideas and building consensus" },
      { value: "analyzing", text: "Analyzing proposals for potential issues" },
      { value: "innovating", text: "Proposing creative alternatives" },
    ],
  },
  {
    id: "3",
    text: "Your ideal work environment has:",
    category: "neurotype",
    options: [
      { value: "quiet", text: "Minimal distractions and quiet spaces" },
      { value: "collaborative", text: "Open collaboration and constant interaction" },
      { value: "flexible", text: "Flexible spaces that adapt to different tasks" },
      { value: "structured", text: "Clear structure and defined processes" },
    ],
  },
  {
    id: "4",
    text: "When learning new skills, you prefer:",
    category: "psychometric",
    options: [
      { value: "hands_on", text: "Hands-on practice and experimentation" },
      { value: "theory", text: "Understanding the theory first" },
      { value: "examples", text: "Learning from real-world examples" },
      { value: "teaching", text: "Learning by teaching others" },
    ],
  },
  {
    id: "5",
    text: "Your decision-making style is:",
    category: "bias",
    options: [
      { value: "data_driven", text: "Heavily data-driven and analytical" },
      { value: "intuitive", text: "Intuitive with gut feelings" },
      { value: "consensus", text: "Seeking consensus and multiple perspectives" },
      { value: "rapid", text: "Quick decisions with course correction" },
    ],
  },
]

const careerMatches: CareerMatch[] = [
  {
    title: "AI Ethics Researcher",
    similarity: 94,
    category: "Emerging Tech",
    growth: "312% projected growth",
    explanation: [
      "Your analytical thinking aligns with ethical framework development",
      "Strong bias awareness indicates ethical reasoning capabilities",
      "Preference for structured environments suits research methodology",
    ],
    vectorMatch: { skills: 92, personality: 96, neurotype: 94 },
  },
  {
    title: "Quantum UX Designer",
    similarity: 89,
    category: "Quantum Computing",
    growth: "287% projected growth",
    explanation: [
      "Creative problem-solving matches quantum interface challenges",
      "Collaborative tendencies suit interdisciplinary quantum teams",
      "Learning preference indicates adaptability to emerging field",
    ],
    vectorMatch: { skills: 87, personality: 91, neurotype: 89 },
  },
  {
    title: "Neuro-Marketing Strategist",
    similarity: 86,
    category: "Neuroscience + Marketing",
    growth: "245% projected growth",
    explanation: [
      "Bias awareness crucial for understanding consumer psychology",
      "Data-driven approach aligns with neuroscience methodology",
      "Teaching preference indicates ability to translate complex concepts",
    ],
    vectorMatch: { skills: 84, personality: 88, neurotype: 86 },
  },
  {
    title: "Climate Adaptation Architect",
    similarity: 83,
    category: "Climate Tech",
    growth: "198% projected growth",
    explanation: [
      "Systems thinking essential for climate resilience design",
      "Collaborative approach needed for community engagement",
      "Structured environment preference suits regulatory compliance",
    ],
    vectorMatch: { skills: 81, personality: 85, neurotype: 83 },
  },
]

export function CareerGenomeMapping() {
  const [currentStep, setCurrentStep] = useState<"intro" | "quiz" | "analysis" | "results">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")

  useEffect(() => {
    if (currentStep === "analysis") {
      const timer = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            setCurrentStep("results")
            return 100
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(timer)
    }
  }, [currentStep])

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return

    setAnswers({ ...answers, [questions[currentQuestion].id]: selectedAnswer })
    setSelectedAnswer("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCurrentStep("analysis")
    }
  }

  const getQuestionCategory = (category: string) => {
    switch (category) {
      case "psychometric":
        return { label: "Psychometric", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" }
      case "bias":
        return { label: "Bias Detection", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" }
      case "neurotype":
        return { label: "Neurotype", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" }
      default:
        return { label: "Unknown", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" }
    }
  }

  if (currentStep === "intro") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Career Genome Mapping
          </h1>
          <p className="text-xl text-emerald-200 mb-6">AI-powered multi-dimensional analysis of your career DNA</p>
        </div>

        <Card className="bg-slate-800/50 border-emerald-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-emerald-300 flex items-center gap-2">
              <span className="text-2xl">🧬</span>
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🧠</div>
                <h3 className="font-semibold text-white mb-2">Neuro-Persona Quiz</h3>
                <p className="text-sm text-emerald-200">
                  10-minute assessment combining psychometrics and implicit bias detection
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔬</div>
                <h3 className="font-semibold text-white mb-2">Vector Embedding</h3>
                <p className="text-sm text-emerald-200">
                  AI builds multi-dimensional profile of skills, personality, and neurotype
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-white mb-2">Career Matching</h3>
                <p className="text-sm text-emerald-200">
                  Siamese Neural Networks match against 10,000+ career profiles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-emerald-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-emerald-300">What You'll Discover</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-white mb-2">🎯 Perfect Career Matches</h4>
                <p className="text-sm text-emerald-200 mb-4">
                  Including obscure, high-growth roles you never considered
                </p>
                <h4 className="font-semibold text-white mb-2">📊 SHAP Explanations</h4>
                <p className="text-sm text-emerald-200">Understand exactly why each career fits your unique profile</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">🧬 Career DNA Visualization</h4>
                <p className="text-sm text-emerald-200 mb-4">
                  Interactive genome map showing your professional blueprint
                </p>
                <h4 className="font-semibold text-white mb-2">🚀 Growth Projections</h4>
                <p className="text-sm text-emerald-200">Market demand and salary projections for matched careers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={() => setCurrentStep("quiz")}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-lg"
          >
            Begin Genome Mapping
          </Button>
          <p className="text-sm text-emerald-300 mt-2">⏱️ Takes approximately 10 minutes</p>
        </div>
      </div>
    )
  }

  if (currentStep === "quiz") {
    const question = questions[currentQuestion]
    const category = getQuestionCategory(question.category)
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge className={category.color}>{category.label}</Badge>
            <span className="text-emerald-300">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          <h2 className="text-2xl font-bold text-white mb-6">{question.text}</h2>
        </div>

        <Card className="bg-slate-800/50 border-emerald-500/20">
          <CardContent className="p-6">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-4">
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="text-emerald-100 cursor-pointer flex-1 p-3 rounded-lg hover:bg-emerald-500/10 transition-colors"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
              >
                Previous
              </Button>
              <Button
                onClick={handleAnswerSubmit}
                disabled={!selectedAnswer}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {currentQuestion === questions.length - 1 ? "Complete Analysis" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "analysis") {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Analyzing Your Career Genome</h2>
          <p className="text-emerald-200 mb-8">
            AI is processing your responses using Siamese Neural Networks and SHAP analysis
          </p>
        </div>

        <Card className="bg-slate-800/50 border-emerald-500/20 mb-8">
          <CardContent className="p-8">
            <div className="text-6xl mb-4 animate-pulse">🧬</div>
            <Progress value={analysisProgress} className="mb-4" />
            <p className="text-emerald-300 mb-6">{analysisProgress}% Complete</p>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className={`p-3 rounded-lg ${analysisProgress > 20 ? "bg-emerald-500/20" : "bg-slate-700/50"}`}>
                <div className="text-2xl mb-2">🧠</div>
                <p className="text-emerald-200">Building vector embeddings</p>
              </div>
              <div className={`p-3 rounded-lg ${analysisProgress > 60 ? "bg-emerald-500/20" : "bg-slate-700/50"}`}>
                <div className="text-2xl mb-2">🔍</div>
                <p className="text-emerald-200">Matching against career database</p>
              </div>
              <div className={`p-3 rounded-lg ${analysisProgress > 90 ? "bg-emerald-500/20" : "bg-slate-700/50"}`}>
                <div className="text-2xl mb-2">📊</div>
                <p className="text-emerald-200">Generating SHAP explanations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
          Your Career Genome Results
        </h1>
        <p className="text-xl text-emerald-200">AI-powered analysis of your unique professional DNA</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-emerald-300 flex items-center gap-2">
              <span className="text-2xl">🧬</span>
              Vector Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-emerald-200">Skills Dimension</span>
                  <span className="text-white font-semibold">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-emerald-200">Personality Dimension</span>
                  <span className="text-white font-semibold">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-emerald-200">Neurotype Dimension</span>
                  <span className="text-white font-semibold">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-emerald-300 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Match Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">94%</div>
              <p className="text-emerald-200 mb-4">Overall Compatibility</p>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Exceptional Match</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-emerald-300 flex items-center gap-2">
              <span className="text-2xl">📈</span>
              Growth Potential
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">312%</div>
              <p className="text-emerald-200 mb-4">Projected Growth</p>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">High Demand</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">Top Career Matches</h2>
        {careerMatches.map((career, index) => (
          <Card key={index} className="bg-slate-800/50 border-emerald-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl">{career.title}</CardTitle>
                  <CardDescription className="text-emerald-200">
                    {career.category} • {career.growth}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">{career.similarity}%</div>
                  <p className="text-sm text-emerald-300">Match Score</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">SHAP Analysis Explanation</h4>
                  <ul className="space-y-2">
                    {career.explanation.map((point, i) => (
                      <li key={i} className="text-emerald-200 text-sm flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Vector Compatibility</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-emerald-200 text-sm">Skills Match</span>
                        <span className="text-white text-sm">{career.vectorMatch.skills}%</span>
                      </div>
                      <Progress value={career.vectorMatch.skills} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-emerald-200 text-sm">Personality Match</span>
                        <span className="text-white text-sm">{career.vectorMatch.personality}%</span>
                      </div>
                      <Progress value={career.vectorMatch.personality} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-emerald-200 text-sm">Neurotype Match</span>
                        <span className="text-white text-sm">{career.vectorMatch.neurotype}%</span>
                      </div>
                      <Progress value={career.vectorMatch.neurotype} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={() => {
            setCurrentStep("intro")
            setCurrentQuestion(0)
            setAnswers({})
            setAnalysisProgress(0)
          }}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Retake Assessment
        </Button>
      </div>
    </div>
  )
}
