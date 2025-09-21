"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scan, Camera, AlertTriangle, DollarSign, MapPin, Clock, Users } from "lucide-react"

interface AnalysisResult {
  salaryRange: {
    min: number
    max: number
    confidence: number
  }
  redFlags: Array<{
    type: string
    severity: "low" | "medium" | "high"
    description: string
    position: { x: number; y: number }
  }>
  insights: Array<{
    type: "salary" | "location" | "experience" | "company"
    text: string
    position: { x: number; y: number }
  }>
}

const sampleJobPosting = `Senior Software Engineer - AI/ML
TechCorp Inc. | San Francisco, CA | Full-time

We're looking for a rockstar ninja developer who can work 80+ hours per week in our fast-paced startup environment! Must have 10+ years experience with technologies that have only existed for 3 years.

Requirements:
- PhD in Computer Science (required)
- Expert in Python, JavaScript, Go, Rust, and 15 other languages
- Available 24/7 for urgent fixes
- Willing to work weekends and holidays
- Must relocate to expensive city with no relocation assistance

We offer competitive salary (we'll discuss during final interview), unlimited PTO (that you'll never be able to use), and free pizza on Fridays!

This is an unpaid internship with potential for full-time conversion after 2 years of proving yourself.`

export function JobOfferARScanner() {
  const [jobText, setJobText] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [showSample, setShowSample] = useState(false)

  const analyzeJobPosting = () => {
    setIsScanning(true)

    // Simulate AR scanning delay
    setTimeout(() => {
      const textToAnalyze = jobText || sampleJobPosting

      // AI-powered analysis simulation
      const analysis: AnalysisResult = {
        salaryRange: {
          min: textToAnalyze.includes("Senior") ? 120000 : 80000,
          max: textToAnalyze.includes("Senior") ? 180000 : 120000,
          confidence: textToAnalyze.includes("competitive salary") ? 60 : 85,
        },
        redFlags: [
          {
            type: "Unrealistic Requirements",
            severity: "high",
            description: "10+ years experience with 3-year-old technology",
            position: { x: 20, y: 30 },
          },
          {
            type: "Work-Life Balance",
            severity: "high",
            description: "80+ hour work weeks mentioned",
            position: { x: 60, y: 45 },
          },
          {
            type: "Compensation Red Flag",
            severity: "medium",
            description: "Salary discussion delayed to final interview",
            position: { x: 15, y: 70 },
          },
          {
            type: "Unpaid Work",
            severity: "high",
            description: "Unpaid internship detected",
            position: { x: 75, y: 85 },
          },
        ],
        insights: [
          {
            type: "salary",
            text: "$120K-$180K estimated",
            position: { x: 40, y: 15 },
          },
          {
            type: "location",
            text: "High COL area",
            position: { x: 70, y: 20 },
          },
          {
            type: "experience",
            text: "Unrealistic requirements",
            position: { x: 25, y: 55 },
          },
        ],
      }

      setAnalysis(analysis)
      setIsScanning(false)
    }, 2000)
  }

  const loadSampleJob = () => {
    setJobText(sampleJobPosting)
    setShowSample(true)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-slate-800/50 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Camera className="w-6 h-6" />
            Job Offer AR Scanner
          </CardTitle>
          <p className="text-slate-300">
            Point your "phone" at any job posting to reveal hidden salary ranges and red flags
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={loadSampleJob} variant="outline" className="border-cyan-500/50 bg-transparent">
              Load Sample Job Posting
            </Button>
            <Button
              onClick={analyzeJobPosting}
              disabled={!jobText && !showSample}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              <Scan className="w-4 h-4 mr-2" />
              {isScanning ? "Scanning..." : "Scan Job Posting"}
            </Button>
          </div>

          <Textarea
            placeholder="Paste a job posting here to analyze..."
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            className="min-h-[200px] bg-slate-900/50 border-cyan-500/30 text-slate-200"
          />
        </CardContent>
      </Card>

      {(isScanning || analysis) && (
        <Card className="bg-slate-900/80 border-cyan-500/30 relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-cyan-400">AR Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {isScanning ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <div className="animate-pulse">
                    <Scan className="w-12 h-12 text-cyan-400 mx-auto" />
                  </div>
                  <p className="text-cyan-300">Scanning job posting...</p>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              analysis && (
                <div className="space-y-6">
                  {/* AR Overlay Simulation */}
                  <div className="relative bg-slate-800 p-6 rounded-lg border border-cyan-500/30 min-h-[400px]">
                    <div className="text-sm text-slate-400 mb-4">AR Overlay View:</div>

                    {/* Floating Salary Range */}
                    <div
                      className="absolute bg-green-500/90 text-white px-3 py-2 rounded-lg shadow-lg animate-pulse"
                      style={{
                        left: `${analysis.insights[0].position.x}%`,
                        top: `${analysis.insights[0].position.y}%`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-bold">
                          ₹{(analysis.salaryRange.min / 100000).toFixed(1)}L - ₹
                          {(analysis.salaryRange.max / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <div className="text-xs opacity-80">{analysis.salaryRange.confidence}% confidence</div>
                    </div>

                    {/* Floating Red Flags */}
                    {analysis.redFlags.map((flag, index) => (
                      <div
                        key={index}
                        className={`absolute px-3 py-2 rounded-lg shadow-lg animate-bounce ${
                          flag.severity === "high"
                            ? "bg-red-500/90"
                            : flag.severity === "medium"
                              ? "bg-yellow-500/90"
                              : "bg-orange-500/90"
                        } text-white`}
                        style={{
                          left: `${flag.position.x}%`,
                          top: `${flag.position.y}%`,
                          animationDelay: `${index * 0.2}s`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-semibold text-xs">{flag.type}</span>
                        </div>
                      </div>
                    ))}

                    {/* Floating Insights */}
                    {analysis.insights.slice(1).map((insight, index) => (
                      <div
                        key={index}
                        className="absolute bg-blue-500/90 text-white px-3 py-2 rounded-lg shadow-lg animate-pulse"
                        style={{
                          left: `${insight.position.x}%`,
                          top: `${insight.position.y}%`,
                          animationDelay: `${index * 0.3}s`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {insight.type === "location" && <MapPin className="w-4 h-4" />}
                          {insight.type === "experience" && <Users className="w-4 h-4" />}
                          {insight.type === "company" && <Clock className="w-4 h-4" />}
                          <span className="text-xs font-medium">{insight.text}</span>
                        </div>
                      </div>
                    ))}

                    {/* AR Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-full border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400"></div>
                      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400"></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400"></div>
                    </div>
                  </div>

                  {/* Analysis Summary */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-slate-800/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          Salary Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-green-400">
                            ₹{(analysis.salaryRange.min / 100000).toFixed(1)}L - ₹
                            {(analysis.salaryRange.max / 100000).toFixed(1)}L
                          </div>
                          <div className="text-sm text-slate-400">Confidence: {analysis.salaryRange.confidence}%</div>
                          <p className="text-sm text-slate-300">
                            Based on role level, location, and industry standards
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-red-500/30">
                      <CardHeader>
                        <CardTitle className="text-red-400 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Red Flags Detected
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analysis.redFlags.map((flag, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`${
                                  flag.severity === "high"
                                    ? "border-red-500 text-red-400"
                                    : flag.severity === "medium"
                                      ? "border-yellow-500 text-yellow-400"
                                      : "border-orange-500 text-orange-400"
                                }`}
                              >
                                {flag.severity}
                              </Badge>
                              <span className="text-sm text-slate-300">{flag.description}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
