"use client"

import React from "react"

interface BiLabelProps {
  en: string
  hi: string
  separator?: string
  className?: string
}

// Simple bilingual label: renders English | Hindi side-by-side
export function BiLabel({ en, hi, separator = " | ", className }: BiLabelProps) {
  return (
    <span className={className}>
      <span>{en}</span>
      <span>{separator}</span>
      <span>{hi}</span>
    </span>
  )
}