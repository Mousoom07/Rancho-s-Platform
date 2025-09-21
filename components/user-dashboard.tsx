"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { LogIn, UserPlus, Trophy, User, Save, Camera, X, Plus, Briefcase, Award, Code, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface UserDashboardProps {
  isOpen: boolean
  onClose: () => void
  initialAuthMode?: "login" | "signup"
  authOnly?: boolean
  onAuthSuccess?: (userData: any) => void
  onSignOut?: () => void
  isLoggedIn: boolean
}

export function UserDashboard({
  isOpen,
  onClose,
  initialAuthMode = "login",
  authOnly = false,
  onAuthSuccess,
  onSignOut,
  isLoggedIn: externalIsLoggedIn = false,
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoggedIn, setIsLoggedIn] = useState(externalIsLoggedIn)
  const [showAuth, setShowAuth] = useState(authOnly)
  const [authMode, setAuthMode] = useState<"login" | "signup">(initialAuthMode)
  const [isEditing, setIsEditing] = useState(false)

  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    bio: "Passionate software engineer with 5+ years of experience in full-stack development. Love creating innovative solutions and mentoring junior developers.",
    profilePhoto: "",
    joinDate: "January 2023",
    activeTime: 0,
    experience: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        duration: "2022 - Present",
        description:
          "Lead development of microservices architecture, mentor junior developers, and drive technical decisions for the platform team.",
      },
      {
        id: 2,
        title: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "2020 - 2022",
        description:
          "Built and maintained web applications using React, Node.js, and PostgreSQL. Collaborated with design team to implement user-friendly interfaces.",
      },
    ],
    skills: [
      { id: 1, name: "JavaScript", level: "Expert", category: "Programming" },
      { id: 2, name: "React", level: "Expert", category: "Frontend" },
      { id: 3, name: "Node.js", level: "Advanced", category: "Backend" },
      { id: 4, name: "Python", level: "Intermediate", category: "Programming" },
      { id: 5, name: "AWS", level: "Intermediate", category: "Cloud" },
    ],
    certifications: [
      { id: 1, name: "AWS Solutions Architect", issuer: "Amazon", year: "2023" },
      { id: 2, name: "React Developer Certification", issuer: "Meta", year: "2022" },
    ],
    points: 2847,
    level: 12,
    achievements: ["Code Ninja", "Bug Hunter", "Team Player"],
    streakDays: 45,
    completedChallenges: 23,
  })

  // ... existing state variables ...
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
  })
  const [newSkill, setNewSkill] = useState({ name: "", level: "Beginner", category: "" })
  const [newCertification, setNewCertification] = useState({ name: "", issuer: "", year: "" })

  useEffect(() => {
    setIsLoggedIn(externalIsLoggedIn)
  }, [externalIsLoggedIn])

  useEffect(() => {
    setAuthMode(initialAuthMode)
  }, [initialAuthMode])

  useEffect(() => {
    if (authOnly && !isLoggedIn) {
      setShowAuth(true)
    }
  }, [authOnly, isLoggedIn])

  // Time tracking
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        setUserData((prev) => ({
          ...prev,
          activeTime: prev.activeTime + 1,
        }))
      }, 60000)

      return () => clearInterval(interval)
    }
  }, [isLoggedIn])

  const handleAuth = (email: string, password: string) => {
    const newUserData = { ...userData, email }
    setIsLoggedIn(true)
    setShowAuth(false)
    setUserData(newUserData)

    // Call parent callback with user data
    if (onAuthSuccess) {
      onAuthSuccess(newUserData)
    }

    if (authOnly) {
      onClose()
    }
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Update parent component with new user data
    if (onAuthSuccess) {
      onAuthSuccess(userData)
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newUserData = { ...userData, profilePhoto: e.target?.result as string }
        setUserData(newUserData)
        if (onAuthSuccess) {
          onAuthSuccess(newUserData)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSignOut = () => {
    setIsLoggedIn(false)
    if (onSignOut) {
      onSignOut()
    }
    onClose()
  }

  // ... existing helper functions ...

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      setUserData((prev) => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience, id: Date.now() }],
      }))
      setNewExperience({ title: "", company: "", duration: "", description: "" })
    }
  }

  const removeExperience = (id: number) => {
    setUserData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addSkill = () => {
    if (newSkill.name && newSkill.category) {
      setUserData((prev) => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill, id: Date.now() }],
      }))
      setNewSkill({ name: "", level: "Beginner", category: "" })
    }
  }

  const removeSkill = (id: number) => {
    setUserData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setUserData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, { ...newCertification, id: Date.now() }],
      }))
      setNewCertification({ name: "", issuer: "", year: "" })
    }
  }

  const removeCertification = (id: number) => {
    setUserData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }))
  }

  if (!isOpen) return null

  if (authOnly && !isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-8">
            {/* Animated logo container */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-40"></div>
              <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center overflow-hidden border-4 border-yellow-400/50">
                <img
                  src={authMode === "login" ? "/rancho-welcome.png" : "/professor-virus-welcome.png"}
                  alt={authMode === "login" ? "Rancho" : "Professor Virus"}
                  className="w-12 h-12 object-cover"
                />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              {authMode === "login" ? "Welcome Back!" : "Join the Revolution"}
            </h2>
            <p className="text-slate-300 text-sm">
              {authMode === "login" ? "Sign in to continue your journey" : "Start your career excellence journey"}
            </p>
          </div>

          {/* Inspirational quote */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
            <p className="text-purple-300 text-sm italic text-center">
              {authMode === "login" 
                ? "Kaamyaab hone ke liye nahin, kaabil hone ke liye padho!" 
                : "All is well... sab kuch theek ho jaayega!"}
            </p>
            <p className="text-slate-400 text-xs mt-1 text-center">- {authMode === "login" ? "Rancho" : "Rancho"}</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleAuth(formData.get("email") as string, formData.get("password") as string)
            }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60"></div>
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-slate-800/50 border-slate-600 text-white pl-10 pr-4 py-3 rounded-xl focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"></div>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-slate-800/50 border-slate-600 text-white pl-10 pr-4 py-3 rounded-xl focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {authMode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-600 bg-slate-800/50 text-purple-500 focus:ring-purple-400/20" />
                  <span className="text-slate-300 text-sm">Remember me</span>
                </label>
                <button type="button" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25"
            >
              {authMode === "login" ? (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-slate-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button" 
                variant="outline"
                className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
              >
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                Google
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
              >
                <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
                GitHub
              </Button>
            </div>
          </form>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {authMode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <span className="text-purple-400 hover:text-purple-300 font-medium">Sign up here</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="text-purple-400 hover:text-purple-300 font-medium">Sign in here</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Welcome to Rancho's Platform</h2>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex justify-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-400">
                  <img src="/rancho-welcome.png" alt="Rancho" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-400">
                  <img
                    src="/professor-virus-welcome.png"
                    alt="Professor Virus"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-slate-300 mb-6">
                Join Rancho and Professor Virus on your journey to career excellence!
              </p>
              <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                <p className="text-yellow-300 text-sm italic">
                  "All is well... sab kuch theek ho jaayega! Life mein problems aati rahegi, lekin darna nahin hai!"
                </p>
                <p className="text-slate-400 text-xs mt-1">- Rancho</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowAuth(true)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setAuthMode("signup")
                  setShowAuth(true)
                }}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl">
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-2xl border-4 border-white/10">
                {userData.profilePhoto ? (
                  <img
                    src={userData.profilePhoto || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
              </div>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-600 p-0 shadow-lg"
                  onClick={() => document.getElementById("photo-upload")?.click()}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
              <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 tracking-tight break-words word-wrap overflow-wrap-anywhere">
                {userData.name}
              </h1>
              <p className="text-slate-300 text-lg break-words word-wrap overflow-wrap-anywhere">
                Member since {userData.joinDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 text-base font-medium shadow-lg"
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
            <Button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-base font-medium shadow-lg border-2 border-red-400"
            >
              <X className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="h-full overflow-y-auto overflow-x-hidden pb-20">
        <div className="p-4 md:p-6 lg:p-8 pt-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Left Column - Personal Info & Stats */}
            <div className="xl:col-span-1 space-y-6">
              {/* Personal Information */}
              <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center gap-3 text-xl break-words word-wrap overflow-wrap-anywhere">
                    <User className="w-6 h-6 flex-shrink-0" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">Full Name</label>
                      {isEditing ? (
                        <Input
                          value={userData.name}
                          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 h-12 text-base w-full break-words word-wrap overflow-wrap-anywhere"
                        />
                      ) : (
                        <div className="text-white bg-slate-700/40 p-4 rounded-lg border border-slate-600/30 text-base break-words word-wrap overflow-wrap-anywhere">
                          {userData.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">Email</label>
                      {isEditing ? (
                        <Input
                          value={userData.email}
                          onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 h-12 text-base w-full break-words word-wrap overflow-wrap-anywhere"
                        />
                      ) : (
                        <div className="text-white bg-slate-700/40 p-4 rounded-lg border border-slate-600/30 text-base break-words word-wrap overflow-wrap-anywhere">
                          {userData.email}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">Phone</label>
                      {isEditing ? (
                        <Input
                          value={userData.phone}
                          onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 h-12 text-base w-full break-words word-wrap overflow-wrap-anywhere"
                        />
                      ) : (
                        <div className="text-white bg-slate-700/40 p-4 rounded-lg border border-slate-600/30 text-base break-words word-wrap overflow-wrap-anywhere">
                          {userData.phone}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">Location</label>
                      {isEditing ? (
                        <Input
                          value={userData.location}
                          onChange={(e) => setUserData((prev) => ({ ...prev, location: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 h-12 text-base w-full break-words word-wrap overflow-wrap-anywhere"
                        />
                      ) : (
                        <div className="text-white bg-slate-700/40 p-4 rounded-lg border border-slate-600/30 text-base break-words word-wrap overflow-wrap-anywhere">
                          {userData.location}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">Website</label>
                      {isEditing ? (
                        <Input
                          value={userData.website}
                          onChange={(e) => setUserData((prev) => ({ ...prev, website: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 h-12 text-base w-full break-words word-wrap overflow-wrap-anywhere"
                        />
                      ) : (
                        <div className="text-white bg-slate-700/40 p-4 rounded-lg border border-slate-600/30 text-base break-words word-wrap overflow-wrap-anywhere">
                          {userData.website}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">Bio</label>
                      {isEditing ? (
                        <Textarea
                          value={userData.bio}
                          onChange={(e) => setUserData((prev) => ({ ...prev, bio: e.target.value }))}
                          className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 p-4 rounded-lg resize-none text-base break-words word-wrap overflow-wrap-anywhere"
                          rows={4}
                        />
                      ) : (
                        <div className="text-white bg-slate-700/40 p-4 rounded-lg border border-slate-600/30 leading-relaxed text-base break-words word-wrap overflow-wrap-anywhere">
                          {userData.bio}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Stats */}
              <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center gap-3 text-xl">
                    <Trophy className="w-6 h-6" />
                    Platform Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-5 bg-slate-700/40 rounded-lg border border-slate-600/30">
                      <div className="text-3xl font-bold text-purple-400">{userData.points}</div>
                      <div className="text-slate-300 text-sm mt-1">Points</div>
                    </div>
                    <div className="text-center p-5 bg-slate-700/40 rounded-lg border border-slate-600/30">
                      <div className="text-3xl font-bold text-blue-400">{userData.level}</div>
                      <div className="text-slate-300 text-sm mt-1">Level</div>
                    </div>
                    <div className="text-center p-5 bg-slate-700/40 rounded-lg border border-slate-600/30">
                      <div className="text-3xl font-bold text-green-400">{userData.streakDays}</div>
                      <div className="text-slate-300 text-sm mt-1">Day Streak</div>
                    </div>
                    <div className="text-center p-5 bg-slate-700/40 rounded-lg border border-slate-600/30">
                      <div className="text-3xl font-bold text-orange-400">{userData.completedChallenges}</div>
                      <div className="text-slate-300 text-sm mt-1">Challenges</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-white font-semibold mb-3 text-lg">Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {userData.achievements.map((achievement, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30 font-medium break-words word-wrap overflow-wrap-anywhere"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Columns - Experience, Skills, Certifications */}
            <div className="xl:col-span-3 space-y-6">
              {/* Experience Section */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.experience.map((exp) => (
                    <div key={exp.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-semibold text-lg break-words word-wrap overflow-wrap-anywhere">
                            {exp.title}
                          </h4>
                          <p className="text-purple-300 font-medium break-words word-wrap overflow-wrap-anywhere">
                            {exp.company}
                          </p>
                          <p className="text-slate-400 text-sm break-words word-wrap overflow-wrap-anywhere">
                            {exp.duration}
                          </p>
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-slate-300 leading-relaxed break-words word-wrap overflow-wrap-anywhere">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                  {isEditing && (
                    <div className="p-4 bg-slate-700/20 rounded-lg border-2 border-dashed border-slate-600">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Job Title"
                            value={newExperience.title}
                            onChange={(e) => setNewExperience((prev) => ({ ...prev, title: e.target.value }))}
                            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                          />
                          <Input
                            placeholder="Company"
                            value={newExperience.company}
                            onChange={(e) => setNewExperience((prev) => ({ ...prev, company: e.target.value }))}
                            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                          />
                        </div>
                        <Input
                          placeholder="Duration (e.g., 2020 - 2022)"
                          value={newExperience.duration}
                          onChange={(e) => setNewExperience((prev) => ({ ...prev, duration: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
                        />
                        <Textarea
                          placeholder="Job Description"
                          value={newExperience.description}
                          onChange={(e) => setNewExperience((prev) => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 p-3 rounded-lg resize-none"
                          rows={3}
                        />
                        <Button onClick={addExperience} size="sm" className="bg-purple-500 hover:bg-purple-600">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Skills Section */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.skills.map((skill) => (
                      <div key={skill.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-white font-semibold break-words word-wrap overflow-wrap-anywhere">
                              {skill.name}
                            </h4>
                            <p className="text-slate-400 text-sm break-words word-wrap overflow-wrap-anywhere">
                              {skill.category}
                            </p>
                          </div>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(skill.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                skill.level === "Expert"
                                  ? "bg-green-500 w-full"
                                  : skill.level === "Advanced"
                                    ? "bg-blue-500 w-4/5"
                                    : skill.level === "Intermediate"
                                      ? "bg-yellow-500 w-3/5"
                                      : "bg-red-500 w-2/5"
                              }`}
                            />
                          </div>
                          <span className="text-slate-300 text-sm font-medium">{skill.level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="p-4 bg-slate-700/20 rounded-lg border-2 border-dashed border-slate-600">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Input
                          placeholder="Skill Name"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
                        />
                        <select
                          value={newSkill.level}
                          onChange={(e) => setNewSkill((prev) => ({ ...prev, level: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2"
                        >
                          <option value="">Select Level</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        <Input
                          placeholder="Category"
                          value={newSkill.category}
                          onChange={(e) => setNewSkill((prev) => ({ ...prev, category: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                      <Button onClick={addSkill} size="sm" className="bg-purple-500 hover:bg-purple-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Certifications Section */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.certifications.map((cert) => (
                    <div key={cert.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-semibold break-words word-wrap overflow-wrap-anywhere">
                            {cert.name}
                          </h4>
                          <p className="text-purple-300 break-words word-wrap overflow-wrap-anywhere">{cert.issuer}</p>
                          <p className="text-slate-400 text-sm">Issued: {cert.year}</p>
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertification(cert.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <div className="p-4 bg-slate-700/20 rounded-lg border-2 border-dashed border-slate-600">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Input
                          placeholder="Certification Name"
                          value={newCertification.name}
                          onChange={(e) => setNewCertification((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
                        />
                        <Input
                          placeholder="Issuing Organization"
                          value={newCertification.issuer}
                          onChange={(e) => setNewCertification((prev) => ({ ...prev, issuer: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
                        />
                        <Input
                          placeholder="Year"
                          value={newCertification.year}
                          onChange={(e) => setNewCertification((prev) => ({ ...prev, year: e.target.value }))}
                          className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                      <Button onClick={addCertification} size="sm" className="bg-purple-500 hover:bg-purple-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
