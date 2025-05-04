"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import "../styles/BackToTop.css"

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top coordinate to 0
  // Make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <button className={`back-to-top ${isVisible ? "visible" : ""}`} onClick={scrollToTop} aria-label="Back to top">
      <ArrowUp size={20} />
    </button>
  )
}

export default BackToTop
