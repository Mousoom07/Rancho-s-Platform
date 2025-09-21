"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function ProgressAnalytics() {
  const [timeframe, setTimeframe] = useState<"daily" | "monthly" | "yearly">("monthly")

  const dailyData = [
    { period: "Mon", skillScore: 65, examScore: 70, completedTasks: 8 },
    { period: "Tue", skillScore: 68, examScore: 72, completedTasks: 12 },
    { period: "Wed", skillScore: 72, examScore: 75, completedTasks: 15 },
    { period: "Thu", skillScore: 75, examScore: 78, completedTasks: 18 },
    { period: "Fri", skillScore: 78, examScore: 80, completedTasks: 22 },
    { period: "Sat", skillScore: 80, examScore: 82, completedTasks: 25 },
    { period: "Sun", skillScore: 82, examScore: 85, completedTasks: 28 },
  ]

  const monthlyData = [
    { period: "Jan", skillScore: 60, examScore: 65, completedTasks: 45 },
    { period: "Feb", skillScore: 65, examScore: 70, completedTasks: 52 },
    { period: "Mar", skillScore: 70, examScore: 75, completedTasks: 58 },
    { period: "Apr", skillScore: 75, examScore: 78, completedTasks: 65 },
    { period: "May", skillScore: 78, examScore: 82, completedTasks: 72 },
    { period: "Jun", skillScore: 82, examScore: 85, completedTasks: 78 },
    { period: "Jul", skillScore: 85, examScore: 88, completedTasks: 85 },
    { period: "Aug", skillScore: 88, examScore: 90, completedTasks: 92 },
    { period: "Sep", skillScore: 90, examScore: 92, completedTasks: 98 },
    { period: "Oct", skillScore: 92, examScore: 94, completedTasks: 105 },
    { period: "Nov", skillScore: 94, examScore: 96, completedTasks: 112 },
    { period: "Dec", skillScore: 96, examScore: 98, completedTasks: 120 },
  ]

  const yearlyData = [
    { period: "2020", skillScore: 45, examScore: 50, completedTasks: 200 },
    { period: "2021", skillScore: 60, examScore: 65, completedTasks: 350 },
    { period: "2022", skillScore: 75, examScore: 80, completedTasks: 500 },
    { period: "2023", skillScore: 85, examScore: 88, completedTasks: 650 },
    { period: "2024", skillScore: 96, examScore: 98, completedTasks: 800 },
  ]

  const skillDistribution = [
    { name: "Technology", value: 35, color: "#FFD700" },
    { name: "Leadership", value: 25, color: "#FFFFFF" },
    { name: "Communication", value: 20, color: "#000000" },
    { name: "Analytics", value: 15, color: "#FFA500" },
    { name: "Others", value: 5, color: "#808080" },
  ]

  const getCurrentData = () => {
    switch (timeframe) {
      case "daily":
        return dailyData
      case "monthly":
        return monthlyData
      case "yearly":
        return yearlyData
      default:
        return monthlyData
    }
  }

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case "daily":
        return "Last 7 Days"
      case "monthly":
        return "Last 12 Months"
      case "yearly":
        return "Last 5 Years"
      default:
        return "Last 12 Months"
    }
  }

  const currentData = getCurrentData()
  const latestData = currentData[currentData.length - 1]
  const previousData = currentData[currentData.length - 2]

  const skillImprovement = latestData.skillScore - previousData.skillScore
  const examImprovement = latestData.examScore - previousData.examScore
  const taskImprovement = latestData.completedTasks - previousData.completedTasks

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1
          className="text-4xl text-force-white mb-6 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 10px #fff",
          }}
        >
          📊 progress analytics dashboard 📊
        </h1>
        <p className="text-force-white font-bold text-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
          Track your improvement journey with detailed insights and trends!
        </p>
      </div>

      {/* Time Frame Selector */}
      <div className="flex justify-center gap-4 mb-8">
        {(["daily", "monthly", "yearly"] as const).map((period) => (
          <Button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`${
              timeframe === period
                ? "bg-dark-card text-force-yellow border-4 border-visible"
                : "bg-dark-card text-force-white border-4 border-visible hover:bg-yellow-400"
            } font-bold px-6 py-3`}
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
          <div className="text-center">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-xl font-bold text-force-white mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Skill Score
            </h3>
            <div className="text-3xl font-bold text-force-white mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              {latestData.skillScore}%
            </div>
            <Badge className={`${skillImprovement >= 0 ? "bg-green-500" : "bg-red-500"} text-white font-bold`}>
              {skillImprovement >= 0 ? "↗" : "↘"} {Math.abs(skillImprovement)}% from last period
            </Badge>
          </div>
        </Card>

        <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
          <div className="text-center">
            <div className="text-4xl mb-2">📝</div>
            <h3 className="text-xl font-bold text-force-white mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Exam Performance
            </h3>
            <div className="text-3xl font-bold text-force-white mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              {latestData.examScore}%
            </div>
            <Badge className={`${examImprovement >= 0 ? "bg-green-500" : "bg-red-500"} text-white font-bold`}>
              {examImprovement >= 0 ? "↗" : "↘"} {Math.abs(examImprovement)}% from last period
            </Badge>
          </div>
        </Card>

        <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
          <div className="text-center">
            <div className="text-4xl mb-2">✅</div>
            <h3 className="text-xl font-bold text-force-white mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Tasks Completed
            </h3>
            <div className="text-3xl font-bold text-force-white mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              {latestData.completedTasks}
            </div>
            <Badge className={`${taskImprovement >= 0 ? "bg-green-500" : "bg-red-500"} text-white font-bold`}>
              {taskImprovement >= 0 ? "↗" : "↘"} {Math.abs(taskImprovement)} from last period
            </Badge>
          </div>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
          <h3
            className="text-xl font-bold text-force-white mb-4 text-center"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            📈 Performance Trends - {getTimeframeLabel()}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="skillScore" stroke="#FFD700" strokeWidth={3} name="Skill Score" />
              <Line type="monotone" dataKey="examScore" stroke="#000000" strokeWidth={3} name="Exam Score" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
          <h3
            className="text-xl font-bold text-force-white mb-4 text-center"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            📊 Task Completion - {getTimeframeLabel()}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completedTasks" fill="#FFD700" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Skill Distribution */}
        <Card className="bg-dark-card border-8 border-visible p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-force-white mb-4 text-center" style={{ fontFamily: "Comic Sans MS, cursive" }}>
          🎯 Skill Distribution Breakdown
        </h3>
        <div className="flex justify-center">
          <ResponsiveContainer width={400} height={300}>
            <PieChart>
              <Pie
                data={skillDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {skillDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Achievement Badges */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-force-white mb-6 text-center" style={{ fontFamily: "Comic Sans MS, cursive" }}>
          🏆 Recent Achievements
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge className="bg-yellow-400 text-force-black border-4 border-visible font-bold text-lg px-4 py-2">
            🎯 Consistency Master - 30 Days Streak
          </Badge>
          <Badge className="bg-dark-card text-force-yellow border-4 border-visible font-bold text-lg px-4 py-2">
            📚 Knowledge Seeker - 100 Exams Completed
          </Badge>
          <Badge className="bg-dark-card text-force-white border-4 border-visible font-bold text-lg px-4 py-2">
            🚀 Rapid Learner - 50% Improvement This Month
          </Badge>
        </div>
      </div>
    </div>
  )
}
