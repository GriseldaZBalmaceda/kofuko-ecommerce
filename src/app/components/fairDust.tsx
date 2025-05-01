"use client"
import { useEffect } from "react"

export default function FairyDustCursor() {
  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement("script")
    script.type = "module"
    script.innerHTML = `
      import { fairyDustCursor } from "https://unpkg.com/cursor-effects@latest/dist/esm.js";
      new fairyDustCursor
    `
    document.body.appendChild(script)

    return () => {
      // Clean up: remove the script and any effect if possible
      document.body.removeChild(script)
    }
  }, [])

  return null
}
