"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Cylinder } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type * as THREE from "three"

// DNA Helix Component
function DNAHelix({ isScanning, mutationLevel }: { isScanning: boolean; mutationLevel: number }) {
  const helixRef = useRef<THREE.Group>(null)
  const [time, setTime] = useState(0)

  useFrame((state, delta) => {
    setTime(time + delta)
    if (helixRef.current) {
      helixRef.current.rotation.y = time * 0.5
      if (isScanning) {
        helixRef.current.position.y = Math.sin(time * 2) * 0.2
      }
    }
  })

  const helixPoints = []
  const numPoints = 50
  const radius = 1.5
  const height = 8

  for (let i = 0; i < numPoints; i++) {
    const t = i / numPoints
    const angle = t * Math.PI * 4
    const y = (t - 0.5) * height

    // Left strand
    helixPoints.push({
      position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number],
      color: "#FFD700", // Gold for Core Strengths
      type: "core",
    })

    // Right strand
    helixPoints.push({
      position: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius] as [number, number, number],
      color: "#8A2BE2", // Purple for Hidden Talents
      type: "hidden",
    })

    // Center strand (Future-Proof Skills)
    if (i % 3 === 0) {
      helixPoints.push({
        position: [0, y, 0] as [number, number, number],
        color: "#00FFFF", // Neon Blue for Future-Proof Skills
        type: "future",
      })
    }
  }

  return (
    <group ref={helixRef}>
      {helixPoints.map((point, index) => (
        <Sphere key={index} position={point.position} args={[0.08 + mutationLevel * 0.02, 8, 8]}>
          <meshStandardMaterial
            color={point.color}
            emissive={point.color}
            emissiveIntensity={isScanning ? 0.3 + Math.sin(time * 3) * 0.2 : 0.1}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}

      {/* Connecting bonds */}
      {helixPoints.slice(0, -2).map((point, index) => {
        if (index % 2 === 0 && index < helixPoints.length - 2) {
          const nextPoint = helixPoints[index + 1]
          const midPoint = [
            (point.position[0] + nextPoint.position[0]) / 2,
            (point.position[1] + nextPoint.position[1]) / 2,
            (point.position[2] + nextPoint.position[2]) / 2,
          ] as [number, number, number]

          return (
            <Cylinder key={`bond-${index}`} position={midPoint} args={[0.02, 0.02, 2]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial
                color="#FFFFFF"
                emissive="#FFFFFF"
                emissiveIntensity={isScanning ? 0.2 : 0.05}
                transparent
                opacity={0.6}
              />
            </Cylinder>
          )
        }
        return null
      })}
    </group>
  )
}

// Hologram Effect Component
function HologramEffect() {
  return (
    <mesh>
      <cylinderGeometry args={[3, 3, 0.1, 32]} />
      <meshStandardMaterial color="#00FFFF" transparent opacity={0.1} emissive="#00FFFF" emissiveIntensity={0.2} />
    </mesh>
  )
}

export function AICareerDNAVisualization() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [mutationLevel, setMutationLevel] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const skillGenome = {
    coreStrengths: [
      { name: "Strategic Thinking", strength: 92, mutations: 3 },
      { name: "Problem Solving", strength: 88, mutations: 2 },
      { name: "Leadership", strength: 85, mutations: 1 },
      { name: "Communication", strength: 90, mutations: 4 },
    ],
    hiddenTalents: [
      { name: "Pattern Recognition", strength: 78, mutations: 5 },
      { name: "Systems Design", strength: 82, mutations: 3 },
      { name: "Emotional Intelligence", strength: 75, mutations: 2 },
      { name: "Creative Problem Solving", strength: 80, mutations: 4 },
    ],
    futureProofSkills: [
      { name: "AI Collaboration", strength: 70, mutations: 8 },
      { name: "Quantum Literacy", strength: 45, mutations: 12 },
      { name: "Biotech Integration", strength: 55, mutations: 10 },
      { name: "Space Commerce", strength: 35, mutations: 15 },
    ],
  }

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setAnalysisComplete(false)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setAnalysisComplete(true)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Simulate mutations during scan
    const mutationInterval = setInterval(() => {
      setMutationLevel((prev) => Math.min(prev + 0.1, 1))
    }, 200)

    setTimeout(() => {
      clearInterval(mutationInterval)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-purple-800 to-blue-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            AI Career DNA Visualization
          </h1>
          <p className="text-xl text-purple-200 mb-6">Interactive 3D helix model revealing your unique skill-genome</p>
          <div className="flex justify-center gap-4 mb-6">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Core Strengths (Gold)</Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Hidden Talents (Purple)</Badge>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Future-Proof Skills (Neon Blue)</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D DNA Visualization */}
          <Card className="bg-slate-700/70 border-purple-400/40 h-[600px]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                🧬 Career DNA Helix
                {isScanning && (
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 animate-pulse">SCANNING</Badge>
                )}
              </CardTitle>
              <CardDescription className="text-purple-200">
                Real-time mutation effects as you develop new skills
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] relative">
              <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8A2BE2" />

                <HologramEffect />
                <DNAHelix isScanning={isScanning} mutationLevel={mutationLevel} />

                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={5}
                  maxDistance={15}
                />
              </Canvas>

              {/* Hologram UI Overlay */}
              <div className="absolute top-4 left-4 bg-slate-800/90 rounded-lg p-3 border border-cyan-400/50">
                <div className="text-cyan-300 text-sm font-mono">HOLOGRAM ACTIVE</div>
                <div className="text-cyan-200 text-xs">Mutation Level: {Math.round(mutationLevel * 100)}%</div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Scan Controls */}
            <Card className="bg-slate-700/70 border-purple-400/40">
              <CardHeader>
                <CardTitle className="text-white">DNA Sequence Analysis</CardTitle>
                <CardDescription className="text-purple-200">
                  Initiate skill-genome scan with real-time mutation tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={startScan}
                  disabled={isScanning}
                  className="w-full bg-gradient-to-r from-yellow-600 to-purple-600 hover:from-yellow-700 hover:to-purple-700"
                >
                  {isScanning ? "Scanning DNA..." : "Start Career DNA Scan"}
                </Button>

                {isScanning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-purple-200">
                      <span>Scan Progress</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <Progress value={scanProgress} className="bg-slate-800" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skill Genome Results */}
            {analysisComplete && (
              <Card className="bg-slate-700/70 border-purple-400/40">
                <CardHeader>
                  <CardTitle className="text-white">Skill Genome Analysis</CardTitle>
                  <CardDescription className="text-purple-200">
                    Your unique career DNA with mutation tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="core" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-600/80">
                      <TabsTrigger value="core" className="text-yellow-300">
                        Core Strengths
                      </TabsTrigger>
                      <TabsTrigger value="hidden" className="text-purple-300">
                        Hidden Talents
                      </TabsTrigger>
                      <TabsTrigger value="future" className="text-cyan-300">
                        Future-Proof
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="core" className="space-y-3">
                      {skillGenome.coreStrengths.map((skill, index) => (
                        <div key={index} className="bg-slate-600/70 rounded-lg p-3 border border-yellow-400/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-yellow-300 font-medium">{skill.name}</span>
                            <Badge className="bg-yellow-500/20 text-yellow-300">{skill.mutations} mutations</Badge>
                          </div>
                          <Progress value={skill.strength} className="bg-slate-700" />
                          <div className="text-xs text-yellow-200 mt-1">Strength: {skill.strength}%</div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="hidden" className="space-y-3">
                      {skillGenome.hiddenTalents.map((skill, index) => (
                        <div key={index} className="bg-slate-600/70 rounded-lg p-3 border border-purple-400/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-purple-300 font-medium">{skill.name}</span>
                            <Badge className="bg-purple-500/20 text-purple-300">{skill.mutations} mutations</Badge>
                          </div>
                          <Progress value={skill.strength} className="bg-slate-700" />
                          <div className="text-xs text-purple-200 mt-1">Strength: {skill.strength}%</div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="future" className="space-y-3">
                      {skillGenome.futureProofSkills.map((skill, index) => (
                        <div key={index} className="bg-slate-600/70 rounded-lg p-3 border border-cyan-400/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-cyan-300 font-medium">{skill.name}</span>
                            <Badge className="bg-cyan-500/20 text-cyan-300">{skill.mutations} mutations</Badge>
                          </div>
                          <Progress value={skill.strength} className="bg-slate-700" />
                          <div className="text-xs text-cyan-200 mt-1">Strength: {skill.strength}%</div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
