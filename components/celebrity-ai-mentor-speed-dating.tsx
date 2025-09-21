"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Clock, Send, RotateCcw, Star } from "lucide-react"

interface Mentor {
  id: string
  name: string
  title: string
  avatar: string
  personality: string
  expertise: string[]
  responses: { [key: string]: string[] }
}

interface Message {
  id: string
  sender: "user" | "mentor"
  content: string
  timestamp: Date
}

const mentors: Mentor[] = [
  {
    id: "musk",
    name: "Elon Musk",
    title: "Tech Visionary & Entrepreneur",
    avatar: "/elon-musk-portrait.png",
    personality: "Direct, ambitious, future-focused",
    expertise: ["Innovation", "Engineering", "Space Tech", "AI"],
    responses: {
      greeting: [
        "Let's make your career interplanetary. What's your mission?",
        "Time is finite. What problem are you solving with your career?",
        "First principles thinking - what do you actually want to achieve?",
      ],
      career: [
        "Don't follow trends, create them. What industry needs disruption?",
        "Work 80 hours a week on something you love, or 40 hours on something you hate.",
        "The best time to plant a tree was 20 years ago. Second best time is now.",
      ],
      skills: [
        "Learn physics and engineering fundamentals. Everything else is just details.",
        "Read voraciously. I learned rocket science from books.",
        "Seek negative feedback constantly. It's the only way to improve rapidly.",
      ],
    },
  },
  {
    id: "oprah",
    name: "Oprah Winfrey",
    title: "Media Mogul & Life Coach",
    avatar: "/oprah-winfrey-portrait.png",
    personality: "Empathetic, inspiring, wisdom-focused",
    expertise: ["Leadership", "Communication", "Personal Growth", "Media"],
    responses: {
      greeting: [
        "What I know for sure is that your calling is calling you. Are you listening?",
        "Every great career starts with knowing your 'why'. What's yours?",
        "You have the power to create the career of your dreams. Let's talk about it.",
      ],
      career: [
        "Follow your passion, but make sure it serves others too.",
        "Your career should be an expression of your highest self.",
        "When you align your work with your values, magic happens.",
      ],
      skills: [
        "The greatest skill is emotional intelligence. Master that first.",
        "Listen more than you speak. That's where wisdom lives.",
        "Authenticity is your superpower. Don't try to be someone else.",
      ],
    },
  },
  {
    id: "jobs",
    name: "Steve Jobs",
    title: "Design Perfectionist & Innovator",
    avatar: "/steve-jobs-portrait.png",
    personality: "Perfectionist, design-obsessed, intuitive",
    expertise: ["Design", "Product", "Innovation", "Leadership"],
    responses: {
      greeting: [
        "Stay hungry, stay foolish. What's your next insanely great thing?",
        "Design is not just what it looks like - it's how it works. How does your career work?",
        "You can't connect the dots looking forward. Trust your journey.",
      ],
      career: [
        "Do what you love. If you haven't found it yet, keep looking.",
        "Innovation distinguishes between a leader and a follower.",
        "Focus means saying no to 100 good ideas to say yes to the great one.",
      ],
      skills: [
        "Simplicity is the ultimate sophistication. Master the fundamentals.",
        "Details are not details. They make the design.",
        "Think different. The people who think they can change the world usually do.",
      ],
    },
  },
  {
    id: "bezos",
    name: "Jeff Bezos",
    title: "Customer-Obsessed Builder",
    avatar: "/jeff-bezos-portrait.png",
    personality: "Long-term focused, customer-obsessed, analytical",
    expertise: ["Strategy", "Scale", "Customer Focus", "Innovation"],
    responses: {
      greeting: [
        "What would you do if you knew you couldn't fail? Start there.",
        "Day 1 mentality - every day is the beginning of your career journey.",
        "Be stubborn on vision, flexible on details. What's your vision?",
      ],
      career: [
        "Regret minimization framework - what will you regret not trying?",
        "Your brand is what people say about you when you're not in the room.",
        "Invent and wander. The best careers are built on curiosity.",
      ],
      skills: [
        "Be right a lot. Seek disconfirming evidence for your beliefs.",
        "Hire and develop the best. Surround yourself with people better than you.",
        "Customer obsession beats competitor obsession every time.",
      ],
    },
  },
]

