"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InterviewDJAIEnhanced() {
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
  const [interviewStage, setInterviewStage] = useState("welcome") // welcome, questions, feedback, complete
  const [aiFeedback, setAiFeedback] = useState("")
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([])
  
  // Media refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Comprehensive exam categories
  const examCategories = [
    {
      id: "aptitude",
      name: "Aptitude Test",
      icon: "🧠",
      description: "Logical reasoning, quantitative aptitude, and problem-solving skills",
      duration: 1800, // 30 minutes
      questions: 25,
      sections: ["Logical Reasoning", "Quantitative Aptitude", "Data Interpretation"],
      color: "bg-blue-500"
    },
    {
      id: "coding",
      name: "Coding Challenge",
      icon: "💻",
      description: "Programming skills, algorithms, and technical problem-solving",
      duration: 3600, // 60 minutes
      questions: 5,
      sections: ["Algorithms", "Data Structures", "Problem Solving", "Code Optimization"],
      color: "bg-green-500"
    },
    {
      id: "speech",
      name: "Speech Assessment",
      icon: "🎤",
      description: "Verbal communication, presentation skills, and confidence",
      duration: 900, // 15 minutes
      questions: 3,
      sections: ["Introduction", "Topic Presentation", "Q&A Response"],
      color: "bg-purple-500"
    },
    {
      id: "english",
      name: "English Proficiency",
      icon: "📝",
      description: "Grammar, vocabulary, comprehension, and business communication",
      duration: 1200, // 20 minutes
      questions: 30,
      sections: ["Grammar", "Vocabulary", "Reading Comprehension", "Business Writing"],
      color: "bg-orange-500"
    },
    {
      id: "ai-interview",
      name: "AI Interview Simulator",
      icon: "🤖",
      description: "Real-time AI interviewer with video, audio, and personalized feedback",
      duration: 1800, // 30 minutes
      questions: 8,
      sections: ["Introduction", "Technical Questions", "Behavioral Questions", "Closing"],
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    }
  ]

  // Sample questions for each category
  const questionBank = {
    aptitude: [
      {
        question: "If A = 1, B = 2, C = 3, ..., Z = 26, what is the value of 'CAB'?",
        options: ["6", "9", "12", "15"],
        correct: 0,
        explanation: "C(3) + A(1) + B(2) = 6"
      },
      {
        question: "A train travels 120 km in 2 hours. What is its speed in m/s?",
        options: ["16.67", "20", "25", "30"],
        correct: 0,
        explanation: "120 km = 120,000 m, 2 hours = 7200 seconds, Speed = 120,000/7200 = 16.67 m/s"
      },
      {
        question: "Find the missing number: 2, 6, 12, 20, ?",
        options: ["28", "30", "32", "36"],
        correct: 1,
        explanation: "Pattern: 1×2, 2×3, 3×4, 4×5, 5×6 = 30"
      }
    ],
    coding: [
      {
        question: "Write a function to find the factorial of a number using recursion.",
        type: "code",
        expectedOutput: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
        testCases: [
          { input: "5", expected: "120" },
          { input: "0", expected: "1" }
        ]
      },
      {
        question: "Implement a binary search algorithm.",
        type: "code",
        expectedOutput: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        testCases: [
          { input: "[1, 2, 3, 4, 5], 3", expected: "2" },
          { input: "[1, 2, 3, 4, 5], 6", expected: "-1" }
        ]
      }
    ],
    speech: [
      {
        question: "Introduce yourself as if you're in a job interview for your dream role.",
        type: "speech",
        duration: 120, // 2 minutes
        tips: ["Mention your background", "Highlight relevant skills", "Show enthusiasm", "Keep it concise"]
      },
      {
        question: "Explain a complex technical concept in simple terms.",
        type: "speech",
        duration: 180, // 3 minutes
        tips: ["Choose a familiar topic", "Use analogies", "Speak clearly", "Check for understanding"]
      },
      {
        question: "Describe a challenging situation you overcame and what you learned.",
        type: "speech",
        duration: 150, // 2.5 minutes
        tips: ["Use STAR method", "Be honest", "Focus on growth", "Show resilience"]
      }
    ],
    english: [
      {
        question: "Choose the correct form: 'The company _____ its profits last quarter.'",
        options: ["announced", "announce", "announces", "had announced"],
        correct: 2,
        explanation: "Subject-verb agreement: singular subject 'company' requires singular verb 'announces'"
      },
      {
        question: "What is the synonym of 'ubiquitous'?",
        options: ["Rare", "Common", "Everywhere", "Occasional"],
        correct: 2,
        explanation: "Ubiquitous means present, appearing, or found everywhere"
      },
      {
        question: "Identify the error: 'He don't like coffee in the morning.'",
        options: ["He", "don't", "like", "coffee"],
        correct: 1,
        explanation: "Should be 'doesn't' for third person singular"
      }
    ],
    "ai-interview": [
      {
        question: "Tell me about yourself and why you're interested in this position.",
        type: "ai-interview",
        followUp: "Can you elaborate on your most relevant experience?",
        tips: ["Be concise but thorough", "Highlight relevant experience", "Show enthusiasm", "Connect your skills to the role"]
      },
      {
        question: "Describe a challenging project you worked on and your approach to solving it.",
        type: "ai-interview",
        followUp: "What would you do differently if you faced the same challenge again?",
        tips: ["Use STAR method", "Focus on your specific contribution", "Mention collaboration if applicable", "Highlight outcomes"]
      },
      {
        question: "How do you handle tight deadlines and pressure at work?",
        type: "ai-interview",
        followUp: "Can you give me a specific example of when you had to do this?",
        tips: ["Show your problem-solving skills", "Discuss prioritization", "Mention communication strategies", "Be honest about your approach"]
      },
      {
        question: "What are your greatest strengths and weaknesses?",
        type: "ai-interview",
        followUp: "How are you working to improve your weaknesses?",
        tips: ["Be honest about strengths", "Frame weaknesses positively", "Show self-awareness", "Discuss improvement efforts"]
      },
      {
        question: "Where do you see yourself professionally in 5 years?",
        type: "ai-interview",
        followUp: "How does this position fit into your long-term career goals?",
        tips: ["Show ambition and realism", "Connect to the role/company", "Demonstrate commitment", "Show you've thought about your future"]
      },
      {
        question: "How do you stay current with industry trends and technologies?",
        type: "ai-interview",
        followUp: "What's the most recent thing you've learned that excited you?",
        tips: ["Mention specific resources", "Show continuous learning", "Discuss practical application", "Demonstrate passion for your field"]
      },
      {
        question: "Tell me about a time you had to work with a difficult team member.",
        type: "ai-interview",
        followUp: "What was the outcome and what did you learn from that experience?",
        tips: ["Focus on resolution", "Show emotional intelligence", "Be professional", "Highlight communication skills"]
      },
      {
        question: "Do you have any questions for me about the role or company?",
        type: "ai-interview",
        followUp: "What aspects of our company culture are most important to you?",
        tips: ["Prepare thoughtful questions", "Show genuine interest", "Ask about growth opportunities", "Inquire about team dynamics"]
      }
    ]
  }

  // AI Interviewer responses and feedback
  const aiInterviewerResponses = {
    welcome: "Hello! I'm your AI interviewer today. I'll be asking you a series of questions to assess your skills, experience, and fit for the role. Please take your time to answer thoughtfully. Are you ready to begin?",
    positive: [
      "That's a great answer! I can see you have strong experience in this area.",
      "Excellent response! You've demonstrated good critical thinking skills.",
      "Well articulated! Your experience seems very relevant.",
      "That's very insightful! I appreciate your detailed explanation."
    ],
    neutral: [
      "Interesting perspective. Can you elaborate a bit more on that?",
      "Thank you for sharing that. Let me ask you a follow-up question.",
      "I see what you mean. Let's explore this further.",
      "That's helpful context. Let's move to the next question."
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
      
      // Setup media recorder for audio recording
      if (audioEnabled) {
        mediaRecorderRef.current = new MediaRecorder(stream)
        mediaRecorderRef.current.ondataavailable = (event) => {
          // Handle audio data for AI processing
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
    
    // Initialize media if not already done
    if (!streamRef.current) {
      await initializeMedia()
    }
  }

  // Handle user response in AI interview
  const handleUserResponse = () => {
    if (!userResponse.trim()) return
    
    // Add user response to conversation history
    const newHistory = [...conversationHistory, {role: "user", content: userResponse}]
    setConversationHistory(newHistory)
    
    // Generate AI feedback (simulated)
    const randomPositive = aiInterviewerResponses.positive[Math.floor(Math.random() * aiInterviewerResponses.positive.length)]
    const randomEncouraging = aiInterviewerResponses.encouraging[Math.floor(Math.random() * aiInterviewerResponses.encouraging.length)]
    
    const aiResponse = Math.random() > 0.5 ? randomPositive : randomEncouraging
    setAiFeedback(aiResponse)
    
    // Add AI response to conversation history
    setTimeout(() => {
      setConversationHistory(prev => [...prev, {role: "ai", content: aiResponse}])
      
      // Move to next question or complete interview
      const questions = questionBank["ai-interview"]
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setCurrentInterviewQuestion(questions[currentQuestion + 1].question)
        setAiFeedback("")
      } else {
        setInterviewStage("complete")
        setCurrentInterviewQuestion("Thank you for completing the interview! Here's your feedback:")
        setAiFeedback("Great job! You've completed all the interview questions. Your responses show good communication skills and professional demeanor.")
      }
      
      setUserResponse("")
    }, 2000)
  }

  // End AI interview and cleanup
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
            handleExamComplete()
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

  const handleExamComplete = () => {
    setExamCompleted(true)
    setExamStarted(false)
  }

  const startExam = (examId: string) => {
    if (examId === "ai-interview") {
      startAIInterview()
      return
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🎤 Interview DJ AI Enhanced</h1>
        <p className="text-xl text-gray-300">Comprehensive assessment platform with AI-powered interviews</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
          <TabsTrigger value="speech">Speech</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                    onClick={() => startExam(category.id)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  >
                    Start {category.name}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="aptitude" className="space-y-6">
          <Card className="bg-gray-800 border-2 border-blue-500 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🧠 Aptitude Test</h2>
            <p className="text-gray-300 mb-6">Test your logical reasoning and problem-solving skills</p>
            <Button 
              onClick={() => startExam("aptitude")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              Start Aptitude Test
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="coding" className="space-y-6">
          <Card className="bg-gray-800 border-2 border-green-500 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">💻 Coding Challenge</h2>
            <p className="text-gray-300 mb-6">Showcase your programming skills and algorithmic thinking</p>
            <Button 
              onClick={() => startExam("coding")}
              className="bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              Start Coding Challenge
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="speech" className="space-y-6">
          <Card className="bg-gray-800 border-2 border-purple-500 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🎤 Speech Assessment</h2>
            <p className="text-gray-300 mb-6">Practice your verbal communication and presentation skills</p>
            <Button 
              onClick={() => startExam("speech")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              Start Speech Assessment
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="english" className="space-y-6">
          <Card className="bg-gray-800 border-2 border-orange-500 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">📝 English Proficiency</h2>
            <p className="text-gray-300 mb-6">Test your grammar, vocabulary, and business communication skills</p>
            <div className="mb-4">
              <label className="block text-white mb-2">Select Level:</label>
              <Select value={englishTestLevel} onValueChange={setEnglishTestLevel}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => startExam("english")}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
            >
              Start English Test
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
