"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function SkillExamCenter() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [examStarted, setExamStarted] = useState(false)
  const [examCompleted, setExamCompleted] = useState(false)

  const subjects = [
    {
      id: "tech",
      name: "Technology & Programming",
      icon: "💻",
      description: "Test your knowledge in programming, AI, cloud computing, and emerging tech trends",
      questions: 25,
      duration: "45 minutes",
      difficulty: "Intermediate to Advanced",
    },
    {
      id: "hospitality",
      name: "Hospitality & Tourism",
      icon: "🏨",
      description: "Assess your expertise in hotel management, customer service, and tourism industry",
      questions: 20,
      duration: "30 minutes",
      difficulty: "Beginner to Intermediate",
    },
    {
      id: "finance",
      name: "Finance & Banking",
      icon: "💰",
      description: "Evaluate your financial analysis, investment, and banking sector knowledge",
      questions: 30,
      duration: "50 minutes",
      difficulty: "Intermediate to Advanced",
    },
    {
      id: "healthcare",
      name: "Healthcare & Medicine",
      icon: "🏥",
      description: "Test your understanding of medical practices, healthcare management, and patient care",
      questions: 35,
      duration: "60 minutes",
      difficulty: "Advanced",
    },
    {
      id: "marketing",
      name: "Digital Marketing",
      icon: "📱",
      description: "Assess your skills in social media, SEO, content marketing, and digital advertising",
      questions: 22,
      duration: "35 minutes",
      difficulty: "Beginner to Advanced",
    },
    {
      id: "design",
      name: "Design & Creative",
      icon: "🎨",
      description: "Evaluate your design thinking, UX/UI principles, and creative problem-solving",
      questions: 18,
      duration: "40 minutes",
      difficulty: "Intermediate",
    },
  ]

  const sampleQuestions = {
    tech: [
      {
        question: "Which programming paradigm focuses on immutable data and pure functions?",
        options: ["Object-Oriented", "Functional", "Procedural", "Event-Driven"],
        correct: 1,
      },
      {
        question: "What is the primary benefit of microservices architecture?",
        options: ["Faster development", "Better scalability", "Reduced complexity", "Lower costs"],
        correct: 1,
      },
    ],
    hospitality: [
      {
        question: "What is the most important factor in customer satisfaction in hospitality?",
        options: ["Price", "Location", "Service quality", "Amenities"],
        correct: 2,
      },
    ],
  }

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId)
    setExamStarted(false)
    setExamCompleted(false)
    setCurrentQuestion(0)
    setScore(0)
  }

  const startExam = () => {
    setExamStarted(true)
  }

  const handleAnswer = (answerIndex: number) => {
    const questions = sampleQuestions[selectedSubject as keyof typeof sampleQuestions] || []
    if (questions[currentQuestion]?.correct === answerIndex) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setExamCompleted(true)
    }
  }

  const resetExam = () => {
    setSelectedSubject(null)
    setExamStarted(false)
    setExamCompleted(false)
    setCurrentQuestion(0)
    setScore(0)
  }

  if (examCompleted) {
    const questions = sampleQuestions[selectedSubject as keyof typeof sampleQuestions] || []
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <h2
            className="text-4xl text-force-white mb-4 drop-shadow-2xl font-bold"
            style={{
              fontFamily: "Comic Sans MS, cursive",
              letterSpacing: "2px",
              textShadow:
                "3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 10px #fff",
            }}
          >
            🎉 exam completed! 🎉
          </h2>
        </div>

        <Card className="bg-dark-card border-8 border-visible p-8 shadow-2xl text-center">
          <div className="text-6xl mb-6">{percentage >= 80 ? "🏆" : percentage >= 60 ? "🥈" : "📚"}</div>
          <h3 className="text-2xl text-force-white mb-4 font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            Your Score: {score}/{questions.length} ({percentage}%)
          </h3>
          <div className="mb-6">
            <Progress value={percentage} className="h-4" />
          </div>
          <p className="text-force-white font-bold mb-6" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            {percentage >= 80
              ? "Excellent! You're ready for advanced challenges!"
              : percentage >= 60
                ? "Good job! Keep practicing to improve further."
                : "Keep learning! Practice makes perfect."}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={resetExam}
              className="bg-yellow-400 border-4 border-visible text-force-black hover:bg-dark-card font-bold"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              Take Another Exam
            </Button>
            <Button
              onClick={() => setExamStarted(false)}
              className="bg-dark-card border-4 border-visible text-force-yellow hover:bg-yellow-400 hover:text-force-black font-bold"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              Review Answers
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (examStarted && selectedSubject) {
    const questions = sampleQuestions[selectedSubject as keyof typeof sampleQuestions] || []
    const currentQ = questions[currentQuestion]

    if (!currentQ) {
      return (
        <div className="text-center p-8">
          <p className="text-force-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            Questions for this subject are being prepared. Please try another subject!
          </p>
          <Button
            onClick={resetExam}
            className="mt-4 bg-yellow-400 border-4 border-visible text-force-black hover:bg-dark-card font-bold"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            Back to Subjects
          </Button>
        </div>
      )
    }

    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-force-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <Badge className="bg-dark-card text-force-yellow border-2 border-visible font-bold">
              Score: {score}/{currentQuestion}
            </Badge>
          </div>
          <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
        </div>

        <Card className="bg-dark-card border-8 border-visible p-8 shadow-2xl">
          <h3 className="text-xl text-force-white mb-6 font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            {currentQ.question}
          </h3>
          <div className="grid gap-4">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                className="bg-yellow-400 border-4 border-visible text-force-black hover:bg-dark-card text-left p-4 font-bold"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                {String.fromCharCode(65 + index)}. {option}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    )
  }

  if (selectedSubject) {
    const subject = subjects.find((s) => s.id === selectedSubject)

    return (
      <div className="max-w-4xl mx-auto p-8">
        <Button
          onClick={() => setSelectedSubject(null)}
          className="mb-6 bg-dark-card border-4 border-visible text-force-white hover:bg-yellow-400 font-bold"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          ← Back to Subjects
        </Button>

        <Card className="bg-dark-card border-8 border-visible p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{subject?.icon}</div>
            <h2 className="text-3xl text-force-white mb-4 font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              {subject?.name}
            </h2>
            <p className="text-force-white font-bold mb-6" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              {subject?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-bold text-force-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                {subject?.questions} Questions
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⏰</div>
              <div className="font-bold text-force-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                {subject?.duration}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-bold text-force-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                {subject?.difficulty}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={startExam}
              className="bg-dark-card border-4 border-visible text-force-yellow hover:bg-yellow-400 hover:text-force-black text-xl px-8 py-4 font-bold"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              🚀 Start Exam
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1
          className="text-4xl text-force-white mb-6 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 10px #fff",
          }}
        >
          📚 skill examination center 📚
        </h1>
        <p className="text-force-white font-bold text-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
          Test your expertise across various industries and get certified!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="bg-dark-card border-8 border-visible p-6 shadow-2xl hover:scale-105 transition-all cursor-pointer"
            onClick={() => handleSubjectSelect(subject.id)}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">{subject.icon}</div>
              <h3 className="text-xl text-force-white mb-3 font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                {subject.name}
              </h3>
              <p className="text-force-white font-bold text-sm mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                {subject.description}
              </p>
              <div className="flex justify-center gap-2 mb-4">
                <Badge className="bg-yellow-400 text-force-black border-2 border-visible font-bold text-xs">
                  {subject.questions} Q's
                </Badge>
                <Badge className="bg-dark-card text-force-yellow border-2 border-visible font-bold text-xs">
                  {subject.duration}
                </Badge>
              </div>
              <Button
                className="bg-yellow-400 border-4 border-visible text-force-black hover:bg-dark-card font-bold w-full"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Take Exam
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
