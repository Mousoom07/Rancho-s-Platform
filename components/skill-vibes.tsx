"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Camera, Keyboard, Headphones, Zap, Heart } from "lucide-react"

type MoodState = "chill" | "hyperfocus" | "burnout" | "energized" | "analyzing"

interface LearningRecommendation {
  format: string
  content: string
  duration: string
  description: string
}

const moodStates = {
  chill: {
    name: "Chill Mode",
    color: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-900/20 via-cyan-800/10 to-teal-900/20",
    icon: "🌊",
    description: "Relaxed and receptive to gentle learning",
    recommendations: [
      {
        format: "Podcast-Style Lessons",
        content: "Leadership Philosophy Deep Dive",
        duration: "25 min",
        description: "Audio-first learning with ambient background music",
      },
      {
        format: "Visual Storytelling",
        content: "Career Success Stories",
        duration: "15 min",
        description: "Inspiring narratives with calming visuals",
      },
    ],
  },
  hyperfocus: {
    name: "Hyperfocus Mode",
    color: "from-orange-400 to-red-400",
    bgGradient: "from-orange-900/20 via-red-800/10 to-pink-900/20",
    icon: "🔥",
    description: "Peak concentration and problem-solving state",
    recommendations: [
      {
        format: "AR Coding Challenges",
        content: "Advanced Algorithm Mastery",
        duration: "45 min",
        description: "Immersive hands-on programming with real-time feedback",
      },
      {
        format: "Interactive Simulations",
        content: "System Design Workshop",
        duration: "60 min",
        description: "Complex problem-solving with immediate application",
      },
    ],
  },
  burnout: {
    name: "Burnout Mode",
    color: "from-purple-400 to-pink-400",
    bgGradient: "from-purple-900/20 via-pink-800/10 to-rose-900/20",
    icon: "🌸",
    description: "Recovery-focused with gentle skill building",
    recommendations: [
      {
        format: "Mini-Meditation + Micro-Lessons",
        content: "Mindful Leadership Principles",
        duration: "10 min",
        description: "Stress-relief combined with bite-sized learning",
      },
      {
        format: "Gentle Skill Refresh",
        content: "Communication Fundamentals",
        duration: "12 min",
        description: "Low-pressure review of core concepts",
      },
    ],
  },
  energized: {
    name: "Energized Mode",
    color: "from-green-400 to-emerald-400",
    bgGradient: "from-green-900/20 via-emerald-800/10 to-teal-900/20",
    icon: "⚡",
    description: "High energy and motivation for active learning",
    recommendations: [
      {
        format: "Gamified Challenges",
        content: "Negotiation Skills Battle",
        duration: "30 min",
        description: "Competitive learning with leaderboards and achievements",
      },
      {
        format: "Live Collaboration",
        content: "Team Project Simulation",
        duration: "40 min",
        description: "Real-time group problem solving",
      },
    ],
  },
}

