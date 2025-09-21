"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SkillStorm {
  id: string
  name: string
  intensity: number
  timeToImpact: number
  sources: string[]
  confidence: number
  category: "urgent" | "emerging" | "future"
  x: number
  y: number
}

const skillStorms: SkillStorm[] = [
  {
    id: "ai-prompt",
    name: "AI Prompt Engineering",
    intensity: 95,
    timeToImpact: 2,
    sources: ["OpenAI Patents", "VC Investments", "Job Postings"],
    confidence: 92,
    category: "urgent",
    x: 45,
    y: 30,
  },
  {
    id: "quantum-literacy",
    name: "Quantum Literacy",
    intensity: 78,
    timeToImpact: 8,
    sources: ["IBM Research", "Google Patents", "Academic Papers"],
    confidence: 85,
    category: "emerging",
    x: 65,
    y: 55,
  },
  {
    id: "neuro-interfaces",
    name: "Neural Interface Design",
    intensity: 82,
    timeToImpact: 12,
    sources: ["Neuralink Patents", "Meta Research", "NIH Grants"],
    confidence: 78,
    category: "future",
    x: 25,
    y: 70,
  },
  {
    id: "climate-adaptation",
    name: "Climate Adaptation Strategy",
    intensity: 88,
    timeToImpact: 4,
    sources: ["UN Reports", "Green Tech VC", "Policy Papers"],
    confidence: 89,
    category: "urgent",
    x: 75,
    y: 25,
  },
  {
    id: "space-commerce",
    name: "Space Commerce Law",
    intensity: 65,
    timeToImpact: 15,
    sources: ["SpaceX Filings", "NASA Contracts", "Space Startups"],
    confidence: 72,
    category: "future",
    x: 35,
    y: 45,
  },
  {
    id: "synthetic-biology",
    name: "Synthetic Biology Ethics",
    intensity: 71,
    timeToImpact: 10,
    sources: ["Biotech Patents", "FDA Guidelines", "Research Papers"],
    confidence: 81,
    category: "emerging",
    x: 55,
    y: 75,
  },
]

const microCourses = [
  {
    skill: "AI Prompt Engineering",
    title: "Mastering GPT-4 Prompt Architecture",
    duration: "2 hours",
    sources: ["OpenAI Documentation", "Latest Research Papers", "Industry Case Studies"],
    modules: ["Prompt Fundamentals", "Advanced Techniques", "Business Applications"],
  },
  {
    skill: "Quantum Literacy",
    title: "Quantum Computing for Business Leaders",
    duration: "4 hours",
    sources: ["IBM Quantum Network", "Academic Research", "Industry Reports"],
    modules: ["Quantum Basics", "Business Applications", "Strategic Planning"],
  },
  {
    skill: "Climate Adaptation Strategy",
    title: "Climate-Resilient Business Planning",
    duration: "3 hours",
    sources: ["IPCC Reports", "Corporate Case Studies", "Policy Analysis"],
    modules: ["Risk Assessment", "Adaptation Strategies", "Implementation"],
  },
]

