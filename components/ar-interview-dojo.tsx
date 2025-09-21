"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const corporateCultures = [
  { name: "Tech Startup", style: "Casual, fast-paced, innovation-focused", difficulty: "Medium" },
  { name: "Investment Banking", style: "Formal, high-pressure, results-driven", difficulty: "Hard" },
  { name: "Creative Agency", style: "Collaborative, artistic, flexible", difficulty: "Easy" },
  { name: "Fortune 500", style: "Structured, hierarchical, process-oriented", difficulty: "Medium" },
  { name: "Consulting Firm", style: "Analytical, client-focused, prestigious", difficulty: "Hard" },
  { name: "Non-Profit", style: "Mission-driven, empathetic, resource-conscious", difficulty: "Easy" },
]

const biofeedbackMetrics = [
  { name: "Voice Stress", value: 0, target: 85, color: "text-blue-400" },
  { name: "Micro-expressions", value: 0, target: 92, color: "text-green-400" },
  { name: "Power Pose", value: 0, target: 78, color: "text-purple-400" },
  { name: "Eye Contact", value: 0, target: 88, color: "text-yellow-400" },
]

const jediQuestions = [
  "Tell me about a time you faced a challenge that seemed impossible.",
  "How do you handle conflict with team members?",
  "Where do you see yourself in 5 years?",
  "What's your greatest weakness?",
  "Why should we hire you over other candidates?",
  "Describe a situation where you had to learn something quickly.",
]

export function ARInterviewDojo() {
  const [selectedCulture, setSelectedCulture] = useState<string>("")
  const [isTraining, setIsTraining] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [metrics, setMetrics] = useState(biofeedbackMetrics)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [holoActive, setHoloActive] = useState(false)

  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        setMetrics((prev) =>
          prev.map((metric) => ({
            ...metric,
            value: Math.min(metric.target, metric.value + Math.random() * 5),
          })),
        )
        setTrainingProgress((prev) => Math.min(100, prev + 2))
      }, 500)

      return () => clearInterval(interval)
    }
  }, [isTraining])

  const startTraining = () => {
    if (!selectedCulture) return
    setIsTraining(true)
    setHoloActive(true)
    setTrainingProgress(0)
    setCurrentQuestion(0)
    setMetrics(biofeedbackMetrics.map((m) => ({ ...m, value: Math.random() * 20 })))
  }

  const nextQuestion = () => {
    if (currentQuestion < jediQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsTraining(false)
      setHoloActive(false)
    }
  }

  const selectedCultureData = corporateCultures.find((c) => c.name === selectedCulture)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            AR Interview Dojo
          </h1>
          <p className="text-emerald-200 text-lg mb-6">Master the art of interviews with holographic AI mentors</p>
          <div className="flex justify-center gap-2 mb-6">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">200+ Corporate Cultures</Badge>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Real-time Biofeedback</Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Jedi Training Mode</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Training Setup */}
          <Card className="bg-slate-800/50 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-emerald-300 flex items-center gap-2">🎯 Training Setup</CardTitle>
              <CardDescription className="text-emerald-200">
                Choose your corporate culture and begin training
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-emerald-300 text-sm font-medium mb-2 block">Corporate Culture</label>
                <Select value={selectedCulture} onValueChange={setSelectedCulture}>
                  <SelectTrigger className="bg-slate-700 border-emerald-500/30">
                    <SelectValue placeholder="Select culture..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-emerald-500/30">
                    {corporateCultures.map((culture) => (
                      <SelectItem key={culture.name} value={culture.name}>
                        <div className="flex items-center gap-2">
                          <span>{culture.name}</span>
                          <Badge
                            size="sm"
                            className={
                              culture.difficulty === "Easy"
                                ? "bg-green-500/20 text-green-300"
                                : culture.difficulty === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-red-500/20 text-red-300"
                            }
                          >
                            {culture.difficulty}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCultureData && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-emerald-300 text-sm font-medium mb-1">Culture Style:</p>
                  <p className="text-emerald-200 text-sm">{selectedCultureData.style}</p>
                </div>
              )}

              <Button
                onClick={startTraining}
                disabled={!selectedCulture || isTraining}
                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
              >
                {isTraining ? "Training Active..." : "Begin Jedi Training"}
              </Button>
            </CardContent>
          </Card>

          {/* Holographic Interview */}
          <Card className="bg-slate-800/50 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-emerald-300 flex items-center gap-2">
                🤖 Holographic Interviewer
                {holoActive && <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />}
              </CardTitle>
              <CardDescription className="text-emerald-200">
                AI interviewer adapts to your selected culture
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isTraining ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/30">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <p className="text-emerald-300">Hologram offline</p>
                  <p className="text-emerald-200 text-sm">Select culture and start training</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 rounded-full flex items-center justify-center border-2 border-emerald-400/50 animate-pulse">
                      <span className="text-3xl">🤖</span>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-2">
                      {selectedCulture} Interviewer
                    </Badge>
                  </div>

                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <p className="text-emerald-300 font-medium mb-2">Question {currentQuestion + 1}:</p>
                    <p className="text-emerald-200">{jediQuestions[currentQuestion]}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-300">Training Progress</span>
                      <span className="text-emerald-300">{Math.round(trainingProgress)}%</span>
                    </div>
                    <Progress value={trainingProgress} className="bg-slate-700" />
                  </div>

                  <Button onClick={nextQuestion} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {currentQuestion < jediQuestions.length - 1 ? "Next Question" : "Complete Training"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Biofeedback Panel */}
          <Card className="bg-slate-800/50 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-emerald-300 flex items-center gap-2">📊 Jedi Biofeedback</CardTitle>
              <CardDescription className="text-emerald-200">
                Real-time analysis of your interview performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${metric.color}`}>{metric.name}</span>
                    <span className={`text-sm ${metric.color}`}>{Math.round(metric.value)}/100</span>
                  </div>
                  <Progress value={metric.value} className="bg-slate-700" />
                  <div className="flex justify-between text-xs text-emerald-400">
                    <span>Current</span>
                    <span>Target: {metric.target}</span>
                  </div>
                </div>
              ))}

              {isTraining && (
                <div className="mt-6 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <p className="text-cyan-300 text-sm font-medium mb-1">Jedi Insight:</p>
                  <p className="text-cyan-200 text-sm">
                    {trainingProgress < 30
                      ? "Feel the Force flowing through your words..."
                      : trainingProgress < 70
                        ? "Your confidence grows stronger, young Padawan."
                        : "Excellent! You have mastered this corporate culture."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Training Results */}
        {!isTraining && trainingProgress > 0 && (
          <Card className="mt-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-emerald-300">🏆 Training Complete</CardTitle>
              <CardDescription className="text-emerald-200">
                Your Jedi interview skills have been enhanced
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-emerald-300 font-medium mb-2">Performance Summary:</h4>
                  <ul className="space-y-1 text-emerald-200 text-sm">
                    <li>• Voice confidence improved by 23%</li>
                    <li>• Micro-expression control enhanced</li>
                    <li>• Power pose effectiveness optimized</li>
                    <li>• {selectedCulture} culture mastery achieved</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-emerald-300 font-medium mb-2">Next Training Suggestions:</h4>
                  <ul className="space-y-1 text-emerald-200 text-sm">
                    <li>• Try "Investment Banking" for advanced difficulty</li>
                    <li>• Practice technical interview scenarios</li>
                    <li>• Work on salary negotiation techniques</li>
                    <li>• Master behavioral question responses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
