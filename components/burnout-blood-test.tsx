"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Heart, Clock, Coffee, Activity } from "lucide-react"

interface StressAnalysis {
  stressLevel: number
  burnoutRisk: string
  microBreaks: MicroBreak[]
  recommendations: string[]
}

interface MicroBreak {
  type: string
  duration: string
  description: string
  icon: string
}

export function BurnoutBloodTest() {
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<StressAnalysis | null>(null)

  const analyzeText = async () => {
    if (!text.trim()) return

    setIsAnalyzing(true)

    // Simulate analysis delay
    setTimeout(() => {
      const stressScore = calculateStressScore(text)
      const result = generateAnalysis(stressScore)
      setAnalysis(result)
      setIsAnalyzing(false)
    }, 3000)
  }

  const calculateStressScore = (inputText: string): number => {
    const stressWords = [
      'overwhelmed', 'stressed', 'burnt out', 'exhausted', 'deadline', 'pressure',
      'anxious', 'worried', 'frustrated', 'tired', 'busy', 'rushed', 'chaos',
      'crisis', 'emergency', 'urgent', 'panic', 'overworked', 'under pressure'
    ]

    const words = inputText.toLowerCase().split(/\s+/)
    let stressCount = 0

    words.forEach(word => {
      if (stressWords.some(stressWord => word.includes(stressWord))) {
        stressCount++
      }
    })

    const stressPercentage = (stressCount / words.length) * 100
    return Math.min(100, Math.max(0, stressPercentage * 10)) // Scale to 0-100
  }

  const generateAnalysis = (stressScore: number): StressAnalysis => {
    let burnoutRisk = ""
    let microBreaks: MicroBreak[] = []
    let recommendations: string[] = []

    if (stressScore < 30) {
      burnoutRisk = "Low Risk"
      microBreaks = [
        { type: "Deep Breathing", duration: "2 minutes", description: "Take slow, deep breaths to center yourself", icon: "🫁" },
        { type: "Gratitude Moment", duration: "1 minute", description: "Note one thing you're grateful for today", icon: "🙏" }
      ]
      recommendations = ["Keep maintaining work-life balance", "Continue your current wellness practices"]
    } else if (stressScore < 60) {
      burnoutRisk = "Moderate Risk"
      microBreaks = [
        { type: "Coffee Break", duration: "5 minutes", description: "Step away for a quick coffee and stretch", icon: "☕" },
        { type: "Nature Walk", duration: "10 minutes", description: "Take a short walk outside if possible", icon: "🌳" },
        { type: "Meditation", duration: "3 minutes", description: "Quick mindfulness meditation session", icon: "🧘" }
      ]
      recommendations = ["Schedule regular breaks", "Practice time-blocking", "Set boundaries for work hours"]
    } else {
      burnoutRisk = "High Risk"
      microBreaks = [
        { type: "Power Nap", duration: "15 minutes", description: "Short restorative nap to recharge", icon: "😴" },
        { type: "Exercise Break", duration: "10 minutes", description: "Quick physical activity or stretching", icon: "🏃" },
        { type: "Digital Detox", duration: "30 minutes", description: "Disconnect from all devices", icon: "📵" },
        { type: "Creative Outlet", duration: "5 minutes", description: "Quick creative activity (drawing, music)", icon: "🎨" }
      ]
      recommendations = ["Take immediate action to reduce workload", "Consider speaking with supervisor", "Seek professional counseling if needed", "Implement strict work boundaries"]
    }

    return {
      stressLevel: stressScore,
      burnoutRisk,
      microBreaks,
      recommendations
    }
  }

  const getStressColor = (level: number) => {
    if (level < 30) return "text-green-400"
    if (level < 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getStressBadgeColor = (level: number) => {
    if (level < 30) return "bg-green-600"
    if (level < 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white-shadow mb-4">🩸 Burnout Blood Test</h2>
        <p className="text-secondary-high-contrast">Analyze your text for stress signals and get personalized micro-break prescriptions</p>
      </div>

      <Card className="bg-dark-card border-visible">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white-shadow">
            <Activity className="w-5 h-5" />
            Stress Signal Analysis
          </CardTitle>
          <CardDescription className="text-secondary-high-contrast">
            Paste any work-related text (emails, posts, messages) to analyze for burnout indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Textarea
              placeholder="Paste your LinkedIn post, email, or any work-related text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-32 textarea-high-contrast font-semibold"
            />
          </div>

          <Button
            onClick={analyzeText}
            disabled={!text.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4"
          >
            {isAnalyzing ? (
              <>
                <Activity className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Stress Signals...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                🔬 ANALYZE STRESS LEVELS
              </>
            )}
          </Button>

          {isAnalyzing && (
            <div className="space-y-3 p-4 bg-red-900/20 rounded-lg border-2 border-red-500/70">
              <div className="flex justify-between text-sm text-red-200 font-bold">
                <span className="font-rancho" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  STRESS ANALYSIS IN PROGRESS
                </span>
                <span className="font-rancho" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  Scanning for burnout indicators...
                </span>
              </div>
              <Progress value={75} className="h-3 bg-red-900/50" />
            </div>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white-shadow">
                <AlertCircle className="w-5 h-5" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${getStressColor(analysis.stressLevel)}`}>
                  {Math.round(analysis.stressLevel)}%
                </div>
                <Badge className={`${getStressBadgeColor(analysis.stressLevel)} text-white font-bold mb-2`}>
                  {analysis.burnoutRisk}
                </Badge>
                <p className="text-secondary-high-contrast">Stress Level Detected</p>
              </div>

              <div>
                <h4 className="text-white-shadow font-bold mb-3">Recommendations:</h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-secondary-high-contrast">
                      <span className="text-yellow-400 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white-shadow">
                <Coffee className="w-5 h-5" />
                Micro-Break Prescriptions
              </CardTitle>
              <CardDescription className="text-secondary-high-contrast">
                Immediate actions to reduce stress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.microBreaks.map((breakItem, index) => (
                  <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-600/50">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{breakItem.icon}</span>
                      <div>
                        <h5 className="text-white-shadow font-bold">{breakItem.type}</h5>
                        <p className="text-yellow-400 text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {breakItem.duration}
                        </p>
                      </div>
                    </div>
                    <p className="text-secondary-high-contrast text-sm">{breakItem.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}