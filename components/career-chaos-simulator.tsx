"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Brain, Target, Shield, TrendingUp, Zap } from "lucide-react"

interface SimulationResult {
  automationRisk: number
  timeToDisruption: number
  blackSwanEvents: BlackSwanEvent[]
  pivotSuggestions: PivotSuggestion[]
  confidenceInterval: [number, number]
}

interface BlackSwanEvent {
  event: string
  probability: number
  impact: number
  timeframe: string
}

interface PivotSuggestion {
  from: string
  to: string
  viabilityScore: number
  timeToTransition: string
  keySkills: string[]
  reasoning: string
}

interface SurvivalChallenge {
  currentScenario: number
  score: number
  lives: number
  streak: number
  gameStatus: "playing" | "won" | "lost"
  selectedChoice: number | null
  showFeedback: boolean
}

interface Scenario {
  id: number
  title: string
  description: string
  choices: {
    id: number
    text: string
    outcome: string
    scoreImpact: number
    lifeImpact: number
    reasoning: string
  }[]
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "The AI Takeover",
    description: "Your company just announced they're replacing 40% of the workforce with AI. What do you do?",
    choices: [
      {
        id: 1,
        text: "Panic and start applying for jobs everywhere",
        outcome: "You spread yourself too thin and miss opportunities. Your stress levels skyrocket.",
        scoreImpact: -10,
        lifeImpact: -1,
        reasoning: "Reactive behavior without strategy leads to poor decision making."
      },
      {
        id: 2,
        text: "Learn to work with AI and become an AI trainer",
        outcome: "You adapt quickly and become valuable in the new AI-powered workplace.",
        scoreImpact: +20,
        lifeImpact: 0,
        reasoning: "Embracing change and developing relevant skills is the best strategy."
      },
      {
        id: 3,
        text: "Start a union to protect workers' rights",
        outcome: "You gain respect but face corporate pushback. The battle is just beginning.",
        scoreImpact: +5,
        lifeImpact: -1,
        reasoning: "Standing up for others is noble but comes with personal risk."
      }
    ]
  },
  {
    id: 2,
    title: "The Industry Collapse",
    description: "Your entire industry is facing disruption due to new technology. Your skills are becoming obsolete.",
    choices: [
      {
        id: 1,
        text: "Double down on your current expertise",
        outcome: "You become the last expert in a dying field. Short-term gain, long-term pain.",
        scoreImpact: -15,
        lifeImpact: -1,
        reasoning: "Failing to adapt to technological change leads to career stagnation."
      },
      {
        id: 2,
        text: "Pivot to a complementary emerging field",
        outcome: "Your existing experience gives you an edge in the new field. Smooth transition.",
        scoreImpact: +25,
        lifeImpact: +1,
        reasoning: "Strategic pivots leverage existing experience while building new skills."
      },
      {
        id: 3,
        text: "Go back to school for a completely different career",
        outcome: "You start fresh but lose all your seniority. It's a tough reset.",
        scoreImpact: +10,
        lifeImpact: -2,
        reasoning: "Career resets are expensive and time-consuming but sometimes necessary."
      }
    ]
  },
  {
    id: 3,
    title: "The Remote Work Revolution",
    description: "Your company mandates full-time office return, but the industry is moving remote.",
    choices: [
      {
        id: 1,
        text: "Comply and return to office",
        outcome: "You keep your job but miss out on remote opportunities. Career growth stalls.",
        scoreImpact: -5,
        lifeImpact: 0,
        reasoning: "Following orders without considering industry trends limits growth."
      },
      {
        id: 2,
        text: "Negotiate hybrid arrangement",
        outcome: "You find middle ground and maintain flexibility while keeping your position.",
        scoreImpact: +15,
        lifeImpact: +1,
        reasoning: "Negotiation and compromise often yield the best results."
      },
      {
        id: 3,
        text: "Quit and find a remote-only job",
        outcome: "You take a risk but land in a better position with more flexibility.",
        scoreImpact: +20,
        lifeImpact: -1,
        reasoning: "Sometimes taking calculated risks leads to better opportunities."
      }
    ]
  }
]

