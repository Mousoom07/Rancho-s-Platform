"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  BookOpen, 
  Music, 
  Heart,
  Brain,
  MessageCircle,
  Pause,
  Play,
  Volume2,
  VolumeX
} from "lucide-react"

interface Suggestion {
  id: string
  type: 'book' | 'meditation' | 'activity' | 'resource'
  title: string
  description: string
  duration?: string
  link?: string
}

interface ConversationMessage {
  id: string
  speaker: 'user' | 'mili'
  message: string
  timestamp: Date
  type?: 'text' | 'suggestion'
  suggestion?: Suggestion
}

export function MiliMeterVideoCompanion() {
  const [isVideoActive, setIsVideoActive] = useState(false)
  const [isAudioActive, setIsAudioActive] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [currentMood, setCurrentMood] = useState<'happy' | 'sad' | 'anxious' | 'stressed' | 'neutral'>('neutral')
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [userMessage, setUserMessage] = useState("")
  const [isMiliSpeaking, setIsMiliSpeaking] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [sessionDuration, setSessionDuration] = useState(0)
  const [activeTab, setActiveTab] = useState("call")
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample suggestions that Mili can provide
  const suggestions: Suggestion[] = [
    {
      id: "1",
      type: "book",
      title: "The Alchemist",
      description: "A philosophical book about following your dreams and finding your purpose in life.",
      duration: "4-6 hours",
      link: "#"
    },
    {
      id: "2",
      type: "meditation",
      title: "Breathing Exercise",
      description: "5-minute guided breathing exercise to reduce anxiety and stress.",
      duration: "5 minutes",
      link: "#"
    },
    {
      id: "3",
      type: "activity",
      title: "Gratitude Journaling",
      description: "Write down three things you're grateful for today to improve your mood.",
      duration: "10 minutes",
      link: "#"
    },
    {
      id: "4",
      type: "resource",
      title: "Student Support Groups",
      description: "Connect with other students who understand what you're going through.",
      duration: "Ongoing",
      link: "#"
    }
  ]

  // Mili's empathetic responses based on mood
  const miliResponses = {
    happy: [
      "That's wonderful to hear! Your positive energy is contagious. What's been bringing you joy lately?",
      "I love seeing you happy! Tell me more about what's making you feel good right now.",
      "Your happiness is beautiful! Let's celebrate this moment together."
    ],
    sad: [
      "I'm here for you. It's okay to feel sad sometimes. Would you like to talk about what's bothering you?",
      "Your feelings are valid. I'm listening with an open heart. Take your time.",
      "I understand this is difficult. Remember, it's okay not to be okay. I'm here to support you."
    ],
    anxious: [
      "Let's take a deep breath together. I can feel your anxiety, and I'm here to help you through it.",
      "Anxiety can be overwhelming, but you're not alone. Let's work through this together.",
      "I sense your worry. Let's focus on the present moment and take things one step at a time."
    ],
    stressed: [
      "Stress can be so heavy to carry. Let's find some ways to lighten that load together.",
      "I can see you're under pressure. Let's talk about what's stressing you and find some relief.",
      "Your stress is valid. Let's explore some strategies to help you feel more at ease."
    ],
    neutral: [
      "How are you feeling today? I'm here to listen and support you in any way I can.",
      "It's good to connect with you. What's on your mind right now?",
      "I'm here whenever you need someone to talk to. How can I support you today?"
    ]
  }

  // Timer for session duration
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCallActive) {
      timer = setInterval(() => {
        setSessionDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isCallActive])

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startCall = () => {
    setIsCallActive(true)
    setIsVideoActive(true)
    setIsAudioActive(true)
    
    // Add Mili's greeting
    const greeting: ConversationMessage = {
      id: Date.now().toString(),
      speaker: 'mili',
      message: "Hi there! I'm Mili Meter, your AI companion. I'm so glad you reached out. How are you feeling today?",
      timestamp: new Date()
    }
    setConversation([greeting])
  }

  const endCall = () => {
    setIsCallActive(false)
    setIsVideoActive(false)
    setIsAudioActive(false)
    setSessionDuration(0)
    setConversation([])
    setIsMiliSpeaking(false)
  }

  const toggleVideo = () => {
    setIsVideoActive(!isVideoActive)
  }

  const toggleAudio = () => {
    setIsAudioActive(!isAudioActive)
  }

  const detectMood = (message: string): 'happy' | 'sad' | 'anxious' | 'stressed' | 'neutral' => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('joy') || lowerMessage.includes('excited') || lowerMessage.includes('great')) {
      return 'happy'
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down') || lowerMessage.includes('cry')) {
      return 'sad'
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('nervous') || lowerMessage.includes('panic')) {
      return 'anxious'
    } else if (lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure') || lowerMessage.includes('busy')) {
      return 'stressed'
    }
    return 'neutral'
  }

  const generateMiliResponse = (userMessage: string): { response: string; suggestion?: Suggestion } => {
    const detectedMood = detectMood(userMessage)
    setCurrentMood(detectedMood)
    
    const responses = miliResponses[detectedMood]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    // Occasionally provide a suggestion based on the context
    let suggestion: Suggestion | undefined
    if (Math.random() > 0.7) { // 30% chance to give a suggestion
      if (detectedMood === 'stressed' || detectedMood === 'anxious') {
        suggestion = suggestions.find(s => s.type === 'meditation')
      } else if (detectedMood === 'sad') {
        suggestion = suggestions.find(s => s.type === 'activity') || suggestions.find(s => s.type === 'resource')
      } else {
        suggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
      }
    }
    
    return { response: randomResponse, suggestion }
  }

  const sendMessage = async () => {
    if (!userMessage.trim()) return
    
    const userMsg: ConversationMessage = {
      id: Date.now().toString(),
      speaker: 'user',
      message: userMessage,
      timestamp: new Date()
    }
    
    setConversation(prev => [...prev, userMsg])
    setUserMessage("")
    setIsProcessing(true)
    
    // Simulate AI processing time
    setTimeout(() => {
      const { response, suggestion } = generateMiliResponse(userMessage)
      
      const miliMsg: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        speaker: 'mili',
        message: response,
        timestamp: new Date(),
        type: suggestion ? 'suggestion' : 'text',
        suggestion: suggestion
      }
      
      setConversation(prev => [...prev, miliMsg])
      setIsProcessing(false)
      
      // Simulate Mili speaking
      setIsMiliSpeaking(true)
      setTimeout(() => setIsMiliSpeaking(false), 3000)
    }, 1500)
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'book': return <BookOpen className="w-5 h-5" />
      case 'meditation': return <Music className="w-5 h-5" />
      case 'activity': return <Heart className="w-5 h-5" />
      case 'resource': return <Brain className="w-5 h-5" />
      default: return <MessageCircle className="w-5 h-5" />
    }
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊'
      case 'sad': return '😢'
      case 'anxious': return '😰'
      case 'stressed': return '😣'
      default: return '😐'
    }
  }

  if (!isCallActive) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="text-8xl mb-6">🤖</div>
          <h1 className="text-5xl text-force-white mb-4 drop-shadow-2xl font-bold"
            style={{
              fontFamily: "Comic Sans MS, cursive",
              letterSpacing: "2px",
              textShadow: "3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 10px #fff"
            }}>
            Meet Mili Meter
          </h1>
          <p className="text-xl text-force-white font-bold mb-6" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            Your AI companion for when you're feeling lonely or need someone to talk to
          </p>
        </div>

        <Card className="bg-dark-card border-8 border-visible p-8 shadow-2xl mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">💙</div>
            <h2 className="text-2xl text-force-white mb-4 font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Never Feel Alone Again
            </h2>
            <p className="text-force-white font-bold mb-6" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Mili Meter is here to listen, support, and help you through tough times. 
              Turn on your video and share what's on your mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl mb-2">🎥</div>
              <h3 className="text-lg text-force-yellow font-bold mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                Video Call
              </h3>
              <p className="text-force-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                Face-to-face conversation with your AI companion
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-lg text-force-yellow font-bold mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                Personal Support
              </h3>
              <p className="text-force-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                Tailored suggestions for books, meditation, and activities
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="text-lg text-force-yellow font-bold mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                24/7 Available
              </h3>
              <p className="text-force-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                Always here when you need someone to talk to
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={startCall}
              className="bg-green-500 border-4 border-visible text-white hover:bg-green-600 text-xl px-12 py-6 font-bold transform hover:scale-105 transition-all duration-300"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              <Phone className="w-8 h-8 mr-3" />
              Start Call with Mili
            </Button>
          </div>
        </Card>

        <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
          <h3 className="text-xl text-force-yellow font-bold mb-4 text-center" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            How Mili Can Help You
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-start gap-3 p-3 bg-black/30 rounded-lg">
                <div className="text-blue-400">
                  {getSuggestionIcon(suggestion.type)}
                </div>
                <div>
                  <h4 className="text-force-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {suggestion.title}
                  </h4>
                  <p className="text-force-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {suggestion.description}
                  </p>
                  {suggestion.duration && (
                    <Badge className="mt-1 bg-blue-600 text-white text-xs">
                      {suggestion.duration}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Call Section */}
        <div className="lg:col-span-2">
          <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-force-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  Video Call with Mili Meter
                </h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">
                    {formatTime(sessionDuration)}
                  </Badge>
                  <Badge className="bg-blue-500 text-white">
                    {getMoodEmoji(currentMood)} {currentMood}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Video Area */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* User Video */}
              <div className="relative">
                <div className="aspect-video bg-black rounded-lg border-4 border-visible flex items-center justify-center">
                  {isVideoActive ? (
                    <div className="text-center">
                      <div className="text-4xl mb-2">👤</div>
                      <p className="text-force-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                        You
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <VideoOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                        Camera Off
                      </p>
                    </div>
                  )}
                </div>
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  You
                </Badge>
              </div>

              {/* Mili Video */}
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg border-4 border-visible flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-6xl mb-2 ${isMiliSpeaking ? 'animate-pulse' : ''}`}>🤖</div>
                    <p className="text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      Mili Meter
                    </p>
                    {isMiliSpeaking && (
                      <Badge className="mt-2 bg-green-500 text-white animate-pulse">
                        Speaking...
                      </Badge>
                    )}
                  </div>
                </div>
                <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                  Mili
                </Badge>
              </div>
            </div>

            {/* Call Controls */}
            <div className="flex justify-center gap-4 mb-6">
              <Button
                onClick={toggleVideo}
                className={`${isVideoActive ? 'bg-red-500' : 'bg-gray-600'} border-4 border-visible text-white hover:opacity-80`}
              >
                {isVideoActive ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </Button>
              <Button
                onClick={toggleAudio}
                className={`${isAudioActive ? 'bg-blue-500' : 'bg-gray-600'} border-4 border-visible text-white hover:opacity-80`}
              >
                {isAudioActive ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </Button>
              <Button
                onClick={endCall}
                className="bg-red-500 border-4 border-visible text-white hover:bg-red-600"
              >
                <PhoneOff className="w-6 h-6" />
              </Button>
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <Textarea
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message to Mili..."
                className="bg-dark-card border-4 border-visible text-force-white flex-1 resize-none"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
                rows={2}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
              <Button
                onClick={sendMessage}
                disabled={isProcessing || !userMessage.trim()}
                className="bg-blue-500 border-4 border-visible text-white hover:bg-blue-600 self-end"
              >
                {isProcessing ? "..." : "Send"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Chat and Suggestions Sidebar */}
        <div className="space-y-6">
          {/* Conversation */}
          <Card className="bg-dark-card border-8 border-visible p-4 shadow-2xl">
            <h3 className="text-lg text-force-yellow font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Conversation
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.speaker === 'user' 
                      ? 'bg-blue-500/20 border-2 border-blue-500/50 ml-4' 
                      : 'bg-purple-500/20 border-2 border-purple-500/50 mr-4'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${msg.speaker === 'user' ? 'bg-blue-500' : 'bg-purple-500'} text-white text-xs`}>
                      {msg.speaker === 'user' ? 'You' : 'Mili'}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-force-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {msg.message}
                  </p>
                  {msg.suggestion && (
                    <div className="mt-2 p-2 bg-black/30 rounded border border-visible">
                      <div className="flex items-center gap-2 mb-1">
                        {getSuggestionIcon(msg.suggestion.type)}
                        <span className="text-force-yellow font-bold text-xs" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                          {msg.suggestion.title}
                        </span>
                      </div>
                      <p className="text-force-white text-xs" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                        {msg.suggestion.description}
                      </p>
                      {msg.suggestion.duration && (
                        <Badge className="mt-1 bg-blue-600 text-white text-xs">
                          {msg.suggestion.duration}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {isProcessing && (
                <div className="p-3 rounded-lg bg-purple-500/20 border-2 border-purple-500/50 mr-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500 text-white text-xs">Mili</Badge>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </Card>

          {/* Quick Suggestions */}
          <Card className="bg-dark-card border-8 border-visible p-4 shadow-2xl">
            <h3 className="text-lg text-force-yellow font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Quick Help
            </h3>
            <div className="space-y-2">
              <Button
                onClick={() => setUserMessage("I'm feeling stressed about my studies")}
                className="w-full bg-orange-500 border-4 border-visible text-white hover:bg-orange-600 text-left"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                😰 I'm feeling stressed
              </Button>
              <Button
                onClick={() => setUserMessage("I'm feeling lonely and need someone to talk to")}
                className="w-full bg-blue-500 border-4 border-visible text-white hover:bg-blue-600 text-left"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                😢 I'm feeling lonely
              </Button>
              <Button
                onClick={() => setUserMessage("Can you suggest a meditation exercise?")}
                className="w-full bg-green-500 border-4 border-visible text-white hover:bg-green-600 text-left"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                🧘 Suggest meditation
              </Button>
              <Button
                onClick={() => setUserMessage("I need some motivation today")}
                className="w-full bg-yellow-500 border-4 border-visible text-black hover:bg-yellow-400 text-left"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                ⭐ I need motivation
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
