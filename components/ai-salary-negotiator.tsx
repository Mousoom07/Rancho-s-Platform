"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Message {
  id: string
  sender: "user" | "hr"
  content: string
  timestamp: Date
}

interface NegotiationState {
  currentOffer: number
  targetSalary: number
  rounds: number
  hrPersonality: string
  negotiationScore: number
}

const HR_PERSONALITIES = {
  corporate: {
    name: "Corporate Claire",
    company: "MegaCorp Industries",
    style: "Professional and by-the-book",
    responses: {
      opening: "Thank you for your interest in joining MegaCorp. Based on your experience, we're prepared to offer $",
      pushback:
        "I understand your position, but our budget constraints are quite firm. However, I might be able to discuss other benefits.",
      concession: "Let me see what I can do. I've spoken with my manager and we can potentially adjust our offer.",
      final: "This is really the best we can do given current market conditions and our internal equity structure.",
    },
  },
  startup: {
    name: "Startup Steve",
    company: "RocketShip AI",
    style: "Casual but equity-focused",
    responses: {
      opening: "Hey! Super excited about potentially having you join the rocket ship! We're thinking around $",
      pushback:
        "I hear you on the cash, but remember we're pre-IPO! The equity upside here is massive. Plus, free kombucha!",
      concession: "Okay, you drive a hard bargain! Let me crunch some numbers with the founders...",
      final: "This is stretching our runway pretty thin, but we believe in investing in top talent!",
    },
  },
  tech: {
    name: "Tech Tina",
    company: "DataFlow Systems",
    style: "Data-driven and analytical",
    responses: {
      opening: "Based on our compensation benchmarking analysis, we're offering $",
      pushback:
        "I've run the numbers against industry standards. Our offer is at the 75th percentile for your experience level.",
      concession:
        "Let me pull some additional market data. There might be room for adjustment based on specialized skills.",
      final: "This puts you at the 90th percentile for the role. It's really the ceiling for this position level.",
    },
  },
}

