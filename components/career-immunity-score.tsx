"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Zap, Brain, Globe, Bot, Building, CheckCircle, AlertTriangle, TrendingUp, Target, Lightbulb } from "lucide-react"

interface UserProfile {
  name: string
  currentRole: string
  industry: string
  experience: string
  skills: string[]
  education: string
  location: string
  remoteWorkPreference: string
  salaryRange: string
  careerGoals: string
}

interface Vulnerability {
  type: string
  severity: "High" | "Medium" | "Low"
  description: string
  recommendation: string
}

interface Booster {
  type: string
  impact: "High" | "Medium" | "Low"
  description: string
  action: string
}

export function CareerImmunityScore() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    currentRole: "",
    industry: "",
    experience: "",
    skills: [],
    education: "",
    location: "",
    remoteWorkPreference: "",
    salaryRange: "",
    careerGoals: ""
  })

  const [immunityScore, setImmunityScore] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("assessment")
  const [skillInput, setSkillInput] = useState("")
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [boosters, setBoosters] = useState<Booster[]>([])

  const industries = ["Technology", "Healthcare", "Finance", "Education", "Manufacturing", "Retail", "Consulting", "Media", "Government", "Non-profit", "Other"]
  const experienceLevels = ["Entry Level (0-2 years)", "Junior (2-5 years)", "Mid-level (5-10 years)", "Senior (10-15 years)", "Executive (15+ years)"]
  const educationLevels = ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "PhD", "Professional Certification", "Bootcamp"]

  const calculateImmunityScore = (profile: UserProfile) => {
    let score = 50
    const newVulnerabilities: Vulnerability[] = []
    const newBoosters: Booster[] = []
    
    // AI Disruption Risk Analysis
    const aiRiskCategories: Record<string, number> = {
      "Technology": 0.8, "Finance": 0.6, "Manufacturing": 0.7, "Retail": 0.5,
      "Healthcare": 0.3, "Education": 0.4, "Consulting": 0.5, "Media": 0.6,
      "Government": 0.2, "Non-profit": 0.1
    }

    const techSkills = ["programming", "ai", "machine learning", "data science", "cloud", "cybersecurity", "blockchain"]
    const hasTechSkills = profile.skills.some(skill => 
      techSkills.some(tech => skill.toLowerCase().includes(tech))
    )

    let aiRiskScore = Math.max(0, 100 - (aiRiskCategories[profile.industry] || 0.5) * 100)
    if (hasTechSkills) aiRiskScore += 15
    if (profile.skills.some(skill => skill.toLowerCase().includes("ai"))) aiRiskScore += 10

    // Add AI-related vulnerabilities
    if (!hasTechSkills && (aiRiskCategories[profile.industry] || 0.5) > 0.6) {
      newVulnerabilities.push({
        type: "AI Disruption Risk",
        severity: "High",
        description: "Your industry is highly susceptible to AI automation, and you lack technical skills to adapt.",
        recommendation: "Develop technical skills in AI, machine learning, or data science to future-proof your career."
      })
    }

    // Industry Diversification Analysis
    const industryVolatility: Record<string, number> = {
      "Technology": 0.3, "Media": 0.4, "Retail": 0.3, "Manufacturing": 0.2,
      "Finance": 0.2, "Consulting": 0.1, "Healthcare": 0.1, "Education": 0.1,
      "Government": 0.05, "Non-profit": 0.05
    }

    let industryScore = Math.max(0, 100 - (industryVolatility[profile.industry] || 0.2) * 100)
    const experienceYears = parseInt(profile.experience.match(/\d+/)?.[0] || "0")
    if (experienceYears > 5) industryScore += 10
    if (experienceYears > 10) industryScore += 10

    // Geographic Risk Analysis
    const remoteWorkScore = profile.remoteWorkPreference === "Fully Remote" ? 90 : 
                           profile.remoteWorkPreference === "Hybrid" ? 75 : 
                           profile.remoteWorkPreference === "On-site" ? 40 : 60

    let geographicScore = remoteWorkScore
    if (profile.location.toLowerCase().includes("remote")) geographicScore += 10

    // Add geographic vulnerabilities
    if (profile.remoteWorkPreference === "On-site") {
      newVulnerabilities.push({
        type: "Geographic Limitation",
        severity: "Medium",
        description: "Limited to on-site work reduces job opportunities and geographic flexibility.",
        recommendation: "Consider developing skills that enable remote work or negotiate hybrid arrangements."
      })
    }

    // Skill Obsolescence Analysis
    const modernSkills = ["cloud computing", "data analysis", "digital marketing", "project management", "agile", "devops", "cybersecurity"]
    const hasModernSkills = profile.skills.filter(skill => 
      modernSkills.some(modern => skill.toLowerCase().includes(modern))
    ).length

    const skillScore = Math.min(100, 30 + (hasModernSkills * 10) + (profile.skills.length * 2))
    const educationBonus = profile.education.includes("Master") || profile.education.includes("PhD") ? 10 : 5

    // Add skill-related vulnerabilities
    if (profile.skills.length < 3) {
      newVulnerabilities.push({
        type: "Limited Skill Set",
        severity: "High",
        description: "Having fewer than 3 skills limits your career flexibility and opportunities.",
        recommendation: "Diversify your skill set by learning complementary skills in your field."
      })
    }

    if (hasModernSkills < 2) {
      newVulnerabilities.push({
        type: "Outdated Skills",
        severity: "Medium",
        description: "Lack of modern, in-demand skills may make you less competitive.",
        recommendation: "Focus on learning current technologies and methodologies relevant to your industry."
      })
    }

    // Generate boosters based on profile
    if (hasTechSkills) {
      newBoosters.push({
        type: "Technical Skills Advantage",
        impact: "High",
        description: "Your technical skills provide strong defense against AI disruption.",
        action: "Continue expanding your technical expertise and stay current with emerging technologies."
      })
    }

    if (profile.remoteWorkPreference === "Fully Remote" || profile.remoteWorkPreference === "Hybrid") {
      newBoosters.push({
        type: "Remote Work Capability",
        impact: "Medium",
        description: "Your remote work flexibility increases job opportunities and geographic mobility.",
        action: "Leverage remote work skills to access global job markets and improve work-life balance."
      })
    }

    if (experienceYears > 5) {
      newBoosters.push({
        type: "Experience Advantage",
        impact: "Medium",
        description: "Your experience provides industry knowledge and professional network benefits.",
        action: "Mentor others and leverage your experience to take on leadership roles."
      })
    }

    // Calculate final score
    score = Math.round((aiRiskScore + industryScore + geographicScore + skillScore + educationBonus) / 5)

    return { score, vulnerabilities: newVulnerabilities, boosters: newBoosters }
  }

  const addSkill = () => {
    if (skillInput.trim() && !userProfile.skills.includes(skillInput.trim())) {
      setUserProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const runImmunityScan = () => {
    if (!userProfile.name || !userProfile.industry || !userProfile.experience) {
      alert("Please fill in the required fields (Name, Industry, Experience)")
      return
    }

    setIsScanning(true)
    setScanComplete(false)
    setImmunityScore(0)

    const interval = setInterval(() => {
      setImmunityScore((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          const { score, vulnerabilities, boosters } = calculateImmunityScore(userProfile)
          setImmunityScore(score)
          setVulnerabilities(vulnerabilities)
          setBoosters(boosters)
          setIsScanning(false)
          setScanComplete(true)
          setActiveTab("results")
          return score
        }
        return prev + Math.random() * 20
      })
    }, 100)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-600"
      case "Medium": return "bg-yellow-600"
      case "Low": return "bg-green-600"
      default: return "bg-gray-600"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-green-600"
      case "Medium": return "bg-blue-600"
      case "Low": return "bg-purple-600"
      default: return "bg-gray-600"
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-blue-400 mr-3" />
          <h1 className="text-4xl font-bold text-white">Career Immunity Score</h1>
        </div>
        <p className="text-xl text-gray-300">
          Quantify your professional resilience against career disruptions and market changes
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="results" disabled={!scanComplete}>Results</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-6">
          <Card className="bg-black/50 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-400" />
                Professional Profile
              </CardTitle>
              <CardDescription className="text-gray-300">
                Tell us about your professional background to calculate your career immunity score
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-medium">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Current Role</label>
                  <Input
                    placeholder="e.g., Software Engineer"
                    value={userProfile.currentRole}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, currentRole: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Industry *</label>
                  <Select value={userProfile.industry} onValueChange={(value) => setUserProfile(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Experience Level *</label>
                  <Select value={userProfile.experience} onValueChange={(value) => setUserProfile(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Education Level</label>
                  <Select value={userProfile.education} onValueChange={(value) => setUserProfile(prev => ({ ...prev, education: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Location</label>
                  <Input
                    placeholder="e.g., San Francisco, CA"
                    value={userProfile.location}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Remote Work Preference</label>
                  <Select value={userProfile.remoteWorkPreference} onValueChange={(value) => setUserProfile(prev => ({ ...prev, remoteWorkPreference: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fully Remote">Fully Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="On-site">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Salary Range</label>
                  <Select value={userProfile.salaryRange} onValueChange={(value) => setUserProfile(prev => ({ ...prev, salaryRange: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select salary range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Under $50,000">Under $50,000</SelectItem>
                      <SelectItem value="$50,000 - $75,000">$50,000 - $75,000</SelectItem>
                      <SelectItem value="$75,000 - $100,000">$75,000 - $100,000</SelectItem>
                      <SelectItem value="$100,000 - $150,000">$100,000 - $150,000</SelectItem>
                      <SelectItem value="Over $150,000">Over $150,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Skills</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill (e.g., Python, Project Management)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button onClick={addSkill} className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-600 text-white cursor-pointer" onClick={() => removeSkill(skill)}>
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Career Goals</label>
                <Textarea
                  placeholder="Describe your short-term and long-term career goals..."
                  value={userProfile.careerGoals}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, careerGoals: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  rows={3}
                />
              </div>

              <Button 
                onClick={runImmunityScan} 
                disabled={isScanning} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3"
              >
                {isScanning ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Calculating Immunity Score...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Calculate Career Immunity Score
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {scanComplete && (
            <>
              <Card className="bg-black/50 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-center">Your Career Immunity Score</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`text-6xl font-bold mb-4 ${getScoreColor(immunityScore)}`}>
                    {immunityScore}/100
                  </div>
                  <div className="text-2xl text-white mb-4">
                    {getScoreLabel(immunityScore)}
                  </div>
                  <Progress value={immunityScore} className="w-full h-4 mb-4" />
                  <p className="text-gray-300 mb-6">
                    This score represents your resilience against career disruptions, market changes, and technological shifts.
                  </p>
                </CardContent>
              </Card>

              {vulnerabilities.length > 0 && (
                <Card className="bg-black/50 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2 text-red-400" />
                      Career Vulnerabilities
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Areas where your career may be at risk and recommendations to address them
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {vulnerabilities.map((vulnerability, index) => (
                      <div key={index} className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-semibold">{vulnerability.type}</h3>
                          <Badge className={getSeverityColor(vulnerability.severity)}>
                            {vulnerability.severity} Risk
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-3">{vulnerability.description}</p>
                        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3">
                          <h4 className="text-blue-400 font-medium mb-1">Recommendation</h4>
                          <p className="text-blue-200 text-sm">{vulnerability.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {boosters.length > 0 && (
                <Card className="bg-black/50 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
                      Career Immunity Boosters
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Your strengths and advantages that enhance career resilience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {boosters.map((booster, index) => (
                      <div key={index} className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-semibold">{booster.type}</h3>
                          <Badge className={getImpactColor(booster.impact)}>
                            {booster.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-3">{booster.description}</p>
                        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3">
                          <h4 className="text-green-400 font-medium mb-1">Action</h4>
                          <p className="text-green-200 text-sm">{booster.action}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              <Card className="bg-black/50 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
                      <h4 className="text-blue-400 font-medium mb-2">Immediate Actions (1-3 months)</h4>
                      <ul className="text-blue-200 text-sm space-y-1">
                        <li>• Address high-priority vulnerabilities identified in your assessment</li>
                        <li>• Update your skills profile with current certifications and projects</li>
                        <li>• Network with professionals in your industry to stay informed about trends</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
                      <h4 className="text-purple-400 font-medium mb-2">Medium-term Goals (3-6 months)</h4>
                      <ul className="text-purple-200 text-sm space-y-1">
                        <li>• Develop skills in emerging technologies relevant to your field</li>
                        <li>• Consider additional education or certifications to boost your profile</li>
                        <li>• Build a personal brand or portfolio showcasing your expertise</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                      <h4 className="text-green-400 font-medium mb-2">Long-term Strategy (6-12 months)</h4>
                      <ul className="text-green-200 text-sm space-y-1">
                        <li>• Diversify your skill set to reduce dependency on any single technology</li>
                        <li>• Develop leadership and mentorship capabilities</li>
                        <li>• Create multiple income streams or side projects for additional security</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-4">
                    <Button 
                      onClick={() => setActiveTab("assessment")} 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Retake Assessment
                    </Button>
                    <Button 
                      onClick={() => window.location.href = '/subscription'} 
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      Get Premium Career Coaching
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
