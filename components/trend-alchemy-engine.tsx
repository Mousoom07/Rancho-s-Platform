"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Zap, Brain, Search, AlertTriangle, Target, Sparkles } from "lucide-react"

interface TrendSignal {
  source: string
  signal: string
  strength: number
  timeframe: string
  category: "emerging" | "declining" | "stable"
}

interface CareerTrend {
  title: string
  futureProofScore: number
  growthPrediction: string
  timeToImpact: string
  signals: TrendSignal[]
  riskLevel: "low" | "medium" | "high"
  description: string
}

const mockSignals: TrendSignal[] = [
  {
    source: "Pre-IPO Job Postings",
    signal: "AI Whisperer roles +400% in stealth startups",
    strength: 95,
    timeframe: "6 months",
    category: "emerging",
  },
  {
    source: "arXiv Research Papers",
    signal: "Quantum-classical hybrid algorithms papers +250%",
    strength: 88,
    timeframe: "8 months",
    category: "emerging",
  },
  {
    source: "Patent Filings",
    signal: "Brain-computer interface patents +180%",
    strength: 82,
    timeframe: "12 months",
    category: "emerging",
  },
  {
    source: "VC Investment Data",
    signal: "Climate adaptation tech funding +320%",
    strength: 91,
    timeframe: "4 months",
    category: "emerging",
  },
  {
    source: "LinkedIn Skill Mentions",
    signal: "Web3 developer mentions -45%",
    strength: 76,
    timeframe: "3 months",
    category: "declining",
  },
  {
    source: "GitHub Repository Activity",
    signal: "Metaverse framework commits -60%",
    strength: 71,
    timeframe: "5 months",
    category: "declining",
  },
]

const mockTrends: CareerTrend[] = [
  {
    title: "AI Whisperer (Explainable AI Trainer)",
    futureProofScore: 94,
    growthPrediction: "300% growth by 2026",
    timeToImpact: "6 months",
    riskLevel: "low",
    description: "Specialists who make AI decisions transparent and trustworthy for enterprise adoption",
    signals: mockSignals.slice(0, 2),
  },
  {
    title: "Quantum-Classical Bridge Engineer",
    futureProofScore: 89,
    growthPrediction: "250% growth by 2026",
    timeToImpact: "8 months",
    riskLevel: "low",
    description: "Engineers who design hybrid systems combining quantum and classical computing",
    signals: mockSignals.slice(1, 3),
  },
  {
    title: "Climate Adaptation Strategist",
    futureProofScore: 87,
    growthPrediction: "280% growth by 2025",
    timeToImpact: "4 months",
    riskLevel: "medium",
    description: "Professionals who help organizations adapt to climate change impacts",
    signals: mockSignals.slice(3, 4),
  },
  {
    title: "Neural Interface Designer",
    futureProofScore: 85,
    growthPrediction: "200% growth by 2027",
    timeToImpact: "12 months",
    riskLevel: "medium",
    description: "Designers creating intuitive brain-computer interface experiences",
    signals: mockSignals.slice(2, 3),
  },
  {
    title: "Web3 Developer",
    futureProofScore: 42,
    growthPrediction: "-45% decline by 2025",
    timeToImpact: "3 months",
    riskLevel: "high",
    description: "Traditional blockchain developers facing market contraction",
    signals: mockSignals.slice(4, 5),
  },
  {
    title: "Metaverse Architect",
    futureProofScore: 38,
    growthPrediction: "-60% decline by 2025",
    timeToImpact: "5 months",
    riskLevel: "high",
    description: "Virtual world designers in oversaturated market",
    signals: mockSignals.slice(5, 6),
  },
]

