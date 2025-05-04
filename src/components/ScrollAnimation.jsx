"use client"

import { useEffect, useRef, useState } from "react"

const ScrollAnimation = ({
  children,
  animation = "fade-in",
  delay = 0,
  threshold = 0.2,
  duration = 3000, // Increased from 2000 to 3000ms for even slower animations
  once = true,
}) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [once, threshold])

  return (
    <div
      ref={elementRef}
      className={`scroll-animation ${animation} ${isVisible ? "animate" : ""}`}
      style={{
        animationDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default ScrollAnimation
