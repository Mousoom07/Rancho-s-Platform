"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Star, Users, Sparkles, MessageCircle, Clock, Brain, Globe } from "lucide-react"

interface WorkstyleProfile {
  primary: string
  secondary: string
  description: string
  traits: string[]
  neurodivergent: string[]
  timezone: string
  peakHours: string
  color: string
  zodiacSign: string
}

interface Match {
  name: string
  profile: WorkstyleProfile
  compatibility: number
  reason: string
  company: string
  role: string
  timezoneSync: number
  neurodivergentMatch: string
}

const workstyleProfiles: Record<string, WorkstyleProfile> = {
  "Hustler + Visionary": {
    primary: "Hustler",
    secondary: "Visionary",
    description: "High-energy execution meets big-picture thinking",
    traits: ["Fast execution", "Strategic thinking", "Risk-taking", "Future-focused"],
    neurodivergent: ["ADHD hyperfocus", "Pattern recognition"],
    timezone: "EST",
    peakHours: "6-10 AM, 7-11 PM",
    color: "from-orange-500 to-red-500",
    zodiacSign: "Aries ♈",
  },
  "Analyzer + Builder": {
    primary: "Analyzer",
    secondary: "Builder",
    description: "Deep research drives systematic construction",
    traits: ["Data-driven", "Methodical", "Quality-focused", "Detail-oriented"],
    neurodivergent: ["Autism precision", "Systematic thinking"],
    timezone: "PST",
    peakHours: "9 AM-1 PM, 2-6 PM",
    color: "from-blue-500 to-indigo-500",
    zodiacSign: "Virgo ♍",
  },
  "Connector + Catalyst": {
    primary: "Connector",
    secondary: "Catalyst",
    description: "Network effects amplify transformational change",
    traits: ["Relationship-building", "Change agent", "Influential", "Collaborative"],
    neurodivergent: ["Social intuition", "Emotional intelligence"],
    timezone: "CET",
    peakHours: "10 AM-2 PM, 4-8 PM",
    color: "from-pink-500 to-purple-500",
    zodiacSign: "Gemini ♊",
  },
  "Innovator + Optimizer": {
    primary: "Innovator",
    secondary: "Optimizer",
    description: "Creative breakthroughs refined to perfection",
    traits: ["Creative solutions", "Process improvement", "Efficiency", "Innovation"],
    neurodivergent: ["Divergent thinking", "Perfectionism"],
    timezone: "JST",
    peakHours: "11 PM-3 AM, 8-11 AM",
    color: "from-teal-500 to-cyan-500",
    zodiacSign: "Aquarius ♒",
  },
  "Guardian + Mentor": {
    primary: "Guardian",
    secondary: "Mentor",
    description: "Protective instincts guide others to success",
    traits: ["Supportive", "Wisdom-sharing", "Protective", "Growth-focused"],
    neurodivergent: ["Empathic sensitivity", "Pattern memory"],
    timezone: "GMT",
    peakHours: "7-11 AM, 1-5 PM",
    color: "from-green-500 to-emerald-500",
    zodiacSign: "Cancer ♋",
  },
  "Maverick + Disruptor": {
    primary: "Maverick",
    secondary: "Disruptor",
    description: "Independent thinking breaks conventional boundaries",
    traits: ["Unconventional", "Boundary-breaking", "Independent", "Disruptive"],
    neurodivergent: ["Non-linear thinking", "Sensory processing"],
    timezone: "AEST",
    peakHours: "2-6 AM, 3-7 PM",
    color: "from-violet-500 to-fuchsia-500",
    zodiacSign: "Scorpio ♏",
  },
}

