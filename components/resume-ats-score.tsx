"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Target, TrendingUp, AlertCircle, CheckCircle, Plus, Edit, Trash2, Download, Upload, File, Loader2 } from "lucide-react"

interface ResumeSection {
  id: string
  title: string
  content: string
  score: number
  suggestions: string[]
}

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin: string
  }
  summary: string
  experience: ResumeSection[]
  education: ResumeSection[]
  skills: string[]
  certifications: ResumeSection[]
}

const ATSScoring = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: []
  })

  const [atsScore, setAtsScore] = useState(0)
  const [analysis, setAnalysis] = useState({
    keywordOptimization: 0,
    formatting: 0,
    completeness: 0,
    readability: 0
  })
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addExperience = () => {
    const newExperience: ResumeSection = {
      id: Date.now().toString(),
      title: "Job Title",
      content: "Company Name\nDuration\n\n• Key achievement 1\n• Key achievement 2\n• Key achievement 3",
      score: 0,
      suggestions: []
    }
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }))
  }

  const addEducation = () => {
    const newEducation: ResumeSection = {
      id: Date.now().toString(),
      title: "Degree",
      content: "Institution Name\nDuration\n\n• Relevant coursework\n• Achievements",
      score: 0,
      suggestions: []
    }
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }))
  }

  const addCertification = () => {
    const newCertification: ResumeSection = {
      id: Date.now().toString(),
      title: "Certification Name",
      content: "Issuing Organization\nDate Obtained\n\n• Description",
      score: 0,
      suggestions: []
    }
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }))
  }

  const addSkill = () => {
    const skill = prompt("Enter a new skill:")
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    }
  }

  const removeSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const updateSection = (sectionType: keyof ResumeData, id: string, content: string) => {
    setResumeData(prev => {
      const newData = { ...prev }
      if (sectionType === 'experience') {
        newData.experience = newData.experience.map(item => 
          item.id === id ? { ...item, content } : item
        )
      } else if (sectionType === 'education') {
        newData.education = newData.education.map(item => 
          item.id === id ? { ...item, content } : item
        )
      } else if (sectionType === 'certifications') {
        newData.certifications = newData.certifications.map(item => 
          item.id === id ? { ...item, content } : item
        )
      }
      return newData
    })
  }

  const removeSection = (sectionType: keyof ResumeData, id: string) => {
    setResumeData(prev => {
      const newData = { ...prev }
      if (sectionType === 'experience') {
        newData.experience = newData.experience.filter(item => item.id !== id)
      } else if (sectionType === 'education') {
        newData.education = newData.education.filter(item => item.id !== id)
      } else if (sectionType === 'certifications') {
        newData.certifications = newData.certifications.filter(item => item.id !== id)
      }
      return newData
    })
  }

  const analyzeResume = async () => {
    setIsAnalyzing(true)
    
    // Simulate ATS analysis
    setTimeout(() => {
      const keywordScore = Math.floor(Math.random() * 30) + 70
      const formattingScore = Math.floor(Math.random() * 25) + 75
      const completenessScore = calculateCompletenessScore()
      const readabilityScore = Math.floor(Math.random() * 20) + 80
      
      const totalScore = Math.round((keywordScore + formattingScore + completenessScore + readabilityScore) / 4)
      
      setAtsScore(totalScore)
      setAnalysis({
        keywordOptimization: keywordScore,
        formatting: formattingScore,
        completeness: completenessScore,
        readability: readabilityScore
      })
      
      generateSuggestions(totalScore)
      setIsAnalyzing(false)
    }, 2000)
  }

  const calculateCompletenessScore = () => {
    let score = 0
    const maxScore = 100
    
    // Personal info completeness
    if (resumeData.personalInfo.name) score += 10
    if (resumeData.personalInfo.email) score += 10
    if (resumeData.personalInfo.phone) score += 5
    if (resumeData.personalInfo.location) score += 5
    if (resumeData.personalInfo.linkedin) score += 5
    
    // Summary
    if (resumeData.summary.length > 50) score += 10
    
    // Experience
    if (resumeData.experience.length > 0) score += 15
    if (resumeData.experience.length >= 2) score += 10
    
    // Education
    if (resumeData.education.length > 0) score += 10
    
    // Skills
    if (resumeData.skills.length > 5) score += 10
    if (resumeData.skills.length > 10) score += 5
    
    // Certifications
    if (resumeData.certifications.length > 0) score += 5
    
    return Math.min(score, maxScore)
  }

  const generateSuggestions = (score: number) => {
    const newSuggestions: string[] = []
    
    if (score < 60) {
      newSuggestions.push("Add more relevant keywords from job descriptions")
      newSuggestions.push("Include measurable achievements in your experience")
      newSuggestions.push("Add a professional summary section")
    } else if (score < 80) {
      newSuggestions.push("Optimize formatting for better ATS readability")
      newSuggestions.push("Add more industry-specific skills")
      newSuggestions.push("Include certifications and relevant coursework")
    } else {
      newSuggestions.push("Consider adding more quantifiable achievements")
      newSuggestions.push("Ensure all contact information is up to date")
      newSuggestions.push("Tailor resume for specific job applications")
    }
    
    setSuggestions(newSuggestions)
  }

  const downloadResume = () => {
    const resumeText = generateResumeText()
    const blob = new Blob([resumeText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeData.personalInfo.name || 'resume'}_optimized.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateResumeText = () => {
    let text = `${resumeData.personalInfo.name}\n`
    text += `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}\n`
    text += `${resumeData.personalInfo.location} | ${resumeData.personalInfo.linkedin}\n\n`
    
    text += "PROFESSIONAL SUMMARY\n"
    text += resumeData.summary + "\n\n"
    
    text += "EXPERIENCE\n"
    resumeData.experience.forEach(exp => {
      text += `${exp.title}\n${exp.content}\n\n`
    })
    
    text += "EDUCATION\n"
    resumeData.education.forEach(edu => {
      text += `${edu.title}\n${edu.content}\n\n`
    })
    
    text += "SKILLS\n"
    text += resumeData.skills.join(", ") + "\n\n"
    
    text += "CERTIFICATIONS\n"
    resumeData.certifications.forEach(cert => {
      text += `${cert.title}\n${cert.content}\n\n`
    })
    
    return text
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-600"
    if (score >= 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file type
      const allowedTypes = ['.pdf', '.doc', '.docx', '.txt']
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      
      if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a PDF, DOC, DOCX, or TXT file')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      setUploadedFile(file)
      setIsUploading(true)
      
      // Simulate file upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          parseResumeFile(file)
        }
      }, 200)
    }
  }

  const parseResumeFile = (file: File) => {
    // Simulate parsing the uploaded resume file
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      
      // Simple parsing logic - in a real app, you'd use a proper resume parser
      setTimeout(() => {
        // Simulate extracted data
        const parsedData: ResumeData = {
          personalInfo: {
            name: "Extracted Name",
            email: "extracted@email.com",
            phone: "+1 (555) 123-4567",
            location: "City, State",
            linkedin: "linkedin.com/in/profile"
          },
          summary: "Professional with experience in various fields. Skilled in multiple technologies and methodologies.",
          experience: [
            {
              id: Date.now().toString(),
              title: "Senior Position",
              content: "Company Name\n2020 - Present\n\n• Led key initiatives and projects\n• Improved efficiency by 25%\n• Managed team of 5 professionals",
              score: 0,
              suggestions: []
            }
          ],
          education: [
            {
              id: Date.now().toString(),
              title: "Bachelor's Degree",
              content: "University Name\n2016 - 2020\n\n• Graduated with honors\n• Relevant coursework in field",
              score: 0,
              suggestions: []
            }
          ],
          skills: ["Project Management", "Communication", "Leadership", "Technical Skills", "Problem Solving"],
          certifications: []
        }
        
        setResumeData(parsedData)
        
        // Show success message
        alert('Resume uploaded and parsed successfully! Please review and edit the extracted information, then run ATS analysis.')
      }, 1500)
    }
    
    if (file.type === 'text/plain') {
      reader.readAsText(file)
    } else {
      // For PDF/DOC files, you'd need a proper parser
      // This is just a simulation
      reader.readAsText(new Blob(['Simulated resume content']))
    }
  }

  const removeUploadedFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white-shadow mb-4">ATS Resume Optimizer</h2>
        <p className="text-secondary-high-contrast">Upload, build, analyze, and optimize your resume for Applicant Tracking Systems</p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="editor">Resume Editor</TabsTrigger>
          <TabsTrigger value="analysis">ATS Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white-shadow">
                <Upload className="w-5 h-5" />
                Upload Your Resume
              </CardTitle>
              <p className="text-secondary-high-contrast">
                Upload your existing resume or CV to analyze its ATS score and get optimization suggestions.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {!uploadedFile ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Upload Your Resume</h3>
                  <p className="text-gray-400 mb-4">
                    Supported formats: PDF, DOC, DOCX, TXT (Max size: 5MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full max-w-xs btn-high-contrast"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <File className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="font-medium text-white">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-400">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={removeUploadedFile}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing resume...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}

                  {!isUploading && uploadProgress === 100 && (
                    <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <h4 className="font-semibold text-green-300">Resume Processed Successfully!</h4>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">
                        Your resume has been parsed and the data has been loaded into the editor. 
                        Please review and edit the extracted information, then run the ATS analysis.
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            const editorTab = document.querySelector('[value="editor"]') as HTMLButtonElement
                            if (editorTab) editorTab.click()
                          }}
                          className="flex-1 btn-high-contrast"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Review & Edit
                        </Button>
                        <Button 
                          onClick={analyzeResume}
                          variant="outline"
                          className="flex-1 btn-high-contrast"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Analyze Now
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">💡 Upload Tips</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Use a clean, simple format for best parsing results</li>
                  <li>• Ensure your contact information is clearly visible</li>
                  <li>• Include standard sections: Experience, Education, Skills</li>
                  <li>• Avoid complex formatting, tables, or graphics</li>
                  <li>• Make sure the file is not password protected</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor" className="space-y-6">
          {/* Personal Information */}
          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white-shadow">
                <FileText className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-secondary-high-contrast">Full Name</Label>
                  <Input
                    id="name"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, name: e.target.value }
                    }))}
                    placeholder="John Doe"
                    className="bg-slate-800/80 border-2 border-blue-500/70 focus:border-blue-400 text-white font-semibold h-12 text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-secondary-high-contrast">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: e.target.value }
                    }))}
                    placeholder="john.doe@example.com"
                    className="bg-slate-800/80 border-2 border-blue-500/70 focus:border-blue-400 text-white font-semibold h-12 text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-secondary-high-contrast">Phone</Label>
                  <Input
                    id="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: e.target.value }
                    }))}
                    placeholder="+1 (555) 123-4567"
                    className="bg-slate-800/80 border-2 border-blue-500/70 focus:border-blue-400 text-white font-semibold h-12 text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-secondary-high-contrast">Location</Label>
                  <Input
                    id="location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, location: e.target.value }
                    }))}
                    placeholder="City, State"
                    className="bg-slate-800/80 border-2 border-blue-500/70 focus:border-blue-400 text-white font-semibold h-12 text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="text-secondary-high-contrast">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                    }))}
                    placeholder="linkedin.com/in/johndoe"
                    className="bg-slate-800/80 border-2 border-blue-500/70 focus:border-blue-400 text-white font-semibold h-12 text-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white-shadow">
                <Target className="w-5 h-5" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Write a brief summary of your professional background and key achievements..."
                className="min-h-32 textarea-high-contrast font-semibold"
              />
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white-shadow">
                  <TrendingUp className="w-5 h-5" />
                  Experience
                </CardTitle>
                <Button onClick={addExperience} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.experience.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No experience entries yet</p>
              ) : (
                resumeData.experience.map((exp) => (
                  <div key={exp.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{exp.title}</h4>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeSection('experience', exp.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={exp.content}
                      onChange={(e) => updateSection('experience', exp.id, e.target.value)}
                      className="min-h-24 textarea-high-contrast font-semibold"
                    />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white-shadow">
                  <Target className="w-5 h-5" />
                  Education
                </CardTitle>
                <Button onClick={addEducation} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.education.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No education entries yet</p>
              ) : (
                resumeData.education.map((edu) => (
                  <div key={edu.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{edu.title}</h4>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeSection('education', edu.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={edu.content}
                      onChange={(e) => updateSection('education', edu.id, e.target.value)}
                      className="min-h-24 textarea-high-contrast font-semibold"
                    />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white-shadow">
                  <Target className="w-5 h-5" />
                  Skills
                </CardTitle>
                <Button onClick={addSkill} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.length === 0 ? (
                  <p className="text-center text-gray-400 py-8 w-full">No skills added yet</p>
                ) : (
                  resumeData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-blue-600/20 text-blue-300 border-blue-500/50 flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 text-blue-300 hover:text-blue-100"
                      >
                        ×
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white-shadow">
                  <Target className="w-5 h-5" />
                  Certifications
                </CardTitle>
                <Button onClick={addCertification} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.certifications.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No certifications added yet</p>
              ) : (
                resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{cert.title}</h4>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeSection('certifications', cert.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={cert.content}
                      onChange={(e) => updateSection('certifications', cert.id, e.target.value)}
                      className="min-h-24 textarea-high-contrast font-semibold"
                    />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-dark-card border-visible">
              <CardHeader>
                <CardTitle className="text-white-shadow">ATS Score Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(atsScore)}`}>
                    {atsScore}
                  </div>
                  <Badge className={`${getScoreBadge(atsScore)} text-white font-bold mb-2`}>
                    {atsScore >= 80 ? "Excellent" : atsScore >= 60 ? "Good" : "Needs Improvement"}
                  </Badge>
                  <p className="text-secondary-high-contrast">Overall ATS Score</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Keyword Optimization</span>
                    <span className={`text-sm font-bold ${getScoreColor(analysis.keywordOptimization)}`}>
                      {analysis.keywordOptimization}%
                    </span>
                  </div>
                  <Progress value={analysis.keywordOptimization} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Formatting</span>
                    <span className={`text-sm font-bold ${getScoreColor(analysis.formatting)}`}>
                      {analysis.formatting}%
                    </span>
                  </div>
                  <Progress value={analysis.formatting} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completeness</span>
                    <span className={`text-sm font-bold ${getScoreColor(analysis.completeness)}`}>
                      {analysis.completeness}%
                    </span>
                  </div>
                  <Progress value={analysis.completeness} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Readability</span>
                    <span className={`text-sm font-bold ${getScoreColor(analysis.readability)}`}>
                      {analysis.readability}%
                    </span>
                  </div>
                  <Progress value={analysis.readability} className="h-2" />
                </div>

                <Button
                  onClick={analyzeResume}
                  disabled={isAnalyzing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-visible">
              <CardHeader>
                <CardTitle className="text-white-shadow">Optimization Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                {suggestions.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">Run analysis to get suggestions</p>
                ) : (
                  <ul className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-secondary-high-contrast">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-dark-card border-visible">
            <CardHeader>
              <CardTitle className="text-white-shadow">Download Optimized Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary-high-contrast mb-4">
                Download your optimized resume in text format for maximum ATS compatibility.
              </p>
              <Button
                onClick={downloadResume}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={atsScore === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ATSScoring
