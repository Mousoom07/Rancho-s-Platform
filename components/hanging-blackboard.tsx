"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface HangingBlackboardProps {
  onDisasterAnalysis: () => void
  onChaosRoulette: () => void
}

export function HangingBlackboard({ onDisasterAnalysis, onChaosRoulette }: HangingBlackboardProps) {
  const [isSwinging, setIsSwinging] = useState(false)

  const handleBoardClick = () => {
    setIsSwinging(!isSwinging)
  }

  return (
    <div className="relative mb-16 flex flex-col items-center">
      {/* Status Badges */}
      <div className="flex gap-6 mb-8">
        <div className="bg-black text-yellow-400 px-6 py-3 rounded-xl font-black text-lg shadow-lg border-2 border-yellow-400">
          💀 CHAOS READY
        </div>
        <div className="bg-black text-orange-400 px-6 py-3 rounded-xl font-black text-lg shadow-lg border-2 border-orange-400">
          🚀 FUTURE PROOF
        </div>
        <div className="bg-black text-red-400 px-6 py-3 rounded-xl font-black text-lg shadow-lg border-2 border-red-400">
          🤖 AI POWERED
        </div>
      </div>

      {/* Hanging Mechanism */}
      <div className="relative mb-4">
        {/* Ceiling Mount */}
        <div className="w-24 h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-lg shadow-xl mx-auto mb-2">
          <div className="flex justify-center pt-1">
            <div className="w-3 h-3 bg-gray-400 rounded-full border border-gray-300"></div>
          </div>
        </div>

        {/* Hanging Chains */}
        <div className="flex justify-center gap-20">
          <div className="flex flex-col items-center">
            {[...Array(8)].map((_, i) => (
              <div key={`left-${i}`} className="w-1 h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-sm"></div>
            ))}
          </div>
          <div className="flex flex-col items-center">
            {[...Array(8)].map((_, i) => (
              <div key={`right-${i}`} className="w-1 h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Blackboard */}
      <div
        className={`relative cursor-pointer transition-all duration-300 ${
          isSwinging ? "animate-swing" : "hover:rotate-1"
        }`}
        onClick={handleBoardClick}
        style={{
          transformOrigin: "top center",
          filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))",
        }}
      >
        {/* Wooden Frame */}
        <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-4 rounded-2xl shadow-2xl border-4 border-amber-500">
          {/* Corner Hardware */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-gray-700 rounded border border-gray-600"></div>
          <div className="absolute top-2 right-2 w-4 h-4 bg-gray-700 rounded border border-gray-600"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 bg-gray-700 rounded border border-gray-600"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-gray-700 rounded border border-gray-600"></div>

          {/* Hanging Points */}
          <div className="absolute -top-2 left-16 w-4 h-4 bg-gray-600 rounded-full border-2 border-gray-500"></div>
          <div className="absolute -top-2 right-16 w-4 h-4 bg-gray-600 rounded-full border-2 border-gray-500"></div>

          {/* Blackboard Surface */}
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl p-12 border-2 border-gray-700 relative">
            {/* Chalk Dust Effect */}
            <div className="absolute inset-0 rounded-xl opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-white via-transparent to-gray-300"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Title */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <span className="text-6xl">⚡</span>
                <div>
                  <h1
                    className="text-5xl md:text-7xl text-yellow-400 font-black leading-none"
                    style={{ fontFamily: "Rancho, cursive", textShadow: "3px 3px 6px rgba(0,0,0,0.7)" }}
                  >
                    Rancho's Platform
                  </h1>
                  <p
                    className="text-2xl md:text-4xl text-orange-400 font-black mt-2"
                    style={{ fontFamily: "Rancho, cursive" }}
                  >
                    रांचो का प्लेटफॉरम
                  </p>
                </div>
                <span className="text-6xl">⚡</span>
              </div>

              {/* Stress Test Section */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-6 shadow-xl">
                <p className="text-2xl md:text-3xl text-white font-black" style={{ fontFamily: "Rancho, cursive" }}>
                  STRESS TEST YOUR CAREER PATH
                </p>
              </div>

              {/* Warning Section */}
              <div className="bg-gradient-to-r from-purple-700 to-purple-800 rounded-2xl p-4 mb-6 shadow-xl">
                <p className="text-lg md:text-xl text-yellow-200 font-black" style={{ fontFamily: "Rancho, cursive" }}>
                  Brace for impact. Black swan events are coming. Will your career survive the chaos?
                </p>
              </div>

              {/* Simulation Active */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 mb-8 shadow-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">⚠️</span>
                  <h3
                    className="text-xl md:text-2xl text-yellow-300 font-black"
                    style={{ fontFamily: "Rancho, cursive" }}
                  >
                    SIMULATION SCENARIOS ACTIVE
                  </h3>
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="bg-black rounded-xl p-3">
                  <p
                    className="text-sm md:text-base text-yellow-200 font-black"
                    style={{ fontFamily: "Rancho, cursive" }}
                  >
                    The 2026 AI Layoffs • The Climate Career Boom • The Web3 Collapse
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDisasterAnalysis()
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xl px-8 py-4 font-black rounded-xl shadow-xl transform hover:scale-105 transition-all"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  🚨 DISASTER ANALYSIS
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onChaosRoulette()
                  }}
                  className="bg-gradient-to-r from-white to-yellow-50 hover:from-yellow-50 hover:to-yellow-100 text-black text-xl px-8 py-4 font-black rounded-xl shadow-xl border-2 border-gray-300 transform hover:scale-105 transition-all"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  🎲 CHAOS ROULETTE
                </Button>
              </div>
            </div>
          </div>

          {/* Chalk Tray */}
          <div className="absolute -bottom-2 left-4 right-4 h-3 bg-gradient-to-b from-amber-500 to-amber-700 rounded-b-lg">
            <div className="flex gap-2 justify-center pt-1">
              <div className="w-1 h-1 bg-white rounded-full opacity-80"></div>
              <div className="w-1 h-1 bg-yellow-200 rounded-full opacity-80"></div>
              <div className="w-1 h-1 bg-gray-200 rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
