"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InterviewDJComplete() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [examStarted, setExamStarted] = useState(false)
  const [examCompleted, setExamCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [speechRecording, setSpeechRecording] = useState(false)
  const [englishTestLevel, setEnglishTestLevel] = useState("intermediate")
  
  // AI Interview specific states
  const [videoEnabled, setVideoEnabled] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [interviewMode, setInterviewMode] = useState(false)
  const [aiInterviewerActive, setAiInterviewerActive] = useState(false)
  const [currentInterviewQuestion, setCurrentInterviewQuestion] = useState("")
  const [userResponse, setUserResponse] = useState("")
  const [interviewStage, setInterviewStage] = useState("welcome")
  const [aiFeedback, setAiFeedback] = useState("")
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([])
  
  // Media refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Exam categories with AI Interview
  const examCategories = [
    {
      id: "ai-interview",
      name: "AI Interview Simulator",
      icon: "🤖",
      description: "Real-time AI interviewer with video, audio, and personalized feedback",
      duration: 1800,
      questions: 8,
      sections: ["Introduction", "Technical Questions", "Behavioral Questions", "Closing"],
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    }
  ]

  // AI Interview questions
  const aiInterviewQuestions = [
    {
      question: "Tell me about yourself and why you're interested in this position.",
      tips: ["Be concise but thorough", "Highlight relevant experience", "Show enthusiasm", "Connect your skills to the role"]
    },
    {
      question: "Describe a challenging project you worked on and your approach to solving it.",
      tips: ["Use STAR method", "Focus on your specific contribution", "Mention collaboration if applicable", "Highlight outcomes"]
    },
    {
      question: "How do you handle tight deadlines and pressure at work?",
      tips: ["Show your problem-solving skills", "Discuss prioritization", "Mention communication strategies", "Be honest about your approach"]
    },
    {
      question: "What are your greatest strengths and weaknesses?",
      tips: ["Be honest about strengths", "Frame weaknesses positively", "Show self-awareness", "Discuss improvement efforts"]
    },
    {
      question: "Where do you see yourself professionally in 5 years?",
      tips: ["Show ambition and realism", "Connect to the role/company", "Demonstrate commitment", "Show you've thought about your future"]
    },
    {
      question: "How do you stay current with industry trends and technologies?",
      tips: ["Mention specific resources", "Show continuous learning", "Discuss practical application", "Demonstrate passion for your field"]
    },
    {
      question: "Tell me about a time you had to work with a difficult team member.",
      tips: ["Focus on resolution", "Show emotional intelligence", "Be professional", "Highlight communication skills"]
    },
    {
      question: "Do you have any questions for me about the role or company?",
      tips: ["Prepare thoughtful questions", "Show genuine interest", "Ask about growth opportunities", "Inquire about team dynamics"]
    }
  ]

  // AI Interviewer responses
  const aiInterviewerResponses = {
    welcome: "Hello! I'm your AI interviewer today. I'll be asking you a series of questions to assess your skills, experience, and fit for the role. Please take your time to answer thoughtfully. Are you ready to begin?",
    positive: [
      "That's a great answer! I can see you have strong experience in this area.",
      "Excellent response! You've demonstrated good critical thinking skills.",
      "Well articulated! Your experience seems very relevant.",
      "That's very insightful! I appreciate your detailed explanation."
    ],
    encouraging: [
      "You're doing well so far. Keep up the good work!",
      "Great progress! Let's continue with the next question.",
      "You're providing thoughtful responses. I appreciate that.",
      "Excellent engagement! Let's dive deeper."
    ]
  }

  // Initialize media devices
  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: videoEnabled, 
        audio: audioEnabled 
      })
      streamRef.current = stream
      
      if (videoRef.current && videoEnabled) {
        videoRef.current.srcObject = stream
      }
      
      if (audioEnabled) {
        mediaRecorderRef.current = new MediaRecorder(stream)
        mediaRecorderRef.current.ondataavailable = (event) => {
          console.log('Audio data available:', event.data)
        }
      }
    } catch (error) {
      console.error('Error accessing media devices:', error)
      alert('Unable to access camera or microphone. Please check permissions.')
    }
  }

  // Toggle video
  const toggleVideo = async () => {
    const newVideoState = !videoEnabled
    setVideoEnabled(newVideoState)
    
    if (newVideoState && streamRef.current) {
      try {
        const videoTrack = streamRef.current.getVideoTracks()[0]
        if (videoTrack) {
          videoTrack.enabled = true
        } else {
          await initializeMedia()
        }
      } catch (error) {
        console.error('Error enabling video:', error)
      }
    } else if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = false
      }
    }
  }

  // Toggle audio
  const toggleAudio = async () => {
    const newAudioState = !audioEnabled
    setAudioEnabled(newAudioState)
    
    if (newAudioState && streamRef.current) {
      try {
        const audioTrack = streamRef.current.getAudioTracks()[0]
        if (audioTrack) {
          audioTrack.enabled = true
        } else {
          await initializeMedia()
        }
      } catch (error) {
        console.error('Error enabling audio:', error)
      }
    } else if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = false
      }
    }
  }

  // Start AI Interview
  const startAIInterview = async () => {
    setInterviewMode(true)
    setAiInterviewerActive(true)
    setInterviewStage("welcome")
    setCurrentInterviewQuestion(aiInterviewerResponses.welcome)
    setConversationHistory([{role: "ai", content: aiInterviewerResponses.welcome}])
    
    if (!streamRef.current) {
      await initializeMedia()
    }
  }

  // Handle user response
  const handleUserResponse = () => {
    if (!userResponse.trim()) return
    
    const newHistory = [...conversationHistory, {role: "user", content: userResponse}]
    setConversationHistory(newHistory)
    
    const randomPositive = aiInterviewerResponses.positive[Math.floor(Math.random() * aiInterviewerResponses.positive.length)]
    const randomEncouraging = aiInterviewerResponses.encouraging[Math.floor(Math.random() * aiInterviewerResponses.encouraging.length)]
    
    const aiResponse = Math.random() > 0.5 ? randomPositive : randomEncouraging
    setAiFeedback(aiResponse)
    
    setTimeout(() => {
      setConversationHistory(prev => [...prev, {role: "ai", content: aiResponse}])
      
      if (currentQuestion < aiInterviewQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setCurrentInterviewQuestion(aiInterviewQuestions[currentQuestion + 1].question)
        setAiFeedback("")
      } else {
        setInterviewStage("complete")
        setCurrentInterviewQuestion("Thank you for completing the interview! Here's your feedback:")
        setAiFeedback("Great job! You've completed all the interview questions. Your responses show good communication skills and professional demeanor.")
      }
      
      setUserResponse("")
    }, 2000)
  }

  // End AI interview
  const endAIInterview = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setInterviewMode(false)
    setAiInterviewerActive(false)
    setVideoEnabled(false)
    setAudioEnabled(false)
    setInterviewStage("welcome")
    setConversationHistory([])
    setUserResponse("")
    setAiFeedback("")
    setCurrentQuestion(0)
  }

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (examStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endAIInterview()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [examStarted, timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // AI Interview Interface
  const renderAIInterview = () => {
    if (!interviewMode) return null

    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-force-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              🤖 AI Interview Simulator
            </h2>
            <div className="flex gap-4">
              <Badge className="bg-dark-card text-force-yellow border-2 border-visible font-bold">
                Question {currentQuestion + 1} of {aiInterviewQuestions.length}
              </Badge>
              <Badge className="bg-red-500 text-white border-2 border-visible font-bold">
                Time: {formatTime(timeRemaining)}
              </Badge>
            </div>
          </div>
          <Progress value={(currentQuestion / aiInterviewQuestions.length) * 100} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Video Section */}
          <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
            <div className="text-center mb-4">
              <h3 className="text-xl text-force-white font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                📹 Video Interview
              </h3>
              
              <div className="relative mb-4">
                <video 
                  ref={videoRef}
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-48 bg-black rounded-lg border-2 border-visible object-cover"
                />
                {!videoEnabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl mb-2">👤</div>
                      <p className="text-force-white text-sm">Camera Off</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg border-2 border-visible mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🤖</div>
                  <div className="text-left">
                    <div className="text-force-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      AI Interviewer
                    </div>
                    <div className="text-force-white text-sm">
                      {aiInterviewerActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mb-4">
                <Button
                  onClick={toggleVideo}
                  className={`${videoEnabled ? 'bg-red-500' : 'bg-gray-500'} border-4 border-visible text-white font-bold`}
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  📹 {videoEnabled ? 'Stop Video' : 'Start Video'}
                </Button>
                <Button
                  onClick={toggleAudio}
                  className={`${audioEnabled ? 'bg-red-500' : 'bg-gray-500'} border-4 border-visible text-white font-bold`}
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  🎤 {audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Conversation Section */}
          <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
            <h3 className="text-xl text-force-white font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              💬 Interview Conversation
            </h3>
            
            <div className="bg-black/50 p-4 rounded-lg border-2 border-visible mb-4 h-64 overflow-y-auto">
              {conversationHistory.map((msg, index) => (
                <div key={index} className={`mb-3 ${msg.role === 'ai' ? 'text-left' : 'text-right'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-xs ${
                    msg.role === 'ai' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-yellow-400 text-black'
                  }`}>
                    <div className="font-bold mb-1" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      {msg.role === 'ai' ? 'AI Interviewer:' : 'You:'}
                    </div>
                    <div className="text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {aiFeedback && (
                <div className="text-center mb-3">
                  <div className="inline-block bg-green-500/20 border border-green-500 p-2 rounded-lg">
                    <div className="text-green-400 text-sm font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      💭 {aiFeedback}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {interviewStage !== "complete" && (
              <div className="mb-4">
                <label className="text-force-yellow font-bold mb-2 block" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  Current Question:
                </label>
                <div className="bg-blue-500/10 border border-blue-500 p-3 rounded-lg">
                  <p className="text-force-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {currentInterviewQuestion}
                  </p>
                </div>
                {aiInterviewQuestions[currentQuestion] && (
                  <div className="mt-2">
                    <p className="text-force-yellow text-xs font-bold mb-1" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      Tips:
                    </p>
                    <ul className="text-force-white text-xs space-y-1">
                      {aiInterviewQuestions[currentQuestion].tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {interviewStage !== "complete" ? (
              <div className="space-y-4">
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full p-3 bg-dark-card border-4 border-visible text-force-white rounded-lg resize-none"
                  rows={4}
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                />
                <div className="flex gap-4">
                  <Button
                    onClick={handleUserResponse}
                    disabled={!userResponse.trim()}
                    className="bg-green-500 border-4 border-visible text-white hover:bg-green-600 font-bold flex-1"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    📤 Submit Response
                  </Button>
                  <Button
                    onClick={endAIInterview}
                    className="bg-red-500 border-4 border-visible text-white hover:bg-red-600 font-bold"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    🚪 End Interview
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg border-4 border-visible mb-4">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-2xl text-force-black font-bold mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    Interview Complete!
                  </h3>
                  <p className="text-force-black" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {aiFeedback}
                  </p>
                </div>
                <Button
                  onClick={endAIInterview}
                  className="bg-dark-card border-4 border-visible text-force-yellow hover:bg-yellow-400 hover:text-force-black font-bold"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  🏠 Return to Dashboard
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }

  // Main component return
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🎤 Interview DJ Complete</h1>
        <p className="text-xl text-gray-300">Complete AI-powered interview simulation platform</p>
      </div>

      {interviewMode ? (
        renderAIInterview()
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examCategories.map((category) => (
            <Card key={category.id} className="bg-gray-800 border-2 border-purple-500 p-6 hover:border-purple-400 transition-colors">
              <div className="text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-300 mb-4">{category.description}</p>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>⏱️ {Math.floor(category.duration / 60)} min</span>
                  <span>📝 {category.questions} questions</span>
                </div>
                <Button 
                  onClick={() => {
                    setSelectedExam(category.id)
                    setExamStarted(true)
                    setTimeRemaining(category.duration)
                    startAIInterview()
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Start {category.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
