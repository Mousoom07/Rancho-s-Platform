import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans, Rancho } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const rancho = Rancho({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rancho",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Career Chaos Simulator - Future-Proof Your Career",
  description:
    "Monte Carlo simulations meet Black Swan events. Discover your automation risk and antifragile career pivots.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${rancho.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