const sampleMatches: Match[] = [
  {
    name: "Elena Rodriguez",
    profile: workstyleProfiles["Analyzer + Builder"],
    compatibility: 96,
    reason: "Your visionary ideas + their systematic execution = unstoppable product development",
    company: "DataFlow",
    role: "Senior Engineer",
    timezoneSync: 85,
    neurodivergentMatch: "ADHD hyperfocus complements autism precision perfectly",
  },
  {
    name: "Marcus Chen",
    profile: workstyleProfiles["Connector + Catalyst"],
    compatibility: 91,
    reason: "Your hustle energy amplifies their network effects for exponential growth",
    company: "NetworkLabs",
    role: "VP Partnerships",
    timezoneSync: 72,
    neurodivergentMatch: "Pattern recognition enhances their social intuition",
  },
  {
    name: "Zara Kim",
    profile: workstyleProfiles["Innovator + Optimizer"],
    compatibility: 88,
    reason: "Both future-focused with complementary creative and execution strengths",
    company: "InnovateCorp",
    role: "Design Director",
    timezoneSync: 45,
    neurodivergentMatch: "Divergent thinking creates powerful brainstorming synergy",
  },
  {
    name: "Alex Thompson",
    profile: workstyleProfiles["Guardian + Mentor"],
    compatibility: 83,
    reason: "Your risk-taking balanced by their wisdom creates sustainable growth",
    company: "MentorTech",
    role: "Head of People",
    timezoneSync: 90,
    neurodivergentMatch: "Empathic sensitivity provides grounding for hyperfocus",
  },
]

const questions = [
  {
    id: "energy",
    question: "When is your brain most powerful?",
    options: [
      { value: "hustler", label: "Early morning + late evening bursts" },
      { value: "analyzer", label: "Consistent 9-5 deep work blocks" },
      { value: "connector", label: "Mid-day social energy peaks" },
      { value: "innovator", label: "Late night creative sessions" },
      { value: "guardian", label: "Morning clarity + afternoon wisdom" },
      { value: "maverick", label: "Unpredictable but intense bursts" },
    ],
  },
  {
    id: "neurodivergent",
    question: "Which describes your thinking style?",
    options: [
      { value: "hyperfocus", label: "Intense hyperfocus on interesting problems" },
      { value: "systematic", label: "Systematic, detailed, precision-oriented" },
      { value: "social", label: "High emotional intelligence and social intuition" },
      { value: "divergent", label: "Non-linear, creative, connecting distant ideas" },
      { value: "empathic", label: "Highly sensitive to others' needs and emotions" },
      { value: "nonlinear", label: "Unconventional processing, sensory-rich thinking" },
    ],
  },
  {
    id: "approach",
    question: "Your superpower in collaboration?",
    options: [
      { value: "visionary", label: "See the big picture and inspire action" },
      { value: "builder", label: "Turn ideas into systematic, quality results" },
      { value: "catalyst", label: "Accelerate change through relationships" },
      { value: "optimizer", label: "Perfect processes and creative solutions" },
      { value: "mentor", label: "Guide others and protect team wellbeing" },
      { value: "disruptor", label: "Challenge assumptions and break boundaries" },
    ],
  },
]

