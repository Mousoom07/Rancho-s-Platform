"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Loader2, Sparkles, Zap, Shield, Target, TrendingUp, Brain, Network } from "lucide-react"
import { ProfessorVirus } from "@/components/professor-virus"
import { UserDashboard } from "@/components/user-dashboard"
import { SkillsStockMarket } from "@/components/skills-stock-market"
import { BurnoutBloodTest } from "@/components/burnout-blood-test"
import { AISalaryNegotiator } from "@/components/ai-salary-negotiator"
import { DarkWebSkillScout } from "@/components/dark-web-skill-scout"
import { CareerChaosSimulator } from "@/components/career-chaos-simulator"
import { SkillsFuturesMarket } from "@/components/skills-futures-market"
import { ARInterviewDojo } from "@/components/ar-interview-dojo"
import { CareerImmunityScore } from "@/components/career-immunity-score"
import { JobOfferARScanner } from "@/components/job-offer-ar-scanner"
import { CareerTarot } from "@/components/career-tarot"
import { CelebrityAIMentorSpeedDating } from "@/components/celebrity-ai-mentor-speed-dating"
import { SkillExamCenter } from "@/components/skill-exam-center"
import { ProgressAnalytics } from "@/components/progress-analytics"
import { UniqueFeatures } from "@/components/unique-features"
import { StatsSection } from "@/components/stats-section"
import { MarketingSection } from "@/components/marketing-section"
import { NetworkingSection } from "@/components/networking-section"
import { Footer } from "@/components/footer"
import { HangingBlackboard } from "@/components/hanging-blackboard"
import { BiLabel } from "@/components/ui/bilabel"
import ATSScoring from "@/components/resume-ats-score"
import { MiliMeterVideoCompanion } from "@/components/mili-meter-video-companion"
import { DailyRoutineChart } from "@/components/daily-routine-chart"
import { StudyZone } from "@/components/study-zone"

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px] bg-transparent border-0">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-foreground mx-auto mb-4" />
      <p className="text-foreground text-xl font-bold" style={{ fontFamily: "Arial, sans-serif" }}>
        loading excellence...
      </p>
    </div>
  </div>
)

const getToolComponent = (toolId: string) => {
  switch (toolId) {
    case "skills-stock-market":
      return <SkillsStockMarket />
    case "burnout-blood-test":
      return <BurnoutBloodTest />
    case "ai-salary-negotiator":
      return <AISalaryNegotiator />
    case "dark-web-skill-scout":
      return <DarkWebSkillScout />
    case "career-chaos-simulator":
      return <CareerChaosSimulator />
    case "skills-futures-market":
      return <SkillsFuturesMarket />
    case "ar-interview-dojo":
      return <ARInterviewDojo />
    case "career-immunity-score":
      return <CareerImmunityScore />
    case "job-offer-ar-scanner":
      return <JobOfferARScanner />
    case "career-tarot":
      return <CareerTarot />
    case "celebrity-ai-mentor-speed-dating":
      return <CelebrityAIMentorSpeedDating />
    case "skill-exam-center":
      return <SkillExamCenter />
    case "progress-analytics":
      return <ProgressAnalytics />
    case "networking-section":
      return <NetworkingSection />
    case "resume-ats-score":
      return <ATSScoring />
    case "mili-meter-video-companion":
      return <MiliMeterVideoCompanion />
    case "daily-routine-chart":
      return <DailyRoutineChart />
    case "study-zone":
      return <StudyZone />
    default:
      return (
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 drop-shadow">Tool Available!</h2>
          <p className="text-lg text-muted-foreground font-medium">This tool is ready to use. Enjoy exploring!</p>
        </div>
      )
  }
}

const categories = [
  { name: "All Tools", color: "category-btn-active" },
  { name: "Risk Analysis", color: "category-btn-inactive" },
  { name: "Gamification", color: "category-btn-inactive" },
  { name: "Mental Health", color: "category-btn-inactive" },
  { name: "Career Skills", color: "category-btn-inactive" },
  { name: "Skill Discovery", color: "category-btn-inactive" },
  { name: "Advanced Trading", color: "category-btn-inactive" },
  { name: "Predictive Analytics", color: "category-btn-inactive" },
  { name: "AI Analysis", color: "category-btn-inactive" },
  { name: "VR Experience", color: "category-btn-inactive" },
  { name: "Mentorship", color: "category-btn-inactive" },
  { name: "Personal Development", color: "category-btn-inactive" },
]

