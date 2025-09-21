"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function InterviewDJFinal() {
  const [interviewMode, setInterviewMode] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [aiInterviewerActive, setAiInterviewerActive] = useState(false)
  const [currentInterviewQuestion, setCurrentInterviewQuestion] = useState("")
  const [userResponse, setUserResponse] = useState("")
  const [interviewStage, setInterviewStage] = useState("welcome")
  const [aiFeedback, setAiFeedback] = useState("")
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

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

  if (interviewMode) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              🤖 AI Interview Simulator
            </h2>
            <div className="flex gap-4">
              <Badge className="bg-gray-800 text-yellow-400 border-2 border-gray-600 font-bold">
                Question {currentQuestion + 1} of {aiInterviewQuestions.length}
              </Badge>
            </div>
          </div>
          <Progress value={(currentQuestion / aiInterviewQuestions.length) * 100} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-8 border-gray-600 p-6 shadow-2xl">
            <div className="text-center mb-4">
              <h3 className="text-xl text-white font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                📹 Video Interview
              </h3>
              
              <div className="relative mb-4">
                <video 
                  ref={videoRef}
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-48 bg-black rounded-lg border-2 border-gray-600 object-cover"
                />
                {!videoEnabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl mb-2">👤</div>
                      <p className="text-white text-sm">Camera Off</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg border-2 border-gray-600 mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🤖</div>
                  <div className="text-left">
                    <div className="text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      AI Interviewer
                    </div>
                    <div className="text-white text-sm">
                      {aiInterviewerActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mb-4">
                <Button
                  onClick={toggleVideo}
                  className={`${videoEnabled ? 'bg-red-500' : 'bg-gray-500'} border-4 border-gray-600 text-white font-bold`}
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  📹 {videoEnabled ? 'Stop Video' : 'Start Video'}
                </Button>
                <Button
                  onClick={toggleAudio}
                  className={`${audioEnabled ? 'bg-red-500' : 'bg-gray-500'} border-4 border-gray-600 text-white font-bold`}
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  🎤 {audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-8 border-gray-600 p-6 shadow-2xl">
            <h3 className="text-xl text-white font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              💬 Interview Conversation
            </h3>
            
            <div className="bg-black/50 p-4 rounded-lg border-2 border-gray-600 mb-4 h-64 overflow-y-auto">
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
                <label className="text-yellow-400 font-bold mb-2 block" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  Current Question:
                </label>
                <div className="bg-blue-500/10 border border-blue-500 p-3 rounded-lg">
                  <p className="text-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {currentInterviewQuestion}
                  </p>
                </div>
                {aiInterviewQuestions[currentQuestion] && (
                  <div className="mt-2">
                    <p className="text-yellow-400 text-xs font-bold mb-1" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      Tips:
                    </p>
                    <ul className="text-white text-xs space-y-1">
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
                  className="w-full p-3 bg-gray-800 border-4 border-gray-600 text-white rounded-lg resize-none"
                  rows={4}
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                />
                <div className="flex gap-4">
                  <Button
                    onClick={handleUserResponse}
                    disabled={!userResponse.trim()}
                    className="bg-green-500 border-4 border-gray-600 text-white hover:bg-green-600 font-bold flex-1"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    📤 Submit Response
                  </Button>
                  <Button
                    onClick={endAIInterview}
                    className="bg-red-500 border-4 border-gray-600 text-white hover:bg-red-600 font-bold"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    ⏹️ End Interview
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-4xl mb-4">🎉</div>
                <p className="text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  Interview Completed Successfully!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={endAIInterview}
                    className="bg-yellow-400 border-4 border-gray-600 text-black hover:bg-gray-700 font-bold"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    📊 View Results
                  </Button>
                  <Button
                    onClick={() => startAIInterview()}
                    className="bg-green-500 border-4 border-gray-600 text-white hover:bg-green-600 font-bold"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    🔄 Restart Interview
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-gray-800 border-8 border-gray-600 p-8 shadow-2xl max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🤖</div>
        <h2 className="text-3xl text-white font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
          AI Interview DJ Final
        </h2>
        <p className="text-white text-lg mb-6" style={{ fontFamily: "Comic Sans MS, cursive" }}>
          Practice your interview skills with our advanced AI interviewer
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg border-2 border-gray-600">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-white font-bold mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Smart Questions
            </h3>
            <p className="text-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Industry-specific interview questions tailored to your role
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-lg border-2 border-gray-600">
            <div className="text-3xl mb-2">🎙️</div>
            <h3 className="text-white font-bold mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Real-time Feedback
            </h3>
            <p className="text-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Get instant feedback on your responses and delivery
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-lg border-2 border-gray-600">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="text-white font-bold mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Progress Tracking
            </h3>
            <p className="text-white text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Track your improvement over multiple practice sessions
            </p>
          </div>
        </div>
        
        <Button
          onClick={startAIInterview}
          className="bg-gradient-to-r from-purple-600 to-pink-600 border-4 border-gray-600 text-white hover:from-purple-700 hover:to-pink-700 font-bold text-lg px-8 py-4"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          🚀 Start AI Interview
        </Button>
      </div>
    </Card>
  )
}