export function SkillVibes() {
  const [currentMood, setCurrentMood] = useState<MoodState>("analyzing")
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [biometrics, setBiometrics] = useState({
    heartRate: 72,
    stressLevel: 35,
    focusScore: 78,
    energyLevel: 65,
  })

  const startMoodScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setCurrentMood("analyzing")

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          // Simulate mood detection
          const moods: MoodState[] = ["chill", "hyperfocus", "burnout", "energized"]
          const detectedMood = moods[Math.floor(Math.random() * moods.length)]
          setCurrentMood(detectedMood)

          // Update biometrics based on mood
          const newBiometrics = {
            chill: { heartRate: 65, stressLevel: 20, focusScore: 60, energyLevel: 45 },
            hyperfocus: { heartRate: 85, stressLevel: 45, focusScore: 95, energyLevel: 90 },
            burnout: { heartRate: 78, stressLevel: 80, focusScore: 30, energyLevel: 25 },
            energized: { heartRate: 88, stressLevel: 25, focusScore: 85, energyLevel: 95 },
          }
          setBiometrics(newBiometrics[detectedMood])
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  const mood = currentMood === "analyzing" ? null : moodStates[currentMood]

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        mood ? `bg-gradient-to-br ${mood.bgGradient}` : "bg-gradient-to-br from-slate-900 to-purple-900"
      }`}
    >
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Skill Vibes - Mood-Based Learning
          </h1>
          <p className="text-lg text-gray-200 mb-6 font-semibold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
            AI detects your mental state and adapts learning formats in real-time
          </p>
        </div>

        {/* Mood Detection Interface */}
        <Card className="bg-slate-800/50 border-purple-500/20 mb-8">
          <CardHeader>
            <CardTitle
              className="flex items-center gap-3 text-white font-bold"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              <Brain className="w-6 h-6" />
              Mental State Analysis
            </CardTitle>
            <CardDescription
              className="text-gray-200 font-semibold"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
            >
              Using webcam analysis and keystroke dynamics to detect your current mood
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg">
                <Camera className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Facial Expression</p>
                  <p className="text-white font-semibold">Active</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg">
                <Keyboard className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-300">Keystroke Dynamics</p>
                  <p className="text-white font-semibold">Monitoring</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg">
                <Heart className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-sm text-gray-300">Biometric Feedback</p>
                  <p className="text-white font-semibold">Real-time</p>
                </div>
              </div>
            </div>

            {isScanning && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Analyzing mental state...</span>
                  <span className="text-sm text-white">{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="h-2" />
              </div>
            )}

            <Button
              onClick={startMoodScan}
              disabled={isScanning}
              className={`w-full bg-gradient-to-r ${
                mood ? mood.color : "from-purple-600 to-pink-600"
              } hover:opacity-90 transition-all duration-300`}
            >
              {isScanning ? "Scanning..." : "Start Mood Detection"}
            </Button>
          </CardContent>
        </Card>

        {/* Current Mood Display */}
        {mood && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <span className="text-3xl">{mood.icon}</span>
                  {mood.name}
                </CardTitle>
                <CardDescription>{mood.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Heart Rate</p>
                    <p className="text-2xl font-bold text-red-400">{biometrics.heartRate} BPM</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Stress Level</p>
                    <p className="text-2xl font-bold text-orange-400">{biometrics.stressLevel}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Focus Score</p>
                    <p className="text-2xl font-bold text-blue-400">{biometrics.focusScore}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Energy Level</p>
                    <p className="text-2xl font-bold text-green-400">{biometrics.energyLevel}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Personalized Learning Formats</CardTitle>
                <CardDescription>Optimized content delivery based on your current mental state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mood.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{rec.format}</h4>
                        <Badge className={`bg-gradient-to-r ${mood.color} text-white`}>{rec.duration}</Badge>
                      </div>
                      <p className="text-purple-200 mb-2">{rec.content}</p>
                      <p className="text-sm text-gray-400">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Learning Adaptation Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Headphones className="w-5 h-5" />
                Audio Adaptation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Background music and narration speed adjust to your energy levels</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Music Tempo</span>
                  <span className="text-sm text-white">
                    {mood?.name === "Hyperfocus Mode"
                      ? "Upbeat"
                      : mood?.name === "Chill Mode"
                        ? "Ambient"
                        : mood?.name === "Burnout Mode"
                          ? "Calming"
                          : "Energetic"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Speech Rate</span>
                  <span className="text-sm text-white">
                    {mood?.name === "Hyperfocus Mode" ? "Fast" : mood?.name === "Burnout Mode" ? "Slow" : "Normal"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Zap className="w-5 h-5" />
                Content Difficulty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Lesson complexity adapts to your cognitive capacity</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Complexity</span>
                  <span className="text-sm text-white">
                    {mood?.name === "Hyperfocus Mode"
                      ? "Advanced"
                      : mood?.name === "Burnout Mode"
                        ? "Basic"
                        : "Intermediate"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Session Length</span>
                  <span className="text-sm text-white">
                    {mood?.name === "Hyperfocus Mode"
                      ? "Extended"
                      : mood?.name === "Burnout Mode"
                        ? "Micro"
                        : "Standard"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Brain className="w-5 h-5" />
                Learning Style
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Visual, auditory, and kinesthetic elements balance automatically</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Visual</span>
                  <span className="text-sm text-white">{mood?.name === "Chill Mode" ? "High" : "Medium"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Interactive</span>
                  <span className="text-sm text-white">{mood?.name === "Hyperfocus Mode" ? "High" : "Low"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
