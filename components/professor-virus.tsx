"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageCircle,
  X,
  Globe,
  Zap,
  Sparkles,
  BookOpen,
  RotateCcw,
  Brain,
} from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
]

const careerKnowledge = {
  en: {
    greeting:
      "Greetings! I am Professor Virus, your AI career physicist. I've studied the quantum mechanics of career success across 26 dimensions. What career mysteries shall we explore together?",

    tools: {
      "career chaos simulator":
        "Ah, the Career Chaos Simulator! Like quantum mechanics, careers exist in multiple states simultaneously until observed. This tool helps you collapse the wave function of possibilities into actionable insights.",
      "skills stock market":
        "The Skills Stock Market operates on supply and demand principles, much like energy conservation. Invest in skills that are scarce but increasingly valuable - think of it as career arbitrage!",
      "burnout blood test":
        "Burnout is entropy in your career system. The blood test measures your energy dissipation rate. Remember: sustainable careers require periodic energy restoration, like a rechargeable battery.",
      "ai salary negotiator":
        "Negotiation is applied psychology with mathematical precision. The AI analyzes market data, your value proposition, and optimal timing - it's like having a career particle accelerator!",
      "networking astrology":
        "While I prefer physics to astrology, this tool maps relationship dynamics using personality vectors. Think of it as social network topology optimization.",
      "ar interview dojo":
        "Practice makes permanent, not perfect. The AR Dojo uses spaced repetition and biofeedback - principles I used when developing relativity theory through thought experiments.",
      "celebrity ai mentor":
        "The Celebrity AI Mentor system uses personality modeling and success pattern analysis. It's like having access to the collective wisdom of history's greatest minds!",
      "dark web skill scout":
        "The Dark Web Skill Scout identifies emerging skills before they become mainstream. Think of it as career trend prediction using advanced pattern recognition.",
    },

    advice: {
      "career change":
        "Career transitions are like phase changes in physics - they require activation energy but can lead to entirely new states of being. Calculate your transition energy carefully.",
      "skill development":
        "Skills compound like interest, but with exponential rather than linear growth. Focus on foundational principles - they're like the fundamental constants of career physics.",
      "work life balance":
        "Balance is dynamic equilibrium, not static state. Like a spinning top, career stability comes from motion, not stillness. Find your optimal frequency.",
      leadership:
        "Leadership is about creating fields of influence, like electromagnetic fields. Your actions create ripples that affect the entire system around you.",
      innovation:
        "Innovation happens at the intersection of prepared minds and unexpected observations. Cultivate curiosity - it's the fundamental force of discovery.",
      networking:
        "Professional networks follow power law distributions. Focus on quality connections that create exponential value, not linear accumulation of contacts.",
      "job search":
        "Job searching is like particle physics - you need to increase your collision rate with opportunities while maintaining high energy levels. Optimize both quantity and quality of interactions.",
      "salary negotiation":
        "Salary negotiation follows game theory principles. Information asymmetry is your biggest challenge - gather market data like you're conducting scientific research.",
      "interview preparation":
        "Interviews are experiments in human chemistry. Prepare your hypotheses (answers), but be ready to adapt based on the reaction you observe from your interviewer.",
      "personal branding":
        "Your personal brand is like your professional wave function - it exists in multiple states until someone observes it. Make sure the collapse is favorable!",
    },

    trends: {
      "ai impact":
        "AI will augment human intelligence like telescopes augmented human vision. The key is learning to collaborate with AI, not compete against it.",
      "remote work":
        "Remote work is changing the topology of professional space-time. Distance becomes irrelevant when information travels at light speed.",
      "future skills":
        "The half-life of technical skills is decreasing, but meta-skills like learning, adaptation, and systems thinking have longer half-lives. Invest accordingly.",
      automation:
        "Automation follows the path of least resistance, like electricity. Jobs requiring creativity, empathy, and complex problem-solving remain human domains.",
      "gig economy":
        "The gig economy is career quantum mechanics - multiple simultaneous states of employment. Master the art of portfolio careers.",
      blockchain:
        "Blockchain technology is creating new trust mechanisms in professional relationships. It's like having a universal ledger of professional reputation.",
      metaverse:
        "The metaverse will create new dimensions of professional interaction. Prepare for careers that exist partially in virtual space-time.",
    },
  },
}