export function AISalaryNegotiator() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [negotiationState, setNegotiationState] = useState<NegotiationState>({
    currentOffer: 85000,
    targetSalary: 100000,
    rounds: 0,
    hrPersonality: "corporate",
    negotiationScore: 0,
  })
  const [isNegotiating, setIsNegotiating] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const roles = [
    { value: "software-engineer", label: "Software Engineer", baseRange: [80000, 120000] },
    { value: "product-manager", label: "Product Manager", baseRange: [90000, 140000] },
    { value: "data-scientist", label: "Data Scientist", baseRange: [85000, 130000] },
    { value: "ux-designer", label: "UX Designer", baseRange: [70000, 110000] },
    { value: "marketing-manager", label: "Marketing Manager", baseRange: [65000, 100000] },
  ]

  const experienceLevels = [
    { value: "junior", label: "Junior (0-2 years)", multiplier: 0.8 },
    { value: "mid", label: "Mid-level (3-5 years)", multiplier: 1.0 },
    { value: "senior", label: "Senior (6-8 years)", multiplier: 1.3 },
    { value: "lead", label: "Lead/Principal (9+ years)", multiplier: 1.6 },
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const startNegotiation = () => {
    if (!selectedRole || !selectedExperience) return

    const role = roles.find((r) => r.value === selectedRole)!
    const experience = experienceLevels.find((e) => e.value === selectedExperience)!

    const baseOffer = Math.floor(role.baseRange[0] * experience.multiplier)
    const targetSalary = Math.floor(role.baseRange[1] * experience.multiplier)

    setNegotiationState({
      currentOffer: baseOffer,
      targetSalary,
      rounds: 0,
      hrPersonality: Object.keys(HR_PERSONALITIES)[Math.floor(Math.random() * 3)] as keyof typeof HR_PERSONALITIES,
      negotiationScore: 0,
    })

    const hrPersonality = HR_PERSONALITIES[negotiationState.hrPersonality as keyof typeof HR_PERSONALITIES]
    const openingMessage: Message = {
      id: Date.now().toString(),
      sender: "hr",
      content: `${hrPersonality.responses.opening}${baseOffer.toLocaleString()} annually. How does that sound?`,
      timestamp: new Date(),
    }

    setMessages([openingMessage])
    setIsNegotiating(true)
  }

  const sendMessage = () => {
    if (!currentMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: currentMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")

    // Simulate HR response
    setTimeout(() => {
      const hrResponse = generateHRResponse(currentMessage)
      const hrMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "hr",
        content: hrResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, hrMessage])
    }, 1500)

    setNegotiationState((prev) => ({
      ...prev,
      rounds: prev.rounds + 1,
    }))
  }

  const generateHRResponse = (userMessage: string): string => {
    const hrPersonality = HR_PERSONALITIES[negotiationState.hrPersonality as keyof typeof HR_PERSONALITIES]
    const lowerMessage = userMessage.toLowerCase()

    // Analyze user's negotiation approach
    let response = ""
    let newOffer = negotiationState.currentOffer

    if (lowerMessage.includes("research") || lowerMessage.includes("market") || lowerMessage.includes("industry")) {
      response = hrPersonality.responses.concession
      newOffer = Math.min(negotiationState.currentOffer + 5000, negotiationState.targetSalary * 0.95)
      setNegotiationState((prev) => ({ ...prev, negotiationScore: prev.negotiationScore + 15 }))
    } else if (
      lowerMessage.includes("value") ||
      lowerMessage.includes("contribute") ||
      lowerMessage.includes("experience")
    ) {
      response = hrPersonality.responses.concession
      newOffer = Math.min(negotiationState.currentOffer + 3000, negotiationState.targetSalary * 0.9)
      setNegotiationState((prev) => ({ ...prev, negotiationScore: prev.negotiationScore + 10 }))
    } else if (lowerMessage.includes("need") || lowerMessage.includes("want") || lowerMessage.includes("expect")) {
      response = hrPersonality.responses.pushback
      setNegotiationState((prev) => ({ ...prev, negotiationScore: prev.negotiationScore - 5 }))
    } else if (negotiationState.rounds >= 3) {
      response = hrPersonality.responses.final
      newOffer = Math.min(negotiationState.currentOffer + 2000, negotiationState.targetSalary * 0.85)
    } else {
      response = hrPersonality.responses.pushback
    }

    setNegotiationState((prev) => ({ ...prev, currentOffer: newOffer }))

    if (newOffer > negotiationState.currentOffer) {
      return `${response} We can go up to $${newOffer.toLocaleString()}.`
    }

    return response
  }

  const resetNegotiation = () => {
    setMessages([])
    setIsNegotiating(false)
    setNegotiationState({
      currentOffer: 85000,
      targetSalary: 100000,
      rounds: 0,
      hrPersonality: "corporate",
      negotiationScore: 0,
    })
  }

  const hrPersonality = HR_PERSONALITIES[negotiationState.hrPersonality as keyof typeof HR_PERSONALITIES]

  return (
    <div className="max-w-4xl mx-auto space-y-6 break-words overflow-wrap-anywhere">
      <Card className="bg-gradient-to-br from-green-800/70 to-emerald-700/60 border-2 border-green-400/50 shadow-xl">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold text-green-400 flex items-center gap-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            💰 AI Salary Negotiator
          </CardTitle>
          <p className="text-green-200 font-semibold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
            Practice salary negotiations with adaptive HR bots. Build confidence before the real deal!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isNegotiating ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-sm font-bold text-green-300 mb-2 block"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    Select Role
                  </label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="bg-slate-800/50 border-2 border-green-500/30 text-white font-semibold">
                      <SelectValue placeholder="Choose your target role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    className="text-sm font-bold text-green-300 mb-2 block"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    Experience Level
                  </label>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger className="bg-slate-800/50 border-2 border-green-500/30 text-white font-semibold">
                      <SelectValue placeholder="Your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={startNegotiation}
                disabled={!selectedRole || !selectedExperience}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                Start Negotiation Simulation
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Negotiation Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-slate-700/70 border-2 border-green-400/50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold text-green-400"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                      >
                        ${negotiationState.currentOffer.toLocaleString()}
                      </div>
                      <div
                        className="text-sm text-green-300 font-semibold"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        Current Offer
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700/70 border-2 border-green-400/50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold text-green-400"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                      >
                        {negotiationState.rounds}
                      </div>
                      <div
                        className="text-sm text-green-300 font-semibold"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        Rounds
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700/70 border-2 border-green-400/50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold text-green-400"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                      >
                        {negotiationState.negotiationScore}
                      </div>
                      <div
                        className="text-sm text-green-300 font-semibold"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        Score
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* HR Bot Info */}
              <Card className="bg-slate-700/60 border-2 border-green-400/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-green-300" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        {hrPersonality.name}
                      </div>
                      <div
                        className="text-sm text-green-400 font-semibold"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {hrPersonality.company}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-2 border-green-500/50 text-green-300 font-bold bg-green-900/30"
                    >
                      {hrPersonality.style}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Chat Interface */}
              <Card className="bg-slate-700/60 border-2 border-green-400/50">
                <CardContent className="p-0">
                  <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg border ${
                              message.sender === "user"
                                ? "bg-green-600 text-white border-green-500"
                                : "bg-slate-600 text-green-100 border-slate-500"
                            }`}
                          >
                            <div className="text-sm font-medium" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                              {message.content}
                            </div>
                            <div className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t-2 border-green-500/30">
                    <div className="flex gap-2">
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Type your negotiation response..."
                        className="bg-slate-600/70 border-2 border-green-400/50 text-white font-medium"
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      />
                      <Button onClick={sendMessage} className="bg-green-600 hover:bg-green-700 font-bold">
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Negotiation Tips */}
              <Card className="bg-slate-700/60 border-2 border-green-400/50">
                <CardContent className="p-4">
                  <h3 className="font-bold text-green-300 mb-2" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                    💡 Pro Tips
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-green-200 font-semibold">
                    <div style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>• Research market rates first</div>
                    <div style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>• Emphasize your unique value</div>
                    <div style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>• Consider total compensation</div>
                    <div style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>• Be prepared to walk away</div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={resetNegotiation}
                variant="outline"
                className="w-full border-2 border-green-400/50 bg-transparent text-white font-bold hover:bg-green-500/20"
              >
                Start New Negotiation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
