"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, TrendingUp, Heart, DollarSign, Briefcase, GraduationCap, Building } from "lucide-react"

interface CareerScenario {
  id: string
  title: string
  description: string
  thumbnail: string
  outcomes: {
    year5: { salary: string; satisfaction: number; workLife: number; title: string }
    year10: { salary: string; satisfaction: number; workLife: number; title: string }
    year15: { salary: string; satisfaction: number; workLife: number; title: string }
  }
  keyMilestones: string[]
  riskFactors: string[]
  opportunities: string[]
}

const scenarios: CareerScenario[] = [
  {
    id: "startup-offer",
    title: "Take the Startup Offer",
    description: "Join a Series A fintech startup as Senior Engineer",
    thumbnail: "🚀",
    outcomes: {
      year5: { salary: "₹1.44Cr", satisfaction: 85, workLife: 65, title: "Engineering Manager" },
      year10: { salary: "₹2.56Cr", satisfaction: 90, workLife: 70, title: "VP of Engineering" },
      year15: { salary: "₹3.6Cr", satisfaction: 88, workLife: 75, title: "CTO" },
    },
    keyMilestones: ["Lead 15-person team", "IPO equity payout", "Industry speaking circuit"],
    riskFactors: ["Startup failure risk", "High stress periods", "Equity volatility"],
    opportunities: ["Rapid career growth", "Equity upside", "Leadership experience"],
  },
  {
    id: "mba-pause",
    title: "Pause for MBA",
    description: "Take 2 years for top-tier MBA program",
    thumbnail: "🎓",
    outcomes: {
      year5: { salary: "₹1.76Cr", satisfaction: 80, workLife: 80, title: "Product Director" },
      year10: { salary: "₹3.04Cr", satisfaction: 85, workLife: 75, title: "VP of Product" },
      year15: { salary: "₹4.16Cr", satisfaction: 92, workLife: 85, title: "Chief Product Officer" },
    },
    keyMilestones: ["MBA from Wharton", "Product leadership role", "Board advisor positions"],
    riskFactors: ["2-year income gap", "₹1.6Cr debt", "Career momentum loss"],
    opportunities: ["Executive network", "Strategic thinking", "Cross-functional leadership"],
  },
  {
    id: "big-tech",
    title: "Stay at Big Tech",
    description: "Continue climbing the ladder at current FAANG company",
    thumbnail: "🏢",
    outcomes: {
      year5: { salary: "₹2.24Cr", satisfaction: 75, workLife: 85, title: "Senior Staff Engineer" },
      year10: { salary: "₹3.36Cr", satisfaction: 70, workLife: 80, title: "Principal Engineer" },
      year15: { salary: "₹4.4Cr", satisfaction: 68, workLife: 75, title: "Distinguished Engineer" },
    },
    keyMilestones: ["Technical leadership", "Patent portfolio", "Mentorship programs"],
    riskFactors: ["Innovation stagnation", "Bureaucracy growth", "Ageism concerns"],
    opportunities: ["Stable income", "Technical depth", "Industry influence"],
  },
  {
    id: "freelance-consultant",
    title: "Go Independent",
    description: "Launch freelance consulting practice",
    thumbnail: "💼",
    outcomes: {
      year5: { salary: "₹1.28Cr", satisfaction: 95, workLife: 90, title: "Senior Consultant" },
      year10: { salary: "₹1.92Cr", satisfaction: 92, workLife: 95, title: "Boutique Agency Owner" },
      year15: { salary: "₹2.56Cr", satisfaction: 90, workLife: 98, title: "Industry Expert" },
    },
    keyMilestones: ["Client portfolio", "Thought leadership", "Passive income streams"],
    riskFactors: ["Income volatility", "No benefits", "Client dependency"],
    opportunities: ["Ultimate flexibility", "Diverse projects", "Personal brand"],
  },
]

