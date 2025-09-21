"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Activity, Eye, Zap, Clock, Heart } from "lucide-react"

interface BiometricData {
  mentalFatigue: number
  circadianRhythm: number
  emotionalState: string
  brainwavePattern: string
  focusLevel: number
  stressLevel: number
}

interface LearningContent {
  title: string
  type: string
  difficulty: string
  duration: string
  content: string
  adaptedFor: string
}

const emotionalStates = ["Focused", "Relaxed", "Energetic", "Contemplative", "Alert", "Calm"]
const brainwavePatterns = ["Alpha", "Beta", "Theta", "Gamma", "Delta"]

const learningContent: LearningContent[] = [
  {
    title: "Advanced Python Algorithms",
    type: "Technical",
    difficulty: "High",
    duration: "45 min",
    content: "Deep dive into complex algorithmic patterns and optimization techniques.",
    adaptedFor: "High focus, low fatigue",
  },
  {
    title: "Leadership Communication",
    type: "Soft Skills",
    difficulty: "Medium",
    duration: "30 min",
    content: "Interactive scenarios for improving team communication and influence.",
    adaptedFor: "Balanced emotional state",
  },
  {
    title: "Mindful Productivity",
    type: "Wellness",
    difficulty: "Low",
    duration: "15 min",
    content: "Gentle techniques for maintaining focus during low-energy periods.",
    adaptedFor: "High fatigue, low focus",
  },
  {
    title: "Creative Problem Solving",
    type: "Innovation",
    difficulty: "Medium",
    duration: "25 min",
    content: "Visual and interactive exercises to boost creative thinking.",
    adaptedFor: "Relaxed, contemplative state",
  },
]

