"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Environment } from "@react-three/drei"
import { Camera, Play, RotateCcw, Eye, Brain, Zap } from "lucide-react"
import type * as THREE from "three"

// 3D Skill Helix Component
function SkillHelix({
  skills,
  isAnimating,
}: { skills: Array<{ name: string; level: number; color: string }>; isAnimating: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current && isAnimating) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2
        const radius = 3
        const height = (index / skills.length) * 6 - 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <group key={skill.name} position={[x, height, z]}>
            <mesh>
              <sphereGeometry args={[skill.level * 0.3, 16, 16]} />
              <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.2} />
            </mesh>
            <Text
              position={[0, skill.level * 0.3 + 0.5, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Geist-Bold.ttf"
            >
              {skill.name}
            </Text>
            <Text
              position={[0, skill.level * 0.3 + 0.2, 0]}
              fontSize={0.2}
              color="#a855f7"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Geist-Regular.ttf"
            >
              {Math.round(skill.level * 100)}%
            </Text>
          </group>
        )
      })}

      {/* Helix Structure */}
      {Array.from({ length: 50 }, (_, i) => {
        const t = i / 50
        const angle = t * Math.PI * 8
        const radius = 3
        const height = t * 6 - 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, height, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}

export function CareerDNA() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [careerDNA, setCareerDNA] = useState<{
    skills: Array<{ name: string; level: number; color: string }>
    personality: string
    strengths: string[]
    recommendations: string[]
  } | null>(null)

  const stages = [
    { name: "Initializing facial recognition...", duration: 8 },
    { name: "Analyzing micro-expressions...", duration: 12 },
    { name: "Processing cognitive patterns...", duration: 15 },
    { name: "Mapping neural pathways...", duration: 10 },
    { name: "Generating skill helix...", duration: 10 },
    { name: "Finalizing career DNA...", duration: 5 },
  ]

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setIsComplete(false)
    setCareerDNA(null)

    let totalTime = 0
    let currentStageIndex = 0

    const interval = setInterval(() => {
      totalTime += 100
      const progress = Math.min((totalTime / 60000) * 100, 100)
      setScanProgress(progress)

      // Update current stage
      let accumulatedTime = 0
      for (let i = 0; i < stages.length; i++) {
        accumulatedTime += stages[i].duration * 1000
        if (totalTime <= accumulatedTime) {
          if (currentStageIndex !== i) {
            currentStageIndex = i
            setCurrentStage(stages[i].name)
          }
          break
        }
      }

      if (progress >= 100) {
        clearInterval(interval)
        setIsScanning(false)
        setIsComplete(true)
        generateCareerDNA()
      }
    }, 100)
  }

  const generateCareerDNA = () => {
    const skillColors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"]
    const skills = [
      { name: "Leadership", level: Math.random() * 0.6 + 0.4, color: skillColors[0] },
      { name: "Analytics", level: Math.random() * 0.6 + 0.4, color: skillColors[1] },
      { name: "Creativity", level: Math.random() * 0.6 + 0.4, color: skillColors[2] },
      { name: "Communication", level: Math.random() * 0.6 + 0.4, color: skillColors[3] },
      { name: "Technical", level: Math.random() * 0.6 + 0.4, color: skillColors[4] },
      { name: "Strategy", level: Math.random() * 0.6 + 0.4, color: skillColors[5] },
      { name: "Innovation", level: Math.random() * 0.6 + 0.4, color: skillColors[6] },
      { name: "Empathy", level: Math.random() * 0.6 + 0.4, color: skillColors[7] },
    ]

    const personalities = [
      "Visionary Architect",
      "Data-Driven Strategist",
      "Creative Catalyst",
      "People-First Leader",
      "Technical Innovator",
    ]
    const strengthsList = [
      ["Pattern Recognition", "Systems Thinking", "Future Planning"],
      ["Analytical Reasoning", "Problem Solving", "Detail Orientation"],
      ["Creative Problem Solving", "Ideation", "Design Thinking"],
      ["Emotional Intelligence", "Team Building", "Conflict Resolution"],
      ["Technical Mastery", "Innovation", "Continuous Learning"],
    ]
    const recommendationsList = [
      [
        "Consider roles in strategic planning",
        "Explore emerging technology sectors",
        "Develop cross-functional expertise",
      ],
      ["Focus on data science opportunities", "Build statistical modeling skills", "Consider consulting roles"],
      ["Pursue design-thinking roles", "Explore creative industries", "Develop storytelling abilities"],
      ["Consider people management roles", "Develop coaching skills", "Explore HR or organizational development"],
      ["Stay current with tech trends", "Build full-stack capabilities", "Consider technical leadership roles"],
    ]

    const randomIndex = Math.floor(Math.random() * personalities.length)

    setCareerDNA({
      skills,
      personality: personalities[randomIndex],
      strengths: strengthsList[randomIndex],
      recommendations: recommendationsList[randomIndex],
    })
  }

  const reset = () => {
    setIsScanning(false)
    setScanProgress(0)
    setIsComplete(false)
    setCareerDNA(null)
    setCurrentStage("")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gradient flex items-center justify-center gap-2">
            <Brain className="h-8 w-8 text-purple-400" />
            60-Second Career DNA Scanner
          </CardTitle>
          <CardDescription className="text-purple-200">
            Advanced facial expression analysis to decode your career potential in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isScanning && !isComplete && (
            <div className="text-center space-y-4">
              <div className="w-64 h-48 mx-auto bg-slate-700/50 rounded-lg border-2 border-dashed border-purple-500/30 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <p className="text-purple-200">Webcam Feed</p>
                  <p className="text-sm text-purple-300">Position your face in frame</p>
                </div>
              </div>
              <Button onClick={startScan} className="bg-purple-600 hover:bg-purple-700" size="lg">
                <Play className="h-4 w-4 mr-2" />
                Start 60-Second Scan
              </Button>
              <div className="flex items-center justify-center gap-4 text-sm text-purple-300">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  Facial Analysis
                </div>
                <div className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  Neural Mapping
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Real-time Processing
                </div>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div className="w-64 h-48 mx-auto bg-slate-700/50 rounded-lg border-2 border-purple-500 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse" />
                <div className="text-center z-10">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-purple-200 font-semibold">SCANNING...</p>
                </div>
                {/* Scanning overlay effects */}
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-300">{currentStage}</span>
                  <span className="text-purple-400">{Math.round(scanProgress)}%</span>
                </div>
                <Progress value={scanProgress} className="h-2" />
                <p className="text-center text-sm text-purple-300">
                  Time remaining: {Math.max(0, 60 - Math.round((scanProgress / 100) * 60))}s
                </p>
              </div>
            </div>
          )}

          {isComplete && careerDNA && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gradient mb-2">Your Career DNA Profile</h3>
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                  {careerDNA.personality}
                </Badge>
              </div>

              {/* 3D Skill Helix */}
              <div className="h-96 w-full bg-slate-900/50 rounded-lg border border-purple-500/20">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <SkillHelix skills={careerDNA.skills} isAnimating={true} />
                  <OrbitControls enableZoom={true} enablePan={false} />
                  <Environment preset="night" />
                </Canvas>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-slate-700/30 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-300">Core Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {careerDNA.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <span className="text-purple-200">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-700/30 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-300">Career Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {careerDNA.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-purple-200">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button
                  onClick={reset}
                  variant="outline"
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20 bg-transparent"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Scan Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