export function CelebrityAIMentorSpeedDating() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor>(mentors[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes
  const [isActive, setIsActive] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft <= 1) {
            setIsActive(false)
            setSessionComplete(true)
            return 0
          }
          return timeLeft - 1
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const startSession = () => {
    setIsActive(true)
    setSessionComplete(false)
    setTimeLeft(120)
    setMessages([])

    // Add greeting message
    const greetings = selectedMentor.responses.greeting
    const greeting = greetings[Math.floor(Math.random() * greetings.length)]

    setTimeout(() => {
      setMessages([
        {
          id: "1",
          sender: "mentor",
          content: greeting,
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  const sendMessage = () => {
    if (!inputMessage.trim() || !isActive) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Generate mentor response
    setTimeout(() => {
      const category = inputMessage.toLowerCase().includes("skill") ? "skills" : "career"
      const responses = selectedMentor.responses[category] || selectedMentor.responses.career
      const response = responses[Math.floor(Math.random() * responses.length)]

      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "mentor",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, mentorMessage])
    }, 1500)
  }

  const switchMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor)
    setIsActive(false)
    setSessionComplete(false)
    setTimeLeft(120)
    setMessages([])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gradient">Celebrity AI Mentor Speed Dating</h2>
        <p className="text-purple-200 max-w-2xl mx-auto">
          Get 2-minute career advice sessions with AI clones of legendary mentors. Each conversation is tailored to
          their unique wisdom and communication style.
        </p>
      </div>

      {/* Mentor Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mentors.map((mentor) => (
          <Card
            key={mentor.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedMentor.id === mentor.id
                ? "bg-gradient-to-br from-purple-500/40 to-blue-500/40 border-purple-300"
                : "bg-slate-700/60 border-slate-600 hover:border-purple-400/60"
            }`}
            onClick={() => switchMentor(mentor)}
          >
            <CardContent className="p-4 text-center">
              <img
                src={mentor.avatar || "/placeholder.svg"}
                alt={mentor.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-purple-400"
              />
              <h3 className="font-semibold text-white mb-1">{mentor.name}</h3>
              <p className="text-sm text-purple-200 mb-2">{mentor.title}</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {mentor.expertise.slice(0, 2).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mentor Info */}
        <Card className="bg-slate-700/60 border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <img
                src={selectedMentor.avatar || "/placeholder.svg"}
                alt={selectedMentor.name}
                className="w-12 h-12 rounded-full border-2 border-purple-400"
              />
              <div>
                <h3 className="text-white">{selectedMentor.name}</h3>
                <p className="text-sm text-purple-200">{selectedMentor.title}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Personality</h4>
              <p className="text-sm text-purple-200">{selectedMentor.personality}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-1">
                {selectedMentor.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center p-4 bg-slate-600/70 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className="text-2xl font-mono text-white">{formatTime(timeLeft)}</span>
              </div>
              {!isActive && !sessionComplete && (
                <Button onClick={startSession} className="w-full bg-purple-600 hover:bg-purple-700">
                  Start 2-Minute Session
                </Button>
              )}
              {sessionComplete && (
                <div className="space-y-2">
                  <p className="text-purple-200 text-sm">Session Complete!</p>
                  <Button onClick={startSession} className="w-full bg-purple-600 hover:bg-purple-700">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    New Session
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-700/60 border-slate-600 h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Speed Dating Session
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4 pt-0">
              <ScrollArea className="flex-1 mb-4 p-4 bg-slate-600/50 rounded-lg">
                <div className="h-full">
                  {messages.length === 0 && !isActive && (
                    <div className="text-center text-purple-300 py-8">
                      <p>Click "Start 2-Minute Session" to begin your speed dating session!</p>
                    </div>
                  )}
                  <div className="space-y-4 pb-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg break-words ${
                            message.sender === "user" 
                              ? "bg-purple-600 text-white" 
                              : "bg-slate-600 text-purple-100"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={isActive ? "Ask your mentor anything..." : "Start a session to chat"}
                  disabled={!isActive}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="bg-slate-600/70 border-slate-500 text-white placeholder-slate-300"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!isActive || !inputMessage.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