function CareerSurvivalChallenge({ challenge, setChallenge }: { 
  challenge: SurvivalChallenge
  setChallenge: React.Dispatch<React.SetStateAction<SurvivalChallenge>>
}) {
  const currentScenario = scenarios[challenge.currentScenario]

  const handleChoice = (choiceId: number) => {
    const choice = currentScenario.choices.find(c => c.id === choiceId)
    if (!choice) return

    const newScore = Math.max(0, challenge.score + choice.scoreImpact)
    const newLives = Math.max(0, challenge.lives + choice.lifeImpact)
    const newStreak = choice.scoreImpact > 0 ? challenge.streak + 1 : 0
    
    let gameStatus: "playing" | "won" | "lost" = "playing"
    if (newLives === 0) gameStatus = "lost"
    else if (challenge.currentScenario === scenarios.length - 1) gameStatus = "won"

    setChallenge({
      ...challenge,
      selectedChoice: choiceId,
      showFeedback: true,
      score: newScore,
      lives: newLives,
      streak: newStreak,
      gameStatus
    })

    if (gameStatus === "playing") {
      setTimeout(() => {
        setChallenge(prev => ({
          ...prev,
          currentScenario: prev.currentScenario + 1,
          selectedChoice: null,
          showFeedback: false
        }))
      }, 3000)
    }
  }

  const resetGame = () => {
    setChallenge({
      currentScenario: 0,
      score: 0,
      lives: 3,
      streak: 0,
      gameStatus: "playing",
      selectedChoice: null,
      showFeedback: false
    })
  }

  if (challenge.gameStatus === "won") {
    return (
      <Card className="bg-gradient-to-br from-green-900/80 to-green-700/80 border-2 border-green-400/70 shadow-2xl">
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-3xl font-bold text-green-300 mb-4 font-rancho">CAREER SURVIVOR!</h3>
          <p className="text-green-200 text-lg mb-6 font-rancho">You've successfully navigated the career chaos!</p>
          <div className="space-y-2 mb-8">
            <p className="text-green-200 font-semibold">Final Score: {challenge.score}</p>
            <p className="text-green-200 font-semibold">Lives Remaining: {challenge.lives}</p>
            <p className="text-green-200 font-semibold">Best Streak: {challenge.streak}</p>
          </div>
          <Button 
            onClick={resetGame}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 text-lg"
          >
            Play Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (challenge.gameStatus === "lost") {
    return (
      <Card className="bg-gradient-to-br from-red-900/80 to-red-700/80 border-2 border-red-400/70 shadow-2xl">
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">💀</div>
          <h3 className="text-3xl font-bold text-red-300 mb-4 font-rancho">CAREER TERMINATED</h3>
          <p className="text-red-200 text-lg mb-6 font-rancho">Your career couldn't survive the chaos...</p>
          <div className="space-y-2 mb-8">
            <p className="text-red-200 font-semibold">Final Score: {challenge.score}</p>
            <p className="text-red-200 font-semibold">Scenarios Completed: {challenge.currentScenario + 1}</p>
            <p className="text-red-200 font-semibold">Best Streak: {challenge.streak}</p>
          </div>
          <Button 
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  const selectedChoiceData = challenge.selectedChoice 
    ? currentScenario.choices.find(c => c.id === challenge.selectedChoice)
    : null

  return (
    <Card className="bg-gradient-to-br from-purple-900/80 to-purple-700/80 border-2 border-purple-400/70 shadow-2xl">
      <CardHeader className="bg-purple-800/50">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-purple-600/50 px-3 py-1 rounded-lg">
              <span className="text-purple-200 font-semibold">Score: {challenge.score}</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} className={`text-xl ${i < challenge.lives ? 'text-red-400' : 'text-gray-600'}`}>
                  ❤️
                </span>
              ))}
            </div>
            <div className="bg-purple-600/50 px-3 py-1 rounded-lg">
              <span className="text-purple-200 font-semibold">Streak: {challenge.streak}</span>
            </div>
          </div>
          <div className="bg-purple-600/50 px-3 py-1 rounded-lg">
            <span className="text-purple-200 font-semibold">
              Scenario {challenge.currentScenario + 1}/{scenarios.length}
            </span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-purple-300 font-rancho">
          {currentScenario.title}
        </CardTitle>
        <CardDescription className="text-purple-200 text-lg font-rancho">
          {currentScenario.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {challenge.showFeedback && selectedChoiceData ? (
          <div className="space-y-4">
            <div className="bg-purple-800/50 p-6 rounded-lg border-2 border-purple-500/50">
              <h4 className="text-lg font-bold text-purple-300 mb-2 font-rancho">Outcome</h4>
              <p className="text-purple-200 mb-4 font-rancho">
                {selectedChoiceData.outcome}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-purple-700/50 p-3 rounded">
                  <span className="text-purple-300 font-semibold">Score Impact: </span>
                  <span className={selectedChoiceData.scoreImpact > 0 ? 'text-green-400' : 'text-red-400'}>
                    {selectedChoiceData.scoreImpact > 0 ? '+' : ''}
                    {selectedChoiceData.scoreImpact}
                  </span>
                </div>
                <div className="bg-purple-700/50 p-3 rounded">
                  <span className="text-purple-300 font-semibold">Life Impact: </span>
                  <span className={selectedChoiceData.lifeImpact >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {selectedChoiceData.lifeImpact >= 0 ? '+' : ''}
                    {selectedChoiceData.lifeImpact}
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-900/50 rounded border border-purple-600/50">
                <p className="text-purple-300 text-sm font-rancho">
                  💡 {selectedChoiceData.reasoning}
                </p>
              </div>
            </div>
            <div className="text-center text-purple-300 animate-pulse font-rancho">
              Next scenario loading...
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {currentScenario.choices.map((choice) => (
              <Button
                key={choice.id}
                onClick={() => handleChoice(choice.id)}
                className="w-full bg-purple-700/60 hover:bg-purple-600/70 text-purple-100 text-left justify-start p-6 h-auto border-2 border-purple-500/50 transition-all duration-200 hover:border-purple-400/70"
              >
                <div className="text-lg font-rancho">{choice.text}</div>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function CareerChaosSimulator() {
  const [currentRole, setCurrentRole] = useState("")
  const [experience, setExperience] = useState("")
  const [industry, setIndustry] = useState("")
  const [isSimulating, setIsSimulating] = useState(false)
  const [results, setResults] = useState<SimulationResult | null>(null)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [mode, setMode] = useState<"simulation" | "challenge">("simulation")
  const [challenge, setChallenge] = useState<SurvivalChallenge>({
    currentScenario: 0,
    score: 0,
    lives: 3,
    streak: 0,
    gameStatus: "playing",
    selectedChoice: null,
    showFeedback: false
  })

  const runMonteCarloSimulation = async (role: string, exp: string, ind: string): Promise<SimulationResult> => {
    const iterations = 10000
    const automationRisks: number[] = []

    for (let i = 0; i < iterations; i++) {
      const baseRisk = getBaseAutomationRisk(role, ind)
      const experienceModifier = Math.max(0.1, 1 - Number.parseInt(exp) * 0.05)
      const randomFactor = Math.random() * 0.3 - 0.15
      const risk = Math.min(0.95, Math.max(0.05, baseRisk * experienceModifier + randomFactor))
      automationRisks.push(risk)
    }

    const avgRisk = automationRisks.reduce((a, b) => a + b, 0) / iterations
    const sortedRisks = automationRisks.sort((a, b) => a - b)
    const confidenceInterval: [number, number] = [
      sortedRisks[Math.floor(iterations * 0.05)],
      sortedRisks[Math.floor(iterations * 0.95)],
    ]

    return {
      automationRisk: avgRisk,
      timeToDisruption: calculateTimeToDisruption(avgRisk),
      blackSwanEvents: generateBlackSwanEvents(role, ind),
      pivotSuggestions: generatePivotSuggestions(role, ind, avgRisk),
      confidenceInterval,
    }
  }

  const getBaseAutomationRisk = (role: string, industry: string): number => {
    const roleRisks: Record<string, number> = {
      "data entry": 0.85,
      cashier: 0.8,
      driver: 0.75,
      accountant: 0.7,
      lawyer: 0.45,
      teacher: 0.35,
      nurse: 0.25,
      therapist: 0.2,
      artist: 0.3,
      engineer: 0.4,
      manager: 0.35,
      salesperson: 0.5,
      marketing: 0.55,
      developer: 0.45,
      designer: 0.4,
    }

    const industryModifiers: Record<string, number> = {
      tech: 0.9,
      healthcare: 0.7,
      education: 0.6,
      finance: 1.1,
      retail: 1.2,
      manufacturing: 1.3,
      creative: 0.8,
    }

    const baseRisk = roleRisks[role.toLowerCase()] || 0.5
    const modifier = industryModifiers[industry.toLowerCase()] || 1.0
    return Math.min(0.95, baseRisk * modifier)
  }

  const calculateTimeToDisruption = (risk: number): number => {
    return Math.round(2030 - risk * 8)
  }

  const generateBlackSwanEvents = (role: string, industry: string): BlackSwanEvent[] => {
    const events = [
      {
        event: "The 2026 AI Layoffs",
        probability: 0.35,
        impact: 0.95,
        timeframe: "2026-2027",
      },
      {
        event: "The Climate Career Boom",
        probability: 0.45,
        impact: 0.8,
        timeframe: "2025-2030",
      },
      {
        event: "The Web3 Collapse",
        probability: 0.25,
        impact: 0.7,
        timeframe: "2024-2025",
      },
    ]

    return events.filter(() => Math.random() > 0.3)
  }

  const generatePivotSuggestions = (role: string, industry: string, risk: number): PivotSuggestion[] => {
    const pivots: PivotSuggestion[] = [
      {
        from: role,
        to: "AI Prompt Engineer",
        viabilityScore: 0.85,
        timeToTransition: "6-12 months",
        keySkills: ["Natural Language Processing", "AI Model Training", "Creative Writing"],
        reasoning: "High demand for human-AI collaboration specialists",
      },
    ]

    return pivots.sort((a, b) => b.viabilityScore - a.viabilityScore).slice(0, 3)
  }

  const handleSimulation = async () => {
    if (!currentRole || !experience || !industry) return

    setIsSimulating(true)
    setSimulationProgress(0)

    const progressInterval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      const simulationResults = await runMonteCarloSimulation(currentRole, experience, industry)
      setResults(simulationResults)
      setSimulationProgress(100)
    } catch (error) {
      console.error("Simulation failed:", error)
    } finally {
      setTimeout(() => {
        setIsSimulating(false)
        clearInterval(progressInterval)
      }, 500)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl break-words overflow-wrap-anywhere relative bg-transparent">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(45deg, #333 25%, transparent 25%), 
            linear-gradient(-45deg, #333 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #333 75%), 
            linear-gradient(-45deg, transparent 75%, #333 75%)
          `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        ></div>
      </div>

      <div className="text-center mb-8 relative z-10">
        <div className="hidden"></div>
        <div className="relative z-10 p-16">
          <div className="bg-black/60 rounded-2xl p-10 mb-8 border-3 border-yellow-400/70 shadow-inner">
            <h1
              className="text-6xl font-bold text-yellow-400 mb-8 leading-tight px-4 font-rancho"
              style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.8)" }}
            >
              ⚡ CAREER CHAOS SIMULATOR ⚡
            </h1>
            <div
              className="text-3xl text-yellow-300 font-bold mb-8 tracking-wide bg-black/40 rounded-xl p-6 mx-auto max-w-4xl font-rancho"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              STRESS TEST YOUR CAREER PATH
            </div>
          </div>

          <div className="bg-black/60 rounded-2xl p-8 mb-8 border-3 border-gray-400/60 shadow-inner">
            <p
              className="text-2xl text-gray-50 max-w-4xl mx-auto leading-relaxed font-semibold px-4 font-rancho"
              style={{ textShadow: "4px 4px 8px rgba(0,0,0,0.9)" }}
            >
              Brace for impact. Black swan events are coming. Will your career survive the chaos?
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-700/90 to-orange-700/90 border-4 border-red-300/90 rounded-2xl p-10 max-w-5xl mx-auto backdrop-blur-sm shadow-2xl">
            <div className="flex items-center justify-center gap-6 text-red-100 mb-6">
              <AlertTriangle className="w-10 h-10 text-red-200 animate-pulse" />
              <span
                className="font-bold text-3xl bg-black/40 px-6 py-3 rounded-xl border-2 border-red-300/50 font-rancho"
                style={{ textShadow: "4px 4px 8px rgba(0,0,0,0.9)" }}
              >
                SIMULATION SCENARIOS ACTIVE
              </span>
              <AlertTriangle className="w-10 h-10 text-red-200 animate-pulse" />
            </div>
            <div
              className="text-center text-red-100 text-xl font-bold bg-black/50 rounded-xl p-6 border-3 border-red-300/60 shadow-inner font-rancho"
              style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.9)" }}
            >
              The 2026 AI Layoffs • The Climate Career Boom • The Web3 Collapse
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Button
          onClick={() => setMode("simulation")}
          variant={mode === "simulation" ? "default" : "outline"}
          className={
            mode === "simulation"
              ? "bg-red-600 hover:bg-red-700 text-white font-semibold"
              : "border-2 border-red-500/70 text-red-200 hover:bg-red-900/20"
          }
        >
          <Brain className="w-4 h-4 mr-2" />
          DISASTER ANALYSIS
        </Button>
        <Button
          onClick={() => setMode("challenge")}
          variant={mode === "challenge" ? "default" : "outline"}
          className={
            mode === "challenge"
              ? "bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              : "border-2 border-purple-500/70 text-purple-200 hover:bg-purple-900/20"
          }
        >
          <Shield className="w-4 h-4 mr-2" />
          SURVIVAL CHALLENGE
        </Button>
      </div>

      {mode === "simulation" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          <Card className="lg:col-span-1 lg:min-w-[500px] bg-dark-card border-2 border-red-500/70 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-800/50 to-slate-700/50">
              <CardTitle
                className="text-white-shadow flex items-center gap-2 text-lg font-bold font-rancho"
              >
                <Target className="w-5 h-5 text-red-shadow" />
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-visible">
                  CAREER TARGET ACQUIRED
                </div>
              </CardTitle>
              <CardDescription
                className="text-secondary-high-contrast font-semibold bg-black/30 px-4 py-2 rounded-lg border border-visible font-rancho"
              >
                Initialize disaster simulation parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-8 px-8 break-words">
              <div>
                <Label
                  htmlFor="role"
                  className="text-gray-200 font-bold text-lg mb-2 block font-rancho"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                >
                  Current Role
                </Label>
                <Input
                  id="role"
                  placeholder="e.g., Marketing Manager"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  className="bg-slate-800/80 border-2 border-red-500/70 focus:border-red-400 text-white font-semibold h-12 text-lg"
                />
              </div>
              <div>
                <Label
                  htmlFor="experience"
                  className="text-gray-200 font-bold text-lg mb-2 block font-rancho"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                >
                  Years of Experience
                </Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g., 5"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="bg-slate-800/80 border-2 border-red-500/70 focus:border-red-400 text-white font-semibold h-12 text-lg"
                />
              </div>
              <div>
                <Label
                  htmlFor="industry"
                  className="text-gray-200 font-bold text-lg mb-2 block font-rancho"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                >
                  Industry
                </Label>
                <Input
                  id="industry"
                  placeholder="e.g., Tech"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-slate-800/80 border-2 border-red-500/70 focus:border-red-400 text-white font-semibold h-12 text-lg"
                />
              </div>
              <Button
                onClick={handleSimulation}
                disabled={isSimulating || !currentRole || !experience || !industry}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-8 text-xl shadow-lg border-2 border-red-400/50 min-h-[120px] min-w-[450px]"
              >
                <div className="bg-black/30 px-8 py-6 rounded-lg border border-red-300/50 w-full text-center">
                  <span className="font-rancho text-2xl">
                    {isSimulating ? "🔥 SIMULATION RUNNING..." : "🚨 INITIATE CHAOS SIMULATION"}
                  </span>
                </div>
              </Button>

              {isSimulating && (
                <div className="space-y-3 p-4 bg-red-900/20 rounded-lg border-2 border-red-500/70">
                  <div className="flex justify-between text-sm text-red-200 font-bold">
                    <span className="font-rancho" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                      DISASTER SIMULATION PROGRESS
                    </span>
                    <span className="font-rancho" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                      {Math.round(simulationProgress)}%
                    </span>
                  </div>
                  <Progress value={simulationProgress} className="h-3 bg-red-900/50" />
                  <div
                    className="text-xs text-red-300 text-center animate-pulse font-semibold font-rancho"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    Analyzing 10,000 career destruction scenarios...
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-1 space-y-6">
            {!results && !isSimulating && (
              <Card className="bg-slate-900/50 border-2 border-slate-600">
                <CardContent className="text-center py-12">
                  <Brain className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white-shadow mb-2 font-rancho">
                    Ready to Simulate Career Chaos
                  </h3>
                  <p className="text-white-shadow font-rancho">
                    Enter your career details and run the simulation to discover your automation risk and strategic
                    pivot opportunities.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <CareerSurvivalChallenge challenge={challenge} setChallenge={setChallenge} />
      )}
    </div>
  )
}
