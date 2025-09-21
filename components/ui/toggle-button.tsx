"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ToggleButtonProps {
  options: string[]
  selected: string
  onChange: (value: string) => void
  className?: string
}

export const ToggleButton = React.forwardRef<HTMLDivElement, ToggleButtonProps>(
  ({ options, selected, onChange, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-2", className)}
        {...props}
      >
        {options.map((option) => (
          <Button
            key={option}
            variant={selected === option ? "default" : "outline"}
            size="lg"
            onClick={() => onChange(option)}
            className={cn(
              "px-8 py-3 font-black text-xl transition-all duration-300",
              selected === option
                ? "bg-yellow-400 text-black hover:bg-yellow-300"
                : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
            )}
            style={{ fontFamily: "Rancho, cursive" }}
          >
            {option}
          </Button>
        ))}
      </div>
    )
  }
)

ToggleButton.displayName = "ToggleButton"