export function NetworkingAstrology() {
  const [currentStep, setCurrentStep] = useState<"quiz" | "profile" | "matches">("quiz")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [userProfile, setUserProfile] = useState<WorkstyleProfile | null>(null)

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const generateProfile = () => {
    const { energy, neurodivergent, approach } = answers

    let profileKey = ""

    if (energy === "hustler" && approach === "visionary") {
      profileKey = "Hustler + Visionary"
    } else if (energy === "analyzer" && approach === "builder") {
      profileKey = "Analyzer + Builder"
    } else if (energy === "connector" && approach === "catalyst") {
      profileKey = "Connector + Catalyst"
    } else if (energy === "innovator" && approach === "optimizer") {
      profileKey = "Innovator + Optimizer"
    } else if (energy === "guardian" && approach === "mentor") {
      profileKey = "Guardian + Mentor"
    } else {
      profileKey = "Maverick + Disruptor"
    }

    setUserProfile(workstyleProfiles[profileKey])
    setCurrentStep("profile")
  }

  const findMatches = () => {
    setCurrentStep("matches")
  }

  if (currentStep === "quiz") {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
              <Sparkles className="h-6 w-6 text-purple-400 animate-bounce" />
              <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Networking Astrology
            </CardTitle>
            <CardDescription className="text-lg text-purple-200">
              AI-powered compatibility matching based on workstyle, timezone, and neurodivergent traits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {questions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  {question.question}
                </h3>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="grid grid-cols-1 gap-3"
                >
                  {question.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="text-purple-100 cursor-pointer hover:text-white transition-colors flex-1"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <Button
              onClick={generateProfile}
              disabled={Object.keys(answers).length < 3}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Reveal My Cosmic Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "profile" && userProfile) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="relative">
                <Star className="h-12 w-12 text-yellow-400 animate-pulse" />
                <Sparkles className="h-6 w-6 text-purple-400 absolute -top-1 -right-1 animate-bounce" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">Your Cosmic Profile</CardTitle>
            <div
              className={`text-4xl font-bold bg-gradient-to-r ${userProfile.color} bg-clip-text text-transparent mb-2`}
            >
              {userProfile.primary} + {userProfile.secondary}
            </div>
            <div className="text-2xl text-purple-300 mb-4">{userProfile.zodiacSign}</div>
            <CardDescription className="text-lg text-purple-200 max-w-2xl mx-auto">
              {userProfile.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">Peak Hours</h4>
                <p className="text-purple-200 text-sm">{userProfile.peakHours}</p>
                <p className="text-purple-300 text-xs">{userProfile.timezone}</p>
              </div>
              <div className="text-center">
                <Brain className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">Neurodivergent Traits</h4>
                <div className="space-y-1">
                  {userProfile.neurodivergent.map((trait, index) => (
                    <p key={index} className="text-purple-200 text-sm">
                      {trait}
                    </p>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">Timezone</h4>
                <p className="text-purple-200 text-sm">{userProfile.timezone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userProfile.traits.map((trait, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-purple-600/20 text-purple-200 border-purple-500/30 justify-center py-2"
                >
                  {trait}
                </Badge>
              ))}
            </div>

            <Button
              onClick={findMatches}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Find My Cosmic Matches
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "matches") {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white mb-2">Your Cosmic Network Matches</CardTitle>
            <CardDescription className="text-lg text-purple-200">
              AI-powered compatibility based on workstyle, timezone alignment, and neurodivergent synergy
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleMatches.map((match, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <CardTitle className="text-xl text-white">{match.name}</CardTitle>
                    <p className="text-purple-300">
                      {match.role} at {match.company}
                    </p>
                    <p className="text-sm text-purple-400">{match.profile.zodiacSign}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{match.compatibility}%</div>
                    <div className="text-sm text-purple-300">Match</div>
                  </div>
                </div>

                <div
                  className={`text-lg font-semibold bg-gradient-to-r ${match.profile.color} bg-clip-text text-transparent mb-2`}
                >
                  {match.profile.primary} + {match.profile.secondary}
                </div>

                <Progress value={match.compatibility} className="mb-4" />
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="text-purple-200">Timezone Sync: {match.timezoneSync}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-pink-400" />
                      <span className="text-purple-200">Neural Match</span>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 p-4 rounded-lg space-y-2">
                    <p className="text-purple-100 text-sm">
                      <strong>Why you match:</strong> {match.reason}
                    </p>
                    <p className="text-purple-200 text-xs">
                      <strong>Neurodivergent synergy:</strong> {match.neurodivergentMatch}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {match.profile.traits.slice(0, 3).map((trait, traitIndex) => (
                      <Badge
                        key={traitIndex}
                        variant="outline"
                        className="text-xs border-purple-500/30 text-purple-200"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-purple-500/30 text-purple-200 hover:bg-purple-600/20 bg-transparent"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Connect & Collaborate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => setCurrentStep("quiz")}
            variant="outline"
            className="border-purple-500/30 text-purple-200 hover:bg-purple-600/20"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Retake Cosmic Assessment
          </Button>
        </div>
      </div>
    )
  }

  return null
}