const features = [
  {
    id: "career-chaos-simulator",
    title: "Career Chaos Simulator",
    description: "Stress test your career path against black swan events with disaster movie style scenarios",
    icon: "🌀",
    category: "Risk Analysis",
    featured: true,
  },
  {
    id: "skills-stock-market",
    title: "Skills Stock Market",
    description: "Invest virtual dollars in trending skills and track your portfolio performance in real-time",
    icon: "📈",
    category: "Gamification",
    featured: true,
  },
  {
    id: "burnout-blood-test",
    title: "Burnout Blood Test",
    description: "Analyze your text for stress signals and get personalized micro-break prescriptions",
    icon: "🩸",
    category: "Mental Health",
    featured: true,
  },
  {
    id: "resume-ats-score",
    title: "ATS Resume Optimizer",
    description: "Build, analyze, and optimize your resume for Applicant Tracking Systems with real-time scoring",
    icon: "📄",
    category: "Career Skills",
    featured: false,
  },
  {
    id: "ai-salary-negotiator",
    title: "AI Salary Negotiator",
    description: "Practice salary negotiations with adaptive HR bot personalities and real scenarios",
    icon: "💰",
    category: "Career Skills",
    featured: false,
  },
  {
    id: "dark-web-skill-scout",
    title: "Dark Web Skill Scout",
    description: "Discover underground high-value skills from exclusive forums and patent databases",
    icon: "🕵️",
    category: "Skill Discovery",
    featured: false,
  },
  {
    id: "skills-futures-market",
    title: "Skills Futures Market",
    description: "Trade future skill values with predictive analytics and advanced market trends",
    icon: "🔮",
    category: "Advanced Trading",
    featured: false,
  },
  {
    id: "ar-interview-dojo",
    title: "AR Interview Dojo",
    description: "Master interviews with holographic AI mentors and real-time biofeedback training",
    icon: "🥋",
    category: "VR Experience",
    featured: false,
  },
  {
    id: "career-immunity-score",
    title: "Career Immunity Score",
    description: "Quantify your professional resilience against career disruptions and market changes",
    icon: "🛡️",
    category: "Risk Analysis",
    featured: false,
  },
  {
    id: "job-offer-ar-scanner",
    title: "Job Offer AR Scanner",
    description: "Point your phone at job postings to reveal hidden salary ranges and company red flags",
    icon: "📱",
    category: "AI Analysis",
    featured: false,
  },
  {
    id: "career-tarot",
    title: "Career Tarot",
    description: "AI-generated choose-your-own-adventure career forecast with mystical insights",
    icon: "🔮",
    category: "Predictive Analytics",
    featured: false,
  },
  {
    id: "celebrity-ai-mentor-speed-dating",
    title: "Celebrity AI Mentor Speed Dating",
    description: "Get personalized advice from AI versions of Elon Musk, Oprah, and Steve Jobs",
    icon: "⭐",
    category: "Mentorship",
    featured: false,
  },
  {
    id: "skill-exam-center",
    title: "Skill Exam Center",
    description: "Take comprehensive exams in tech, hospitality, finance, healthcare, and more industries",
    icon: "📚",
    category: "Skill Discovery",
    featured: false,
  },
  {
    id: "progress-analytics",
    title: "Progress Analytics",
    description: "Track your daily, monthly, and yearly improvement with detailed charts and insights",
    icon: "📊",
    category: "Predictive Analytics",
    featured: false,
  },
  {
    id: "networking-section",
    title: "Career Chaos Network",
    description: "Connect with fellow chaos survivors and build your antifragile career network",
    icon: "🌐",
    category: "Mentorship",
    featured: false,
  },
  {
    id: "mili-meter-video-companion",
    title: "Mili Meter Video Companion",
    description: "AI video call companion for students feeling lonely - get support, meditation suggestions, and book recommendations",
    icon: "🤖",
    category: "Mental Health",
    featured: true,
  },
  {
    id: "daily-routine-chart",
    title: "Daily Routine Chart",
    description: "Plan and track your daily activities for better productivity and work-life balance",
    icon: "📅",
    category: "Personal Development",
    featured: false,
  },
  {
    id: "study-zone",
    title: "Study Zone",
    description: "Access a curated collection of books, videos, and resources to accelerate your learning",
    icon: "📚",
    category: "Skill Discovery",
    featured: true,
  },
]

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("All Tools")
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "Alex Chen",
    avatar: "",
    email: "alex.chen@example.com",
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  const filteredFeatures =
    selectedCategory === "All Tools" ? features : features.filter((feature) => feature.category === selectedCategory)

  const featuredTools = features.filter((feature) => feature.featured).slice(0, 3)

  const handleAuthSuccess = (userData: any) => {
    setIsLoggedIn(true)
    setUserProfile(userData)
    setShowAuthModal(false)
  }

  const handleSignOut = () => {
    setIsLoggedIn(false)
    setUserProfile({ name: "Alex Chen", avatar: "", email: "alex.chen@example.com" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 animate-pulse">Initializing Rancho's Platform...</h2>
          <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>
    )
  }

  if (selectedFeature) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* 3D Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
              }}
            />
          ))}
        </div>

        <nav className="relative z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center gap-6">
                <Button
                  onClick={() => setSelectedFeature(null)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 text-xl px-8 py-3 font-black transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  <ArrowLeft className="w-6 h-6 mr-3" />
                  Back to Chaos
                </Button>
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center overflow-hidden animate-pulse">
                  <img src="/idiots-logo.jpg" alt="Chaos Logo" className="w-16 h-16 object-cover rounded-full" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl text-yellow-400 font-black" style={{ fontFamily: "Rancho, cursive" }}>
                    Rancho's Platform
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/subscription'}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-400 hover:to-blue-400 text-xl px-6 py-3 font-black transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  <BiLabel en="Pricing" hi="मूल्य निर्धारण" />
                </Button>
                {!isLoggedIn ? (
                  <>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setAuthMode("login")
                        setShowAuthModal(true)
                      }}
                      className="bg-white/10 text-white hover:bg-white/20 text-xl px-6 py-3 font-black border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                      style={{ fontFamily: "Rancho, cursive" }}
                    >
                      <BiLabel en="Sign In" hi="साइन इन" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setAuthMode("signup")
                        setShowAuthModal(true)
                      }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 text-xl px-6 py-3 font-black transition-all duration-300 transform hover:scale-105"
                      style={{ fontFamily: "Rancho, cursive" }}
                    >
                      <BiLabel en="Join with Rancho" hi="रांचो से जुड़ें" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setShowDashboard(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 text-xl px-6 py-3 font-black transition-all duration-300 transform hover:scale-105"
                      style={{ fontFamily: "Rancho, cursive" }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleSignOut}
                      className="bg-white/10 text-white hover:bg-white/20 text-xl px-6 py-3 font-black border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                      style={{ fontFamily: "Rancho, cursive" }}
                    >
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "Rancho, cursive" }}>
              {features.find(f => f.id === selectedFeature)?.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {features.find(f => f.id === selectedFeature)?.description}
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            {getToolComponent(selectedFeature)}
          </div>
        </div>

        <ProfessorVirus />

        {showDashboard && (
          <UserDashboard
            isOpen={showDashboard}
            onClose={() => setShowDashboard(false)}
            isLoggedIn={isLoggedIn}
            onSignOut={handleSignOut}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            }}
          />
        ))}
      </div>

      <nav className="relative z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center overflow-hidden animate-pulse">
                <img src="/idiots-logo.jpg" alt="Chaos Logo" className="w-16 h-16 object-cover rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl text-yellow-400 font-black" style={{ fontFamily: "Rancho, cursive" }}>
                  Rancho's Platform
                </span>
                <span className="text-sm text-gray-400">Personalized Career & Skills Advisor</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/subscription'}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-400 hover:to-blue-400 text-xl px-6 py-3 font-black transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                <BiLabel en="Pricing" hi="मूल्य निर्धारण" />
              </Button>
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setAuthMode("login")
                      setShowAuthModal(true)
                    }}
                    className="bg-white/10 text-white hover:bg-white/20 text-xl px-6 py-3 font-black border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                    style={{ fontFamily: "Rancho, cursive" }}
                  >
                    <BiLabel en="Sign In" hi="साइन इन" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setAuthMode("signup")
                      setShowAuthModal(true)
                    }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 text-xl px-6 py-3 font-black transition-all duration-300 transform hover:scale-105"
                    style={{ fontFamily: "Rancho, cursive" }}
                  >
                    <BiLabel en="Join with Rancho" hi="रांचो से जुड़ें" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowDashboard(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 text-xl px-6 py-3 font-black transition-all duration-300 transform hover:scale-105"
                    style={{ fontFamily: "Rancho, cursive" }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleSignOut}
                    className="bg-white/10 text-white hover:bg-white/20 text-xl px-6 py-3 font-black border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                    style={{ fontFamily: "Rancho, cursive" }}
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section with Hanging Blackboard */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <HangingBlackboard 
            onDisasterAnalysis={() => setSelectedFeature("career-chaos-simulator")}
            onChaosRoulette={() => {
              // Randomly select a featured tool
              const featuredTools = features.filter(f => f.featured)
              const randomTool = featuredTools[Math.floor(Math.random() * featuredTools.length)]
              setSelectedFeature(randomTool.id)
            }}
          />
        </section>

        {/* Featured Tools */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center" style={{ fontFamily: "Rancho, cursive" }}>
              Featured Chaos Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedFeature(tool.id)}
                >
                  <div className="text-6xl mb-4">{tool.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
                  <p className="text-gray-300 mb-6">{tool.description}</p>
                  <Badge className="bg-blue-600 text-white">{tool.category}</Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center" style={{ fontFamily: "Rancho, cursive" }}>
              Explore by Category
            </h2>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="outline"
                  className={`${category.color} border-2 text-lg px-6 py-3 font-bold transition-all duration-300 transform hover:scale-105`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                  <Badge className="bg-blue-600 text-white text-xs">{feature.category}</Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />
        
        {/* Marketing Section */}
        <MarketingSection />
        
        {/* Networking Section */}
        <NetworkingSection />
        
        {/* Footer */}
        <Footer />
      </main>

      <ProfessorVirus />

      {showAuthModal && (
        <UserDashboard
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialAuthMode={authMode}
          authOnly={true}
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {showDashboard && (
        <UserDashboard
          isOpen={showDashboard}
          onClose={() => setShowDashboard(false)}
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}