export function TimeTravelResume() {
  const [selectedScenario, setSelectedScenario] = useState<CareerScenario | null>(null)
  const [currentYear, setCurrentYear] = useState<5 | 10 | 15>(5)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayScenario = (scenario: CareerScenario) => {
    setSelectedScenario(scenario)
    setCurrentYear(5)
    setIsPlaying(true)

    // Simulate timeline progression
    setTimeout(() => setCurrentYear(10), 2000)
    setTimeout(() => setCurrentYear(15), 4000)
    setTimeout(() => setIsPlaying(false), 6000)
  }

  const getCurrentOutcome = () => {
    if (!selectedScenario) return null
    return selectedScenario.outcomes[`year${currentYear}`]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Time-Travel Resume
          </h1>
          <p className="text-xl text-red-200 mb-6">Netflix-style career projections with branching timelines</p>
          <div className="flex justify-center gap-4 mb-6">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
              <Clock className="w-4 h-4 mr-1" />
              5/10/15 Year Projections
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              <TrendingUp className="w-4 h-4 mr-1" />
              Multiple Timelines
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              <Play className="w-4 h-4 mr-1" />
              Cinematic Previews
            </Badge>
          </div>
        </div>

        {!selectedScenario ? (
          /* Scenario Selection */
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Adventure</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {scenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className="bg-slate-900/80 border-red-500/20 hover:border-red-400/40 transition-all duration-300 cursor-pointer group hover:scale-105"
                  onClick={() => handlePlayScenario(scenario)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{scenario.thumbnail}</span>
                      <div>
                        <CardTitle className="text-white group-hover:text-red-300 transition-colors">
                          {scenario.title}
                        </CardTitle>
                        <CardDescription className="text-red-200">{scenario.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-red-300">15-Year Salary:</span>
                        <span className="text-white font-semibold">{scenario.outcomes.year15.salary}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-red-300">Peak Satisfaction:</span>
                        <span className="text-white font-semibold">
                          {Math.max(
                            scenario.outcomes.year5.satisfaction,
                            scenario.outcomes.year10.satisfaction,
                            scenario.outcomes.year15.satisfaction,
                          )}
                          %
                        </span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                        <Play className="w-4 h-4 mr-2" />
                        Play Timeline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Timeline View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{selectedScenario.title}</h2>
              <Button
                variant="outline"
                onClick={() => setSelectedScenario(null)}
                className="border-red-500/30 text-red-300 hover:bg-red-500/10"
              >
                Choose Different Path
              </Button>
            </div>

            {/* Timeline Progress */}
            <Card className="bg-slate-900/80 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-400" />
                  Career Timeline - Year {currentYear}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-red-300">
                    <span>Year 5</span>
                    <span>Year 10</span>
                    <span>Year 15</span>
                  </div>
                  <Progress
                    value={currentYear === 5 ? 33 : currentYear === 10 ? 66 : 100}
                    className="h-2 bg-slate-800"
                  />
                  {isPlaying && (
                    <div className="text-center">
                      <Badge className="bg-red-500/20 text-red-300 border-red-500/30 animate-pulse">
                        Simulating Timeline...
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Current Outcome */}
            {getCurrentOutcome() && (
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-slate-900/80 border-green-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-300 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Salary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">{getCurrentOutcome()?.salary}</div>
                    <div className="text-sm text-green-200">{getCurrentOutcome()?.title}</div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 border-blue-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-blue-300 flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Job Satisfaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">{getCurrentOutcome()?.satisfaction}%</div>
                    <Progress value={getCurrentOutcome()?.satisfaction} className="h-2 bg-slate-800" />
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-300 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Work-Life Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">{getCurrentOutcome()?.workLife}%</div>
                    <Progress value={getCurrentOutcome()?.workLife} className="h-2 bg-slate-800" />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-900/80 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Key Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedScenario.keyMilestones.map((milestone, index) => (
                      <li key={index} className="text-yellow-200 text-sm flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/80 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-300 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Risk Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedScenario.riskFactors.map((risk, index) => (
                      <li key={index} className="text-red-200 text-sm flex items-start gap-2">
                        <span className="text-red-400 mt-1">⚠</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/80 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-300 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedScenario.opportunities.map((opportunity, index) => (
                      <li key={index} className="text-green-200 text-sm flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