export function AnticipatoryLearningEngine() {
  const [selectedStorm, setSelectedStorm] = useState<SkillStorm | null>(null)
  const [radarSweep, setRadarSweep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarSweep((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const getStormColor = (category: string, intensity: number) => {
    const alpha = intensity / 100
    switch (category) {
      case "urgent":
        return `rgba(239, 68, 68, ${alpha})`
      case "emerging":
        return `rgba(245, 158, 11, ${alpha})`
      case "future":
        return `rgba(59, 130, 246, ${alpha})`
      default:
        return `rgba(156, 163, 175, ${alpha})`
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "urgent":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "emerging":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "future":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Anticipatory Learning Engine
          </h1>
          <p className="text-xl text-blue-200 mb-6">
            Weather radar-style tracking of skill storms 6-18 months before demand spikes
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">🚨 Urgent Skills (0-6 months)</Badge>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
              ⚡ Emerging Skills (6-12 months)
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">🔮 Future Skills (12-18 months)</Badge>
          </div>
        </div>

        <Tabs defaultValue="radar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="radar">Skill Storm Radar</TabsTrigger>
            <TabsTrigger value="matrix">Priority Matrix</TabsTrigger>
            <TabsTrigger value="courses">Micro-Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="radar" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Radar Display */}
              <Card className="bg-slate-800/50 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-300 flex items-center gap-2">🌪️ Skill Storm Radar</CardTitle>
                  <CardDescription className="text-blue-200">
                    Real-time tracking of emerging skill demands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    {/* Radar Background */}
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      {/* Radar Circles */}
                      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
                      <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
                      <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
                      <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />

                      {/* Radar Lines */}
                      <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
                      <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />

                      {/* Radar Sweep */}
                      <line
                        x1="100"
                        y1="100"
                        x2={100 + 80 * Math.cos(((radarSweep - 90) * Math.PI) / 180)}
                        y2={100 + 80 * Math.sin(((radarSweep - 90) * Math.PI) / 180)}
                        stroke="rgba(34, 197, 94, 0.8)"
                        strokeWidth="2"
                      />

                      {/* Skill Storms */}
                      {skillStorms.map((storm) => (
                        <g key={storm.id}>
                          <circle
                            cx={100 + (storm.x - 50) * 1.6}
                            cy={100 + (storm.y - 50) * 1.6}
                            r={storm.intensity / 10}
                            fill={getStormColor(storm.category, storm.intensity)}
                            stroke={getStormColor(storm.category, 100)}
                            strokeWidth="2"
                            className="cursor-pointer hover:opacity-80"
                            onClick={() => setSelectedStorm(storm)}
                          />
                          <text
                            x={100 + (storm.x - 50) * 1.6}
                            y={100 + (storm.y - 50) * 1.6 + 15}
                            textAnchor="middle"
                            className="text-xs fill-white font-medium"
                          >
                            {storm.name.split(" ")[0]}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Storm Details */}
              <Card className="bg-slate-800/50 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-300">
                    {selectedStorm ? "Storm Analysis" : "Select a Skill Storm"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedStorm ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">{selectedStorm.name}</h3>
                        <Badge className={getCategoryBadge(selectedStorm.category)}>
                          {selectedStorm.category.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">Storm Intensity</span>
                            <span className="text-white">{selectedStorm.intensity}%</span>
                          </div>
                          <Progress value={selectedStorm.intensity} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">Confidence Level</span>
                            <span className="text-white">{selectedStorm.confidence}%</span>
                          </div>
                          <Progress value={selectedStorm.confidence} className="h-2" />
                        </div>

                        <div>
                          <span className="text-blue-200 text-sm">Time to Impact:</span>
                          <p className="text-white font-medium">{selectedStorm.timeToImpact} months</p>
                        </div>

                        <div>
                          <span className="text-blue-200 text-sm">Intelligence Sources:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedStorm.sources.map((source, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-blue-200">Click on a skill storm in the radar to view detailed analysis</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="matrix" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-300">🚨 Urgent Skills (0-6 months)</CardTitle>
                  <CardDescription className="text-red-200">High-impact skills needed immediately</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skillStorms
                      .filter((s) => s.category === "urgent")
                      .map((skill) => (
                        <div
                          key={skill.id}
                          className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                        >
                          <div>
                            <h4 className="font-medium text-white">{skill.name}</h4>
                            <p className="text-sm text-red-200">{skill.timeToImpact} months to impact</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-300">{skill.intensity}%</div>
                            <div className="text-xs text-red-200">intensity</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-amber-300">⚡ Emerging Skills (6-12 months)</CardTitle>
                  <CardDescription className="text-amber-200">
                    Skills gaining momentum for medium-term impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skillStorms
                      .filter((s) => s.category === "emerging")
                      .map((skill) => (
                        <div
                          key={skill.id}
                          className="flex justify-between items-center p-3 bg-amber-500/10 rounded-lg border border-amber-500/20"
                        >
                          <div>
                            <h4 className="font-medium text-white">{skill.name}</h4>
                            <p className="text-sm text-amber-200">{skill.timeToImpact} months to impact</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-amber-300">{skill.intensity}%</div>
                            <div className="text-xs text-amber-200">intensity</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-300">🔮 Future Skills (12-18 months)</CardTitle>
                <CardDescription className="text-blue-200">Long-term skills for strategic positioning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {skillStorms
                    .filter((s) => s.category === "future")
                    .map((skill) => (
                      <div
                        key={skill.id}
                        className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20"
                      >
                        <div>
                          <h4 className="font-medium text-white">{skill.name}</h4>
                          <p className="text-sm text-blue-200">{skill.timeToImpact} months to impact</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-300">{skill.intensity}%</div>
                          <div className="text-xs text-blue-200">intensity</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {microCourses.map((course, index) => (
                <Card key={index} className="bg-slate-800/50 border-cyan-500/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-cyan-300">{course.title}</CardTitle>
                        <CardDescription className="text-cyan-200">Auto-generated for {course.skill}</CardDescription>
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">{course.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-cyan-200 mb-2">Course Modules:</h4>
                        <div className="flex flex-wrap gap-2">
                          {course.modules.map((module, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {module}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-cyan-200 mb-2">Generated from:</h4>
                        <div className="flex flex-wrap gap-2">
                          {course.sources.map((source, idx) => (
                            <Badge key={idx} className="bg-slate-700/50 text-slate-300 text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                        Start Learning Path
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
