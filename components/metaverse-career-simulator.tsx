"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const careers = [
  {
    id: "ai-ethics-lawyer",
    title: "AI Ethics Lawyer",
    environment: "Virtual Courtroom",
    description: "Navigate complex AI bias cases in a futuristic legal setting",
    avatar: "/placeholder-v1vc1.png",
    skills: ["Legal Reasoning", "AI Ethics", "Critical Thinking", "Communication"],
    scenario: "Defending a client whose AI hiring algorithm was accused of discrimination",
    difficulty: "Expert",
    duration: "45 minutes",
    rewards: ["Ethics Certification", "Legal Tech Badge", "AI Law Specialist"],
  },
  {
    id: "space-tourism-manager",
    title: "Space Tourism Manager",
    environment: "Mars Base Station",
    description: "Manage luxury space travel operations on a Martian outpost",
    avatar: "/space-manager-avatar.png",
    skills: ["Operations Management", "Crisis Response", "Customer Service", "Space Tech"],
    scenario: "Coordinating emergency evacuation during a solar storm",
    difficulty: "Advanced",
    duration: "30 minutes",
    rewards: ["Space Operations Badge", "Crisis Management Cert", "Tourism Expert"],
  },
  {
    id: "crypto-detective",
    title: "Crypto Detective",
    environment: "Digital Investigation Lab",
    description: "Track blockchain scams through virtual reality interfaces",
    avatar: "/cyber-detective-avatar.png",
    skills: ["Blockchain Analysis", "Pattern Recognition", "Digital Forensics", "Investigation"],
    scenario: "Tracing a $50M cryptocurrency theft through multiple wallets",
    difficulty: "Expert",
    duration: "60 minutes",
    rewards: ["Blockchain Detective Badge", "Crypto Forensics Cert", "Investigation Master"],
  },
]

const skillFeedback = [
  { skill: "Problem Solving", current: 78, target: 85, trend: "+7%" },
  { skill: "Communication", current: 82, target: 90, trend: "+5%" },
  { skill: "Technical Expertise", current: 71, target: 80, trend: "+12%" },
  { skill: "Leadership", current: 65, target: 75, trend: "+8%" },
]

export function MetaverseCareerSimulator() {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("careers")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulationProgress((prev) => {
          if (prev >= 100) {
            setIsSimulating(false)
            return 100
          }
          return prev + 2
        })
      }, 200)
    }
    return () => clearInterval(interval)
  }, [isSimulating])

  const startSimulation = (careerId: string) => {
    setSelectedCareer(careerId)
    setIsSimulating(true)
    setSimulationProgress(0)
    setActiveTab("simulation")
  }

  const selectedCareerData = careers.find((c) => c.id === selectedCareer)

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-950 via-purple-900 to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Metaverse Career Simulator
          </h1>
          <p className="text-purple-200 text-lg max-w-3xl mx-auto">
            Step into fully immersive VR workspaces and experience careers before you commit. Game-like avatars provide
            real-time skill feedback as you navigate complex scenarios.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-purple-500/20">
            <TabsTrigger value="careers" className="data-[state=active]:bg-fuchsia-600">
              Career Selection
            </TabsTrigger>
            <TabsTrigger value="simulation" className="data-[state=active]:bg-fuchsia-600">
              VR Simulation
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-fuchsia-600">
              Skill Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="careers" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {careers.map((career) => (
                <Card
                  key={career.id}
                  className="bg-slate-800/50 border-fuchsia-500/20 hover:border-fuchsia-400/40 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16 border-2 border-fuchsia-400">
                        <AvatarImage src={career.avatar || "/placeholder.svg"} alt={career.title} />
                        <AvatarFallback className="bg-fuchsia-600 text-white">
                          {career.title
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-white text-lg">{career.title}</CardTitle>
                        <Badge className="bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30">
                          {career.environment}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-purple-200">{career.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {career.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-purple-200">
                        <span>Difficulty:</span>
                        <Badge
                          className={
                            career.difficulty === "Expert"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-orange-500/20 text-orange-300"
                          }
                        >
                          {career.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-purple-200">
                        <span>Duration:</span>
                        <span>{career.duration}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => startSimulation(career.id)}
                      className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700"
                    >
                      Enter VR Simulation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            {selectedCareerData ? (
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-fuchsia-500/20">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20 border-2 border-fuchsia-400">
                        <AvatarImage
                          src={selectedCareerData.avatar || "/placeholder.svg"}
                          alt={selectedCareerData.title}
                        />
                        <AvatarFallback className="bg-fuchsia-600 text-white text-lg">
                          {selectedCareerData.title
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-white text-2xl">{selectedCareerData.title}</CardTitle>
                        <Badge className="bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30">
                          {selectedCareerData.environment}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Current Scenario</h4>
                        <p className="text-purple-200">{selectedCareerData.scenario}</p>
                      </div>

                      {isSimulating && (
                        <div className="space-y-3">
                          <div className="flex justify-between text-white">
                            <span>Simulation Progress</span>
                            <span>{simulationProgress}%</span>
                          </div>
                          <Progress value={simulationProgress} className="h-3 bg-slate-700">
                            <div
                              className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 transition-all duration-300"
                              style={{ width: `${simulationProgress}%` }}
                            />
                          </Progress>
                          <div className="text-center">
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 animate-pulse">
                              🎮 VR Simulation Active
                            </Badge>
                          </div>
                        </div>
                      )}

                      {simulationProgress === 100 && (
                        <div className="space-y-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <h4 className="text-green-300 font-semibold">Simulation Complete!</h4>
                          <div>
                            <h5 className="text-white font-medium mb-2">Rewards Earned:</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedCareerData.rewards.map((reward) => (
                                <Badge key={reward} className="bg-gold-500/20 text-yellow-300 border-yellow-500/30">
                                  🏆 {reward}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            onClick={() => setActiveTab("feedback")}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          >
                            View Skill Feedback
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-slate-800/50 border-fuchsia-500/20">
                <CardContent className="text-center py-12">
                  <p className="text-purple-200 text-lg">
                    Select a career from the Career Selection tab to begin your VR simulation
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card className="bg-slate-800/50 border-fuchsia-500/20">
              <CardHeader>
                <CardTitle className="text-white">Real-Time Skill Feedback</CardTitle>
                <CardDescription className="text-purple-200">
                  Your avatar's performance analysis from the VR simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillFeedback.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-200">{skill.current}/100</span>
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{skill.trend}</Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={skill.current} className="h-3 bg-slate-700">
                          <div
                            className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${skill.current}%` }}
                          />
                        </Progress>
                        <div
                          className="absolute top-0 h-3 w-1 bg-yellow-400 transition-all duration-300"
                          style={{ left: `${skill.target}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-purple-300">
                        <span>Current: {skill.current}</span>
                        <span>Target: {skill.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-fuchsia-500/20">
              <CardHeader>
                <CardTitle className="text-white">Avatar Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-fuchsia-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-fuchsia-300">A+</div>
                    <div className="text-purple-200">Overall Grade</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-purple-300">87%</div>
                    <div className="text-purple-200">Scenario Success</div>
                  </div>
                  <div className="text-center p-4 bg-indigo-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-300">+12</div>
                    <div className="text-purple-200">Skill Points Gained</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
