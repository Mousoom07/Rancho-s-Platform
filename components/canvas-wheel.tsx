"use client"

import React, { useEffect, useRef } from "react"

interface CanvasWheelProps {
  labels: string[]
  size?: number // canvas size in px (square)
  innerRadius?: number // inner empty radius
  keepTextHorizontal?: boolean // if true, text stays horizontal
  fontFamily?: string
  fontSize?: number // base font size in px
  textPadding?: number // px gap between text and borders
  sliceColors?: string[] // optional slice fill colors
  textColor?: string // CSS color; default uses CSS var
  onSliceClick?: (index: number, label: string) => void
}

// Utility: wrap text into multiple lines within a max width
function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ""

  for (let i = 0; i < words.length; i++) {
    const test = current ? current + " " + words[i] : words[i]
    const w = ctx.measureText(test).width
    if (w <= maxWidth) {
      current = test
    } else {
      if (current) lines.push(current)
      current = words[i]
      if (lines.length === maxLines - 1) break
    }
  }
  if (current && lines.length < maxLines) lines.push(current)

  // If overflow, truncate last line with ellipsis
  if (lines.length === maxLines) {
    let last = lines[maxLines - 1]
    while (ctx.measureText(last + "…").width > maxWidth && last.length > 0) {
      last = last.slice(0, -1)
    }
    lines[maxLines - 1] = last + (last.endsWith("…") ? "" : "…")
  }

  return lines
}

export default function CanvasWheel({
  labels,
  size = 420,
  innerRadius = 40,
  keepTextHorizontal = true,
  fontFamily = "Poppins, Arial, system-ui, sans-serif",
  fontSize = 16,
  textPadding = 14,
  sliceColors,
  textColor = "var(--foreground)",
  onSliceClick,
}: CanvasWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Support high-DPI screens
    const dpr = Math.max(1, window.devicePixelRatio || 1)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cx = size / 2
    const cy = size / 2
    const outerRadius = size / 2 - 8 // small margin
    const count = Math.max(1, labels.length)
    const anglePer = (Math.PI * 2) / count

    // Draw slices
    for (let i = 0; i < count; i++) {
      const start = i * anglePer - Math.PI / 2 // start from top
      const end = start + anglePer
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, outerRadius, start, end)
      ctx.closePath()

      const fill = sliceColors?.[i % (sliceColors.length || 1)]
        ?? `hsl(${(i * 360) / count}, 70%, 45%)`
      ctx.fillStyle = fill
      ctx.fill()

      // Optional: thin border for separation
      ctx.strokeStyle = "rgba(0,0,0,0.25)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw labels
    ctx.fillStyle = textColor
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    for (let i = 0; i < count; i++) {
      const label = labels[i] ?? ""
      const start = i * anglePer - Math.PI / 2
      const mid = start + anglePer / 2

      // Set font bold and slightly larger for readability
      ctx.font = `700 ${fontSize}px ${fontFamily}`

      // Compute available chord width at a given radius for wrapping
      const textRadius = innerRadius + textPadding + (outerRadius - innerRadius - 2 * textPadding) / 2
      const chord = 2 * textRadius * Math.sin(anglePer / 2) - textPadding * 2
      const maxWidth = Math.max(40, chord)

      const lines = wrapLines(ctx, label, maxWidth, 2)
      const lineHeight = Math.round(fontSize * 1.15)
      const totalHeight = lines.length * lineHeight

      ctx.save()
      // Position at angle
      ctx.translate(cx, cy)
      ctx.rotate(mid)

      // If keeping text horizontal, rotate back; else keep radial orientation
      if (keepTextHorizontal) {
        ctx.rotate(-mid)
      }

      // Compute draw point for the first line
      const x = Math.cos(keepTextHorizontal ? 0 : 0) // not used, text is centered horizontally
      const y = 0 // base axis after rotation

      // Move outward along the radius
      const tx = (keepTextHorizontal ? 0 : 0) + textRadius
      const ty = 0

      // Draw each line centered, with vertical offset
      for (let li = 0; li < lines.length; li++) {
        const ly = -totalHeight / 2 + li * lineHeight + lineHeight / 2
        // Place text at (tx, ly)
        if (keepTextHorizontal) {
          ctx.fillText(lines[li], tx, ly)
        } else {
          // For radial text, shift text so it reads outward; rotate 90deg so baseline is along radius
          ctx.save()
          ctx.translate(0, 0)
          // Already rotated to mid; move to radius then rotate 90deg counterclockwise so text is horizontal along tangent
          ctx.translate(textRadius, ly)
          ctx.rotate(Math.PI / 2)
          ctx.fillText(lines[li], 0, 0)
          ctx.restore()
        }
      }

      ctx.restore()
    }

    // Click detection
    if (onSliceClick) {
      const onClick = (ev: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = ev.clientX - rect.left
        const y = ev.clientY - rect.top
        const dx = x - cx
        const dy = y - cy
        const r = Math.sqrt(dx * dx + dy * dy)
        if (r < innerRadius || r > outerRadius) return
        let theta = Math.atan2(dy, dx) // -PI..PI with 0 at +x
        theta = theta + Math.PI / 2 // align with our -PI/2 start
        if (theta < 0) theta += Math.PI * 2
        const index = Math.floor(theta / anglePer)
        onSliceClick(index, labels[index])
      }
      canvas.addEventListener("click", onClick)
      return () => canvas.removeEventListener("click", onClick)
    }
  }, [labels, size, innerRadius, keepTextHorizontal, fontFamily, fontSize, textPadding, sliceColors, textColor, onSliceClick])

  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center">
      <canvas ref={canvasRef} width={size} height={size} style={{ display: "block" }} />
    </div>
  )
}