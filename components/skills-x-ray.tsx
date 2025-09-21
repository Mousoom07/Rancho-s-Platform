"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Github, Figma, FileText, Brain, AlertTriangle, TrendingUp, Zap } from "lucide-react"

interface SkillAnalysis {
  name: string
  percentile: number
  source: string
  insight: string
  type: "dark" | "recognized" | "gap"
}

interface ScanStage {
  name: string
  description: string
  duration: number
}

const scanStages: ScanStage[] = [
  { name: "Initializing Scan", description: "Preparing neural networks...", duration: 1000 },
  { name: "GitHub Analysis", description: "Analyzing code patterns and contributions...", duration: 2000 },
  { name: "Design Portfolio Scan", description: "Processing Figma files and design decisions...", duration: 1500 },
  { name: "Document Intelligence", description: "Reading Notion docs and writing samples...", duration: 2000 },
  { name: "Pattern Recognition", description: "Identifying hidden skill signatures...", duration: 1500 },
  { name: "Blind Spot Detection", description: "Mapping knowledge gaps...", duration: 1000 },
  { name: "Generating Report", description: "Compiling skill anatomy...", duration: 1000 },
]

const mockAnalysis: SkillAnalysis[] = [
  {
    name: "Systems Thinking",
    percentile: 92,
    source: "Design Critiques",
    insight: "Your design critiques show exceptional systems thinking - consider pivoting to product management",
    type: "dark",
  },
  {
    name: "Technical Writing",
    percentile: 88,
    source: "GitHub README Files",
    insight: "Your documentation quality is in the top 12% - technical writing could be a lucrative side skill",
    type: "dark",
  },
  {
    name: "Cross-functional Communication",
    percentile: 85,
    source: "Slack/Email Patterns",
    insight: "You excel at translating between technical and business teams",
    type: "dark",
  },
  {
    name: "JavaScript",
    percentile: 78,
    source: "GitHub Commits",
    insight: "Strong foundation with room for advanced patterns",
    type: "recognized",
  },
  {
    name: "Data Visualization",
    percentile: 15,
    source: "Portfolio Analysis",
    insight: "Critical gap - data storytelling is increasingly valuable across all roles",
    type: "gap",
  },
  {
    name: "Machine Learning",
    percentile: 8,
    source: "Code Analysis",
    insight: "Major blind spot - AI literacy is becoming table stakes in most fields",
    type: "gap",
  },
]