export function TrendAlchemyEngine() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [selectedTrend, setSelectedTrend] = useState<CareerTrend | null>(null)
  const [activeTab, setActiveTab] = useState("trends")

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const getFutureProofColor = (score: number) => {
    if (score >= 80) return "text-emerald-200"
    if (score >= 60) return "text-yellow-200"
    return "text-red-200"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-emerald-600/30 text-emerald-200 border-2 border-emerald-400/50"
      case "medium":
        return "bg-yellow-600/30 text-yellow-200 border-2 border-yellow-400/50"
      case "high":
        return "bg-red-600/30 text-red-200 border-2 border-red-400/50"
      default:
        return "bg-gray-600/30 text-gray-200 border-2 border-gray-400/50"
    }
  }

  const getSignalIcon = (category: string) => {
    switch (category) {
      case "emerging":
        return <TrendingUp className="w-4 h-4 text-emerald-400" />
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Target className="w-4 h-4 text-yellow-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-violet-400" />
            <h1
              className="text-4xl font-bold bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              Trend Alchemy Engine
            </h1>
            <Sparkles className="w-8 h-8 text-violet-400" />
          </div>
          <p
            className="text-xl text-violet-200 mb-6 font-semibold"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
          >
            Spot career trends 6-12 months before they explode using obscure signal analysis
          </p>

          {/* Scan Button */}
          <Button
            onClick={startScan}
            disabled={isScanning}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            {isScanning ? (
              <>
                <Brain className="w-5 h-5 mr-2 animate-pulse" />
                Analyzing Signals...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Scan Trend Signals
              </>
            )}
          </Button>

          {isScanning && (
            <div className="mt-4 max-w-md mx-auto">
              <Progress value={scanProgress} className="h-2" />
              <p className="text-sm text-violet-300 mt-2">
                Processing {Math.floor(scanProgress * 100)} signals from obscure sources...
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-violet-500/20">
            <TabsTrigger value="trends" className="data-[state=active]:bg-violet-600">
              Career Trends
            </TabsTrigger>
            <TabsTrigger value="signals" className="data-[state=active]:bg-violet-600">
              Raw Signals
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-violet-600">
              Deep Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {mockTrends.map((trend, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-violet-500/20 hover:border-violet-400/40 transition-all cursor-pointer"
                  onClick={() => setSelectedTrend(trend)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getRiskColor(trend.riskLevel)}>{trend.riskLevel.toUpperCase()} RISK</Badge>
                      <span className={`text-2xl font-bold ${getFutureProofColor(trend.futureProofScore)}`}>
                        {trend.futureProofScore}/100
                      </span>
                    </div>
                    <CardTitle className="text-white text-lg">{trend.title}</CardTitle>
                    <CardDescription className="text-violet-200">{trend.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">{trend.growthPrediction}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-300">Impact in {trend.timeToImpact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-violet-400" />
                        <span className="text-violet-300">{trend.signals.length} signals detected</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="signals" className="mt-6">
            <div className="grid gap-4">
              {mockSignals.map((signal, index) => (
                <Card key={index} className="bg-slate-800/50 border-violet-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getSignalIcon(signal.category)}
                        <div>
                          <p className="text-white font-semibold">{signal.signal}</p>
                          <p className="text-sm text-violet-300">Source: {signal.source}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-violet-400">{signal.strength}%</div>
                        <div className="text-sm text-violet-300">{signal.timeframe}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            {selectedTrend ? (
              <Card className="bg-slate-800/50 border-violet-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{selectedTrend.title}</CardTitle>
                  <CardDescription className="text-violet-200 text-lg">Deep Analysis & Recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Future-Proof Score</h3>
                      <div className="flex items-center gap-3">
                        <Progress value={selectedTrend.futureProofScore} className="flex-1" />
                        <span className={`text-2xl font-bold ${getFutureProofColor(selectedTrend.futureProofScore)}`}>
                          {selectedTrend.futureProofScore}/100
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Risk Assessment</h3>
                      <Badge className={getRiskColor(selectedTrend.riskLevel)}>
                        {selectedTrend.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Supporting Signals</h3>
                    <div className="space-y-3">
                      {selectedTrend.signals.map((signal, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getSignalIcon(signal.category)}
                            <div>
                              <p className="text-white">{signal.signal}</p>
                              <p className="text-sm text-violet-300">{signal.source}</p>
                            </div>
                          </div>
                          <div className="text-violet-400 font-semibold">{signal.strength}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">AI Model Insights</h3>
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <p className="text-violet-200 mb-2">
                        <strong>BERT + LSTM Analysis:</strong> Temporal patterns show accelerating demand
                      </p>
                      <p className="text-violet-200 mb-2">
                        <strong>Unsupervised Clustering:</strong> Identified 3 hidden skill clusters
                      </p>
                      <p className="text-violet-200">
                        <strong>SHAP Values:</strong> Patent filings (0.34), VC funding (0.28), job postings (0.22)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800/50 border-violet-500/20">
                <CardContent className="p-8 text-center">
                  <Brain className="w-16 h-16 text-violet-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Career Trend</h3>
                  <p className="text-violet-300">
                    Click on any trend from the "Career Trends" tab to see detailed analysis
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
