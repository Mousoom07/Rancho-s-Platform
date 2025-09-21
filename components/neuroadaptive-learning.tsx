"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Eye, Headphones, Video, Zap, Activity, AlertTriangle } from "lucide-react"

interface BiometricData {
  alphaWaves: number
  betaWaves: number
  eyeGaze: number
  blinkRate: number
  focusScore: number
  fatigueLevel: number
}

interface LearningSession {
  id: string
  title: string
  modality: "video" | "podcast" | "ar" | "text"
  duration: number
  difficulty: "easy" | "medium" | "hard"
  topic: string
}

const learningContent: LearningSession[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    modality: "video",
    duration: 15,
    difficulty: "easy",
    topic: "AI Fundamentals",
  },
  {
    id: "2",
    title: "Neural Networks Deep Dive",
    modality: "podcast",
    duration: 20,
    difficulty: "medium",
    topic: "Deep Learning",
  },
  {
    id: "3",
    title: "AR Data Visualization",
    modality: "ar",
    duration: 10,
    difficulty: "hard",
    topic: "Data Science",
  },
  {
    id: "4",
    title: "Python Basics Review",
    modality: "text",
    duration: 12,
    difficulty: "easy",
    topic: "Programming",
  },
]

export function NeuroadaptiveLearning() {
  const [isActive, setIsActive] = useState(false)
  const [biometrics, setBiometrics] = useState<BiometricData>({
    alphaWaves: 75,
    betaWaves: 60,
    eyeGaze: 85,
    blinkRate: 18,
    focusScore: 82,
    fatigueLevel: 25,
  })
  const [currentSession, setCurrentSession] = useState<LearningSession | null>(null)
  const [sessionTime, setSessionTime] = useState(0)
  const [adaptations, setAdaptations] = useState<string[]>([])
  const [deviceConnected, setDeviceConnected] = useState(false)

  // Simulate real-time biometric updates
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setBiometrics((prev) => {
        const fatigue = Math.min(100, prev.fatigueLevel + Math.random() * 3)
        const alpha = Math.max(20, prev.alphaWaves - (fatigue > 70 ? Math.random() * 10 : 0))
        const focus = Math.max(20, 100 - fatigue * 0.8)
        const eyeGaze = Math.max(30, prev.eyeGaze - (fatigue > 60 ? Math.random() * 15 : 0))

        return {
          alphaWaves: alpha,
          betaWaves: Math.max(30, prev.betaWaves + (Math.random() - 0.5) * 10),
          eyeGaze: eyeGaze,
          blinkRate: Math.max(10, Math.min(30, prev.blinkRate + (Math.random() - 0.5) * 4)),
          focusScore: focus,
          fatigueLevel: fatigue,
        }
      })

      setSessionTime((prev) => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [isActive])

  // Adaptive learning logic
  useEffect(() => {
    if (!isActive || !currentSession) return

    const { focusScore, fatigueLevel, alphaWaves } = biometrics

    // Detect cognitive fatigue and adapt
    if (fatigueLevel > 70 && alphaWaves < 40) {
      const newAdaptation = "High fatigue detected. Switching to AR micro-lessons for better engagement."
      setAdaptations((prev) => [...prev.slice(-2), newAdaptation])

      // Switch to AR modality
      if (currentSession.modality !== "ar") {
        setCurrentSession((prev) =>
          prev ? { ...prev, modality: "ar", duration: Math.max(5, prev.duration - 5) } : null,
        )
      }
    } else if (focusScore < 50) {
      const newAdaptation = "You're zoning out. Switching to interactive podcast format."
      setAdaptations((prev) => [...prev.slice(-2), newAdaptation])

      if (currentSession.modality !== "podcast") {
        setCurrentSession((prev) => (prev ? { ...prev, modality: "podcast" } : null))
      }
    } else if (focusScore > 85 && fatigueLevel < 30) {
      const newAdaptation = "High focus detected. Increasing content difficulty and switching to video."
      setAdaptations((prev) => [...prev.slice(-2), newAdaptation])

      if (currentSession.modality !== "video") {
        setCurrentSession((prev) => (prev ? { ...prev, modality: "video", difficulty: "hard" } : null))
      }
    }
  }, [biometrics, isActive, currentSession])

  const startSession = (session: LearningSession) => {
    setCurrentSession(session)
    setIsActive(true)
    setSessionTime(0)
    setAdaptations([])
  }

  const stopSession = () => {
    setIsActive(false)
    setCurrentSession(null)
    setSessionTime(0)
  }

  const connectDevice = () => {
    setDeviceConnected(true)
    // Simulate device connection
    setTimeout(() => {
      setBiometrics({
        alphaWaves: 78,
        betaWaves: 65,
        eyeGaze: 88,
        blinkRate: 16,
        focusScore: 85,
        fatigueLevel: 20,
      })
    }, 1000)
  }

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case "video":
        return <Video className="h-4 w-4" />
      case "podcast":
        return <Headphones className="h-4 w-4" />
      case "ar":
        return <Zap className="h-4 w-4" />
      case "text":
        return <Brain className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case "video":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "podcast":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "ar":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "text":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Neuroadaptive Learning
          </h1>
          <p className="text-cyan-200 text-lg mb-6">
            EEG + Eye Tracking Integration • Real-time Cognitive Adaptation • Optimized Learning Modalities
          </p>

          {!deviceConnected ? (
            <Button onClick={connectDevice} className="bg-cyan-600 hover:bg-cyan-700">
              <Brain className="mr-2 h-4 w-4" />
              Connect Muse/Vision Pro
            </Button>
          ) : (
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <Activity className="mr-1 h-3 w-3" />
              Neural Interface Connected
            </Badge>
          )}
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="dashboard">Live Dashboard</TabsTrigger>
            <TabsTrigger value="sessions">Learning Sessions</TabsTrigger>
            <TabsTrigger value="analytics">Neural Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Real-time Biometrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-cyan-300 flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Alpha Waves
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">{biometrics.alphaWaves.toFixed(1)}%</div>
                  <Progress value={biometrics.alphaWaves} className="mb-2" />
                  <p className="text-sm text-cyan-200">
                    {biometrics.alphaWaves > 60 ? "Relaxed focus" : "Cognitive strain detected"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-cyan-300 flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Eye Gaze Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">{biometrics.eyeGaze.toFixed(1)}%</div>
                  <Progress value={biometrics.eyeGaze} className="mb-2" />
                  <p className="text-sm text-cyan-200">Blink rate: {biometrics.blinkRate}/min</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-cyan-300 flex items-center justify-between">
                    <span>Active Learning Session</span>
                    <Badge className={getModalityColor(currentSession.modality)}>
                      {getModalityIcon(currentSession.modality)}
                      <span className="ml-1 capitalize">{currentSession.modality}</span>
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-cyan-200">
                    {currentSession.title} • {currentSession.topic}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white">
                      Session Time: {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, "0")}
                    </span>
                    <Button onClick={stopSession} variant="outline" size="sm">
                      End Session
                    </Button>
                  </div>
                  <Progress value={(sessionTime / (currentSession.duration * 60)) * 100} className="mb-4" />

                  {/* Real-time Adaptations */}
                  {adaptations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-cyan-300 font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Real-time Adaptations
                      </h4>
                      {adaptations.map((adaptation, index) => (
                        <div key={index} className="bg-cyan-500/10 border border-cyan-500/20 rounded p-3">
                          <p className="text-cyan-200 text-sm">{adaptation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Current Session */}
            {currentSession && (
              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-300 flex items-center justify-between">
                    <span>Active Learning Session</span>
                    <Badge className={getModalityColor(currentSession.modality)}>
                      {getModalityIcon(currentSession.modality)}
                      <span className="ml-1 capitalize">{currentSession.modality}</span>
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-cyan-200">
                    {currentSession.title} • {currentSession.topic}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white">
                      Session Time: {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, "0")}
                    </span>
                    <Button onClick={stopSession} variant="outline" size="sm">
                      End Session
                    </Button>
                  </div>
                  <Progress value={(sessionTime / (currentSession.duration * 60)) * 100} className="mb-4" />

                  {/* Real-time Adaptations */}
                  {adaptations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-cyan-300 font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Real-time Adaptations
                      </h4>
                      {adaptations.map((adaptation, index) => (
                        <div key={index} className="bg-cyan-500/10 border border-cyan-500/20 rounded p-3">
                          <p className="text-cyan-200 text-sm">{adaptation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {learningContent.map((session) => (
                <Card key={session.id} className="bg-slate-800/50 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-cyan-300 flex items-center justify-between">
                      {session.title}
                      <Badge className={getModalityColor(session.modality)}>
                        {getModalityIcon(session.modality)}
                        <span className="ml-1 capitalize">{session.modality}</span>
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-cyan-200">
                      {session.topic} • {session.duration} min • {session.difficulty}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => startSession(session)}
                      disabled={!deviceConnected || isActive}
                      className="w-full bg-cyan-600 hover:bg-cyan-700"
                    >
                      {isActive ? "Session Active" : "Start Learning"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Learning Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-cyan-200">Video Learning</span>
                      <span className="text-white">78% retention</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-200">Podcast Learning</span>
                      <span className="text-white">85% retention</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-200">AR Learning</span>
                      <span className="text-white">92% retention</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-200">Text Learning</span>
                      <span className="text-white">71% retention</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Cognitive Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-cyan-200">Peak Focus Time</span>
                      <div className="text-white font-medium">10:00 AM - 11:30 AM</div>
                    </div>
                    <div>
                      <span className="text-cyan-200">Optimal Session Length</span>
                      <div className="text-white font-medium">18 minutes</div>
                    </div>
                    <div>
                      <span className="text-cyan-200">Fatigue Threshold</span>
                      <div className="text-white font-medium">65% (Alpha &lt; 45)</div>
                    </div>
                    <div>
                      <span className="text-cyan-200">Preferred Modality</span>
                      <div className="text-white font-medium">AR (High Engagement)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