export function SkillsXRay() {
  const [isScanning, setIsScanning] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [scanProgress, setScanProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)

  const startScan = () => {
    setIsScanning(true)
    setCurrentStage(0)
    setScanProgress(0)
    setShowResults(false)
    setScanComplete(false)
  }

  useEffect(() => {
    if (!isScanning) return

    const totalDuration = scanStages.reduce((sum, stage) => sum + stage.duration, 0)
    let elapsed = 0

    const runStages = async () => {
      for (let i = 0; i < scanStages.length; i++) {
        setCurrentStage(i)

        const stageDuration = scanStages[i].duration
        const stageStart = Date.now()

        while (Date.now() - stageStart < stageDuration) {
          const stageProgress = (Date.now() - stageStart) / stageDuration
          const overallProgress = ((elapsed + stageProgress * stageDuration) / totalDuration) * 100
          setScanProgress(overallProgress)
          await new Promise((resolve) => setTimeout(resolve, 50))
        }

        elapsed += stageDuration
      }

      setScanProgress(100)
      setScanComplete(true)
      setTimeout(() => {
        setIsScanning(false)
        setShowResults(true)
      }, 1000)
    }

    runStages()
  }, [isScanning])

  const darkSkills = mockAnalysis.filter((skill) => skill.type === "dark")
  const recognizedSkills = mockAnalysis.filter((skill) => skill.type === "recognized")
  const skillGaps = mockAnalysis.filter((skill) => skill.type === "gap")

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Eye className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Skills X-Ray
          </h1>
        </div>
        <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
          AI-powered deep scan of your digital footprint to reveal hidden abilities and critical blind spots
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
            <Github className="w-3 h-3 mr-1" />
            GitHub Analysis
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Figma className="w-3 h-3 mr-1" />
            Design Portfolio
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            <FileText className="w-3 h-3 mr-1" />
            Document Intelligence
          </Badge>
        </div>
      </div>

      {!isScanning && !showResults && (
        <Card className="bg-slate-800/50 border-cyan-500/20 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center gap-2">
              <Brain className="w-6 h-6 text-cyan-400" />
              Ready to Scan Your Skill Anatomy
            </CardTitle>
            <CardDescription className="text-cyan-200">
              We'll analyze your GitHub repos, design files, and documents to reveal your hidden professional DNA
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={startScan}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
            >
              <Eye className="w-5 h-5 mr-2" />
              Begin X-Ray Scan
            </Button>
            <p className="text-sm text-cyan-300 mt-4">Scan takes ~10 seconds • All data processed securely</p>
          </CardContent>
        </Card>
      )}

      {isScanning && (
        <Card className="bg-slate-800/50 border-cyan-500/20 max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center gap-2">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              MRI Scan in Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-cyan-300">{scanStages[currentStage]?.name}</span>
                <span className="text-cyan-400">{Math.round(scanProgress)}%</span>
              </div>
              <Progress value={scanProgress} className="h-3 bg-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                />
              </Progress>
              <p className="text-sm text-cyan-200 text-center">{scanStages[currentStage]?.description}</p>
            </div>

            {/* MRI-style visualization */}
            <div className="relative h-48 bg-slate-900 rounded-lg border border-cyan-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-cyan-400/30 rounded-full relative">
                  <div className="absolute inset-2 border border-cyan-400/20 rounded-full" />
                  <div className="absolute inset-4 border border-cyan-400/10 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Brain className="w-8 h-8 text-cyan-400 animate-pulse" />
                  </div>
                </div>
              </div>
              <div
                className="absolute top-0 left-0 w-full h-1 bg-cyan-400 transition-all duration-300"
                style={{ transform: `translateY(${(scanProgress / 100) * 192}px)` }}
              />
            </div>

            {scanComplete && (
              <div className="text-center">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Scan Complete</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {showResults && (
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-cyan-400" />
                Your Skill Anatomy Report
              </CardTitle>
              <CardDescription className="text-cyan-200">
                Deep analysis of your digital footprint reveals hidden patterns and opportunities
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="dark-skills" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="dark-skills" className="data-[state=active]:bg-cyan-600">
                <Zap className="w-4 h-4 mr-2" />
                Dark Skills ({darkSkills.length})
              </TabsTrigger>
              <TabsTrigger value="recognized" className="data-[state=active]:bg-blue-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Recognized ({recognizedSkills.length})
              </TabsTrigger>
              <TabsTrigger value="blind-spots" className="data-[state=active]:bg-red-600">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Blind Spots ({skillGaps.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dark-skills" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">Hidden Superpowers</h3>
                <p className="text-cyan-200">Valuable abilities you possess but may not recognize</p>
              </div>
              <div className="grid gap-4">
                {darkSkills.map((skill, index) => (
                  <Card key={index} className="bg-slate-800/30 border-cyan-500/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                          {skill.percentile}th percentile
                        </Badge>
                      </div>
                      <p className="text-cyan-200 mb-3">{skill.insight}</p>
                      <div className="flex items-center gap-2 text-sm text-cyan-300">
                        <span>Source:</span>
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                          {skill.source}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recognized" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">Known Strengths</h3>
                <p className="text-blue-200">Skills you're aware of with quantified performance</p>
              </div>
              <div className="grid gap-4">
                {recognizedSkills.map((skill, index) => (
                  <Card key={index} className="bg-slate-800/30 border-blue-500/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {skill.percentile}th percentile
                        </Badge>
                      </div>
                      <p className="text-blue-200 mb-3">{skill.insight}</p>
                      <div className="flex items-center gap-2 text-sm text-blue-300">
                        <span>Source:</span>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                          {skill.source}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blind-spots" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-red-400 mb-2">Critical Gaps</h3>
                <p className="text-red-200">Skills you don't realize you're missing but need for career growth</p>
              </div>
              <div className="grid gap-4">
                {skillGaps.map((skill, index) => (
                  <Card key={index} className="bg-slate-800/30 border-red-500/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                        <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                          {skill.percentile}th percentile
                        </Badge>
                      </div>
                      <p className="text-red-200 mb-3">{skill.insight}</p>
                      <div className="flex items-center gap-2 text-sm text-red-300">
                        <span>Source:</span>
                        <Badge variant="outline" className="border-red-500/30 text-red-300">
                          {skill.source}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-3">Next Steps</h3>
              <p className="text-cyan-200 mb-4">
                Based on your skill anatomy, consider leveraging your dark skills while addressing critical gaps
              </p>
              <Button
                onClick={() => {
                  setShowResults(false)
                  setScanComplete(false)
                }}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                Run New Scan
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
