"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Sphere } from "@react-three/drei"
import type * as THREE from "three"

interface CareerStar {
  id: string
  name: string
  position: [number, number, number]
  brightness: number
  color: string
  category: string
  compatibility: number
}

function CareerConstellation({
  stars,
  selectedStar,
  onStarClick,
}: {
  stars: CareerStar[]
  selectedStar: string | null
  onStarClick: (id: string) => void
}) {
  return (
    <>
      {stars.map((star) => (
        <group key={star.id} position={star.position}>
          <Sphere args={[star.brightness * 0.1, 16, 16]} onClick={() => onStarClick(star.id)}>
            <meshBasicMaterial color={star.color} transparent opacity={selectedStar === star.id ? 1 : 0.7} />
          </Sphere>
          <Text
            position={[0, star.brightness * 0.15, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {star.name}
          </Text>
        </group>
      ))}
    </>
  )
}

function RotatingGalaxy({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return <group ref={groupRef}>{children}</group>
}

export function NeuroAdaptiveCareerMapping() {
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [currentStage, setCurrentStage] = useState("")
  const [selectedStar, setSelectedStar] = useState<string | null>(null)
  const [learningStyle, setLearningStyle] = useState<string>("")
  const [stressTriggers, setStressTriggers] = useState<string[]>([])
  const [hiddenAptitudes, setHiddenAptitudes] = useState<string[]>([])

  const scanStages = [
    "Initializing brainwave sensors...",
    "Analyzing eye movement patterns...",
    "Detecting micro-expressions...",
    "Mapping neural pathways...",
    "Identifying learning preferences...",
    "Calculating career compatibility...",
    "Generating constellation map...",
  ]

  const careerStars: CareerStar[] = [
    {
      id: "tech-lead",
      name: "Tech Lead",
      position: [2, 1, 0],
      brightness: 8.5,
      color: "#3b82f6",
      category: "Technology",
      compatibility: 92,
    },
    {
      id: "product-manager",
      name: "Product Manager",
      position: [-1, 2, 1],
      brightness: 7.8,
      color: "#10b981",
      category: "Strategy",
      compatibility: 87,
    },
    {
      id: "ux-researcher",
      name: "UX Researcher",
      position: [0, -1, 2],
      brightness: 7.2,
      color: "#f59e0b",
      category: "Design",
      compatibility: 84,
    },
    {
      id: "data-scientist",
      name: "Data Scientist",
      position: [-2, 0, -1],
      brightness: 8.9,
      color: "#8b5cf6",
      category: "Analytics",
      compatibility: 95,
    },
    {
      id: "startup-founder",
      name: "Startup Founder",
      position: [1, -2, 0],
      brightness: 6.5,
      color: "#ef4444",
      category: "Entrepreneurship",
      compatibility: 78,
    },
    {
      id: "ai-researcher",
      name: "AI Researcher",
      position: [0, 2, -2],
      brightness: 9.2,
      color: "#06b6d4",
      category: "Research",
      compatibility: 97,
    },
  ]

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanComplete(false)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 100 / 60 // 60 seconds total
        const stageIndex = Math.floor((newProgress / 100) * scanStages.length)
        setCurrentStage(scanStages[Math.min(stageIndex, scanStages.length - 1)])

        if (newProgress >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setScanComplete(true)

          // Generate results
          setLearningStyle("Visual-Kinesthetic Hybrid")
          setStressTriggers(["Micromanagement", "Unclear Requirements", "Tight Deadlines"])
          setHiddenAptitudes(["Systems Thinking", "Pattern Recognition", "Emotional Intelligence"])

          return 100
        }
        return newProgress
      })
    }, 1000)
  }

  const selectedStarData = careerStars.find((star) => star.id === selectedStar)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌌 Neuro-Adaptive Career Mapping
          </h1>
          <p className="text-xl text-indigo-200 mb-6">
            60-second brainwave scan creates your personalized career constellation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scanning Interface */}
          <Card className="bg-slate-800/50 border-indigo-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">🧠 Neural Scan Interface</CardTitle>
              <CardDescription className="text-indigo-200">
                Advanced brainwave analysis with eye tracking and micro-expression detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isScanning && !scanComplete && (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🎯</span>
                  </div>
                  <p className="text-indigo-200">
                    Position yourself in front of the camera and click to begin neural mapping
                  </p>
                  <Button
                    onClick={startScan}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    Start 60-Second Scan
                  </Button>
                </div>
              )}

              {isScanning && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-4xl">🔍</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-indigo-200">Scan Progress</span>
                      <span className="text-indigo-300">{Math.round(scanProgress)}%</span>
                    </div>
                    <Progress value={scanProgress} className="h-2" />
                  </div>

                  <div className="text-center">
                    <p className="text-indigo-300 animate-pulse">{currentStage}</p>
                  </div>
                </div>
              )}

              {scanComplete && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-4xl">✨</span>
                    </div>
                    <p className="text-green-300 mt-2">Neural mapping complete!</p>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">🎯 Learning Style</h4>
                      <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">{learningStyle}</Badge>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">⚠️ Stress Triggers</h4>
                      <div className="flex flex-wrap gap-2">
                        {stressTriggers.map((trigger, index) => (
                          <Badge key={index} className="bg-red-500/20 text-red-300 border-red-500/30">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">💎 Hidden Aptitudes</h4>
                      <div className="flex flex-wrap gap-2">
                        {hiddenAptitudes.map((aptitude, index) => (
                          <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            {aptitude}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 3D Career Constellation */}
          <Card className="bg-slate-800/50 border-indigo-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">🌟 Career Constellation</CardTitle>
              <CardDescription className="text-indigo-200">
                Interactive galaxy where stars represent career paths that brighten with skill development
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scanComplete ? (
                <div className="space-y-4">
                  <div className="h-96 bg-black/20 rounded-lg overflow-hidden">
                    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                      <ambientLight intensity={0.2} />
                      <pointLight position={[10, 10, 10]} />
                      <RotatingGalaxy>
                        <CareerConstellation
                          stars={careerStars}
                          selectedStar={selectedStar}
                          onStarClick={setSelectedStar}
                        />
                      </RotatingGalaxy>
                      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
                    </Canvas>
                  </div>

                  {selectedStarData && (
                    <Card className="bg-slate-700/50 border-indigo-400/30">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">⭐ {selectedStarData.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                            {selectedStarData.category}
                          </Badge>
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            {selectedStarData.compatibility}% Match
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-indigo-200">Brightness Level</span>
                            <span className="text-white">{selectedStarData.brightness}/10</span>
                          </div>
                          <Progress value={selectedStarData.brightness * 10} className="h-2" />
                          <p className="text-sm text-indigo-300 mt-2">
                            This career path aligns strongly with your neural patterns and hidden aptitudes.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="h-96 bg-black/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-indigo-400">
                    <span className="text-6xl mb-4 block">🌌</span>
                    <p>Complete neural scan to reveal your career constellation</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