export function NeuroSyncLearning() {
  const [isScanning, setIsScanning] = useState(false)
  const [biometrics, setBiometrics] = useState<BiometricData>({
    mentalFatigue: 0,
    circadianRhythm: 0,
    emotionalState: "Neutral",
    brainwavePattern: "Beta",
    focusLevel: 0,
    stressLevel: 0,
  })
  const [adaptedContent, setAdaptedContent] = useState<LearningContent[]>([])
  const [colorScheme, setColorScheme] = useState("from-blue-500 to-purple-500")
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false)
            generateBiometrics()
            return 100
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isScanning])

  useEffect(() => {
    // Update color scheme based on brainwave pattern
    const colorSchemes = {
      Alpha: "from-green-400 to-blue-500",
      Beta: "from-blue-500 to-purple-500",
      Theta: "from-purple-500 to-pink-500",
      Gamma: "from-yellow-400 to-orange-500",
      Delta: "from-indigo-500 to-blue-600",
    }
    setColorScheme(
      colorSchemes[biometrics.brainwavePattern as keyof typeof colorSchemes] || "from-blue-500 to-purple-500",
    )
  }, [biometrics.brainwavePattern])

  const generateBiometrics = () => {
    const currentHour = new Date().getHours()
    const circadianPeak = currentHour >= 9 && currentHour <= 11 ? 85 : currentHour >= 14 && currentHour <= 16 ? 75 : 45

    const newBiometrics: BiometricData = {
      mentalFatigue: Math.floor(Math.random() * 100),
      circadianRhythm: circadianPeak + Math.floor(Math.random() * 20) - 10,
      emotionalState: emotionalStates[Math.floor(Math.random() * emotionalStates.length)],
      brainwavePattern: brainwavePatterns[Math.floor(Math.random() * brainwavePatterns.length)],
      focusLevel: Math.floor(Math.random() * 100),
      stressLevel: Math.floor(Math.random() * 100),
    }

    setBiometrics(newBiometrics)
    adaptLearningContent(newBiometrics)
  }

  const adaptLearningContent = (data: BiometricData) => {
    let adapted = [...learningContent]

    // Sort content based on current state
    if (data.mentalFatigue > 70) {
      adapted = adapted.filter((c) => c.difficulty === "Low" || c.type === "Wellness")
    } else if (data.focusLevel > 80 && data.mentalFatigue < 30) {
      adapted = adapted.filter((c) => c.difficulty === "High" || c.type === "Technical")
    } else {
      adapted = adapted.filter((c) => c.difficulty === "Medium")
    }

    // Limit to top 3 recommendations
    setAdaptedContent(adapted.slice(0, 3))
  }

  const startNeuroScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setBiometrics({
      mentalFatigue: 0,
      circadianRhythm: 0,
      emotionalState: "Scanning...",
      brainwavePattern: "Beta",
      focusLevel: 0,
      stressLevel: 0,
    })
    setAdaptedContent([])
  }

  const getBiometricColor = (value: number) => {
    if (value >= 80) return "text-green-400"
    if (value >= 60) return "text-yellow-400"
    if (value >= 40) return "text-orange-400"
    return "text-red-400"
  }

  const getStressColor = (value: number) => {
    if (value >= 80) return "text-red-400"
    if (value >= 60) return "text-orange-400"
    if (value >= 40) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colorScheme} p-6 transition-all duration-1000`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white">Neuro-Sync Learning</h1>
          </div>
          <p className="text-xl text-white/80 mb-6">
            Adaptive learning that responds to your brainwaves, fatigue, and emotional state
          </p>

          {!isScanning && adaptedContent.length === 0 && (
            <Button
              onClick={startNeuroScan}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              size="lg"
            >
              <Activity className="w-5 h-5 mr-2" />
              Start Neuro-Scan
            </Button>
          )}
        </div>

        {isScanning && (
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Scanning Biometric Signals...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-white/80 mb-2">
                    <span>EEG Analysis</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="text-white/60">
                    <Activity className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-sm">Brainwaves</div>
                  </div>
                  <div className="text-white/60">
                    <Heart className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-sm">Emotional State</div>
                  </div>
                  <div className="text-white/60">
                    <Clock className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-sm">Circadian Rhythm</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {adaptedContent.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Biometric Dashboard */}
            <div className="lg:col-span-1">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Live Biometrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{100 - biometrics.mentalFatigue}%</div>
                      <div className="text-sm text-white/60">Mental Energy</div>
                      <Progress value={100 - biometrics.mentalFatigue} className="h-2 mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{biometrics.focusLevel}%</div>
                      <div className="text-sm text-white/60">Focus Level</div>
                      <Progress value={biometrics.focusLevel} className="h-2 mt-2" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Circadian Peak:</span>
                      <span className={`font-semibold ${getBiometricColor(biometrics.circadianRhythm)}`}>
                        {biometrics.circadianRhythm}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Stress Level:</span>
                      <span className={`font-semibold ${getStressColor(biometrics.stressLevel)}`}>
                        {biometrics.stressLevel}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Emotional State:</span>
                      <Badge className="bg-white/20 text-white border-white/30">{biometrics.emotionalState}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Brainwave:</span>
                      <Badge className="bg-white/20 text-white border-white/30">{biometrics.brainwavePattern}</Badge>
                    </div>
                  </div>

                  <Button
                    onClick={startNeuroScan}
                    className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Rescan
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Adapted Learning Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Personalized Learning Path</h2>
              <div className="space-y-4">
                {adaptedContent.map((content, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-lg">{content.title}</CardTitle>
                          <CardDescription className="text-white/70">{content.content}</CardDescription>
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30">{content.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-white/80 border-white/30">
                            {content.type}
                          </Badge>
                          <Badge variant="outline" className="text-white/80 border-white/30">
                            {content.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-white/60 mb-3">
                        <strong>Adapted for:</strong> {content.adaptedFor}
                      </div>
                      <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30">
                        Start Learning Session
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {adaptedContent.length > 0 && (
          <div className="mt-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-white/80 text-sm">
                <strong>Neuro-Adaptive Technology:</strong> Content difficulty, duration, and type automatically adjust
                based on your current mental state, circadian rhythm, and emotional condition for optimal learning
                outcomes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