interface Message {
  type: "user" | "ai"
  content: string
  timestamp: Date
}

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function ProfessorVirus() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<string[]>([])
  const [showRecap, setShowRecap] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(false)
  const [textInput, setTextInput] = useState("") // Added text input state

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null) // Added text input ref

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = "en-US"

        recognitionInstance.onstart = () => {
          setIsListening(true)
        }

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          console.log("Speech recognized:", transcript)
          handleSendMessage(transcript)
        }

        recognitionInstance.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
          if (event.error === "not-allowed") {
            alert("Microphone access denied. Please allow microphone access and try again.")
          } else if (event.error === "no-speech") {
            alert("No speech detected. Please try speaking again.")
          } else {
            alert(`Speech recognition error: ${event.error}`)
          }
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
        setIsRecognitionSupported(true)
      } else {
        setIsRecognitionSupported(false)
        console.log("Speech recognition not supported in this browser")
      }
    }
  }, [])

  const handleToggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        const greeting = careerKnowledge.en.greeting
        setMessages([{ type: "ai", content: greeting, timestamp: new Date() }])
        if (isSpeaking) {
          speakText(greeting)
        }
      }, 500)
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window && isSpeaking) {
      window.speechSynthesis.cancel() // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.1
      utterance.volume = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleSendMessage = (message: string) => {
    const userMessage: Message = { type: "user", content: message, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setConversationHistory((prev) => [...prev, message])
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      let response = "Fascinating question! Let me apply some career physics to this..."

      const lowerMessage = message.toLowerCase()
      const knowledge = careerKnowledge.en

      // Check for specific tools
      for (const [tool, explanation] of Object.entries(knowledge.tools)) {
        if (
          lowerMessage.includes(tool.replace(/\s+/g, " ")) ||
          lowerMessage.includes(tool.split(" ")[0]) ||
          (tool === "ai salary negotiator" && lowerMessage.includes("salary")) ||
          (tool === "burnout blood test" && lowerMessage.includes("burnout")) ||
          (tool === "skills stock market" && lowerMessage.includes("skills")) ||
          (tool === "networking astrology" && lowerMessage.includes("networking")) ||
          (tool === "ar interview dojo" && lowerMessage.includes("interview")) ||
          (tool === "celebrity ai mentor" && lowerMessage.includes("mentor")) ||
          (tool === "dark web skill scout" && lowerMessage.includes("scout"))
        ) {
          response = explanation
          break
        }
      }

      // Check for advice topics with more keywords
      if (response.includes("Fascinating question")) {
        for (const [topic, advice] of Object.entries(knowledge.advice)) {
          const topicKeywords = {
            "career change": ["transition", "switch", "change", "pivot", "move"],
            "skill development": ["learn", "skill", "develop", "improve", "training", "education"],
            "work life balance": ["balance", "stress", "burnout", "wellness", "health"],
            leadership: ["lead", "manage", "boss", "team", "leadership", "management"],
            innovation: ["creative", "innovate", "ideas", "invention", "breakthrough"],
            networking: ["network", "connect", "relationship", "contacts", "professional"],
            "job search": ["job", "search", "hunting", "apply", "application", "employment"],
            "salary negotiation": ["salary", "negotiate", "pay", "compensation", "raise", "money"],
            "interview preparation": ["interview", "prepare", "questions", "answers", "practice"],
            "personal branding": ["brand", "reputation", "image", "presence", "marketing"],
          }

          const keywords = topicKeywords[topic as keyof typeof topicKeywords] || [topic]
          if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
            response = advice
            break
          }
        }
      }

      // Check for future trends with expanded keywords
      if (response.includes("Fascinating question")) {
        for (const [trend, insight] of Object.entries(knowledge.trends)) {
          const trendKeywords = {
            "ai impact": ["ai", "artificial intelligence", "machine learning", "automation", "robot"],
            "remote work": ["remote", "wfh", "work from home", "virtual", "distributed"],
            "future skills": ["future", "tomorrow", "next", "upcoming", "emerging"],
            automation: ["robot", "automated", "machine", "technology", "digital"],
            "gig economy": ["freelance", "gig", "contractor", "independent", "flexible"],
            blockchain: ["blockchain", "crypto", "bitcoin", "decentralized", "web3"],
            metaverse: ["metaverse", "virtual reality", "vr", "ar", "augmented"],
          }

          const keywords = trendKeywords[trend as keyof typeof trendKeywords] || [trend]
          if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
            response = insight
            break
          }
        }
      }

      // Enhanced fallback responses with more variety
      if (response.includes("Fascinating question")) {
        const fallbacks = [
          "In my experience studying career dynamics, the key is to think in systems. Every career decision creates ripple effects across multiple dimensions of your professional life.",
          "Like the theory of relativity, career success is relative to your frame of reference. Define your own success metrics before optimizing for them.",
          "Career development follows the compound interest principle - small, consistent improvements yield exponential results over time.",
          "Remember, careers are not linear paths but complex adaptive systems. Embrace the uncertainty and focus on building antifragility.",
          "The most successful professionals I've observed treat their careers like scientific experiments - hypothesis, test, measure, iterate.",
          "Think of your career as a portfolio of experiments. Some will succeed, others will fail, but each provides valuable data for future decisions.",
          "Career momentum is like physical momentum - it takes energy to change direction, but once you're moving, maintaining speed becomes easier.",
          "Professional growth follows the laws of thermodynamics - you cannot create energy from nothing, but you can transform it efficiently.",
          "Your career trajectory is influenced by both internal forces (your choices) and external forces (market conditions). Master both for optimal results.",
          "Like quantum entanglement, your professional relationships can have instantaneous effects across vast distances. Invest in quality connections.",
        ]
        response = fallbacks[Math.floor(Math.random() * fallbacks.length)]
      }

      const aiMessage: Message = { type: "ai", content: response, timestamp: new Date() }
      setMessages((prev) => [...prev, aiMessage])

      if (isSpeaking) {
        speakText(response)
      }
    }, 1500)
  }

  const handleVoiceToggle = () => {
    if (!isRecognitionSupported) {
      alert(
        "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for voice functionality.",
      )
      return
    }

    if (!recognition) {
      alert("Speech recognition is not available. Please refresh the page and try again.")
      return
    }

    if (isListening) {
      recognition.stop()
    } else {
      try {
        recognition.start()
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        alert("Could not start speech recognition. Please check your microphone permissions.")
      }
    }
  }

  const generateRecap = () => {
    if (conversationHistory.length === 0) {
      return "No questions asked yet. Start a conversation to generate a recap!"
    }

    const topics = conversationHistory.join(", ")
    const recap = `📚 Conversation Recap:

Topics Discussed: ${conversationHistory.length} questions
Key Areas: ${topics.length > 100 ? topics.substring(0, 100) + "..." : topics}

🧠 Professor's Summary:
Our discussion covered ${conversationHistory.length} career dimensions. Like any good scientific inquiry, each question builds upon the previous ones. I recommend reviewing the specific advice given and implementing one insight at a time.

💡 Next Steps:
1. Choose one key insight to implement this week
2. Experiment with the suggested career tools
3. Return with specific results for deeper analysis

Remember: Career development is an iterative process, much like scientific discovery!`

    return recap
  }

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    setShowLanguages(false)
    // Update recognition language
    if (recognition) {
      recognition.lang = langCode === "en" ? "en-US" : `${langCode}-${langCode.toUpperCase()}`
    }
    // Update greeting in new language (for now, keeping English)
    if (messages.length > 0) {
      setMessages([{ type: "ai", content: careerKnowledge.en.greeting, timestamp: new Date() }])
    }
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (textInput.trim()) {
      handleSendMessage(textInput.trim())
      setTextInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleTextSubmit(e)
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleToggleChat}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white hover:from-purple-600 hover:to-blue-500 shadow-2xl hover:shadow-blue-400/25 transition-all transform hover:scale-110 group"
          style={{ fontFamily: "serif" }}
        >
          <div className="relative">
            <img
              src="/professor-einstein-logo.jpg"
              alt="Professor Virus"
              className="w-16 h-16 rounded-full object-cover group-hover:rotate-12 transition-transform border-2 border-white"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white" />
          </div>
        </Button>

        {/* Floating name badge */}
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          <div className="font-bold">Professor Virus</div>
          <div className="text-xs opacity-90">AI Career Physicist</div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed bottom-28 right-6 w-[420px] h-[600px] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <Card className="h-full bg-gradient-to-br from-slate-900 to-blue-900 border-2 border-blue-400 shadow-2xl rounded-xl">
            <div className="flex items-center justify-between p-4 border-b-2 border-blue-400 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                    <img
                      src="/professor-einstein-logo.jpg"
                      alt="Professor Virus"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Professor Virus</h3>
                  <p className="text-xs text-blue-100">AI Career Physicist • 26 Tools Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRecap(!showRecap)}
                  className="text-white hover:text-blue-200 hover:bg-blue-500/20"
                  title="Show Conversation Recap"
                >
                  <BookOpen className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLanguages(!showLanguages)}
                  className="text-white hover:text-blue-200 hover:bg-blue-500/20"
                >
                  <Globe className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-200 hover:bg-blue-500/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Language Selector */}
            {showLanguages && (
              <div className="p-3 border-b-2 border-blue-400 bg-slate-800">
                <div className="grid grid-cols-4 gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`text-xs border-2 ${
                        currentLanguage === lang.code
                          ? "bg-blue-500 text-white border-blue-300"
                          : "bg-slate-700 text-blue-200 border-slate-600 hover:bg-blue-600"
                      }`}
                    >
                      <span className="mr-1">{lang.flag}</span>
                      {lang.code.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {showRecap && (
              <div className="p-4 border-b-2 border-blue-400 bg-slate-800 max-h-48 overflow-y-auto">
                <pre className="text-sm text-blue-100 whitespace-pre-wrap font-mono">{generateRecap()}</pre>
              </div>
            )}

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-800 to-slate-900">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-lg border-2 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-400"
                        : "bg-gradient-to-r from-slate-700 to-slate-600 text-blue-100 border-slate-500"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-blue-100 border-2 border-slate-500 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            <div className="p-4 border-t-2 border-blue-400 bg-slate-800">
              <form onSubmit={handleTextSubmit} className="mb-3">
                <div className="flex gap-2">
                  <input
                    ref={textInputRef}
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your career question here..."
                    className="flex-1 px-3 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-blue-100 placeholder-blue-300 focus:border-blue-400 focus:outline-none text-sm"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!textInput.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600 px-4"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </form>

              <div className="flex items-center gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVoiceToggle}
                  className={`border-2 ${
                    isListening
                      ? "bg-red-500 text-white border-red-400 animate-pulse"
                      : isRecognitionSupported
                        ? "bg-slate-700 text-blue-200 border-slate-600 hover:bg-blue-600"
                        : "bg-gray-500 text-gray-300 border-gray-400 cursor-not-allowed"
                  }`}
                  title={
                    !isRecognitionSupported
                      ? "Speech recognition not supported in this browser"
                      : isListening
                        ? "Listening... (Click to stop)"
                        : "Start voice recording"
                  }
                  disabled={!isRecognitionSupported}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className="border-2 bg-slate-700 text-blue-200 border-slate-600 hover:bg-blue-600"
                  title="Toggle text-to-speech"
                >
                  {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setMessages([])
                    setConversationHistory([])
                    setTextInput("") // Added text input state
                    if ("speechSynthesis" in window) {
                      window.speechSynthesis.cancel()
                    }
                    setTimeout(() => {
                      const greeting = careerKnowledge.en.greeting
                      setMessages([{ type: "ai", content: greeting, timestamp: new Date() }])
                      if (isSpeaking) {
                        speakText(greeting)
                      }
                    }, 500)
                  }}
                  className="bg-slate-700 text-blue-200 hover:bg-blue-600 border-2 border-slate-600"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick question buttons */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <Button
                  size="sm"
                  onClick={() => handleSendMessage("What career tools do you recommend?")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600 text-xs"
                >
                  <Brain className="w-3 h-3 mr-1" />
                  Career Tools
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSendMessage("How do I handle career transitions?")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600 text-xs"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Transitions
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSendMessage("What skills should I develop for the future?")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600 text-xs"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Future Skills
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSendMessage("How can AI impact my career?")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600 text-xs"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  AI Impact
                </Button>
              </div>

              <div className="flex gap-1">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                  <Brain className="w-3 h-3 mr-1" />
                  Enhanced AI
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Multi-Question
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Type & Voice
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
