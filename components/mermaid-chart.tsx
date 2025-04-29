"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

interface MermaidChartProps {
  chart: string
}

export default function MermaidChart({ chart }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      securityLevel: "loose",
      themeVariables: {
        primaryColor: "#9333ea",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#6b21a8",
        lineColor: "#9333ea",
        secondaryColor: "#6b21a8",
        tertiaryColor: "#1e1b4b",
      },
    })

    if (containerRef.current) {
      try {
        mermaid.render("mermaid-svg", chart).then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg
          }
        })
      } catch (error) {
        console.error("Error rendering mermaid chart:", error)
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div class="p-4 text-red-500">Error rendering chart</div>`
        }
      }
    }
  }, [chart])

  return <div ref={containerRef} className="mermaid-container"></div>
}
