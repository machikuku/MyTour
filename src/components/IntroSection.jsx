"use client"

import { useEffect, useRef, useState } from "react"
import ScrollAnimation from "./ScrollAnimation"
import "../styles/IntroSection.css"

const IntroSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div className="intro-section" ref={sectionRef}>
      <div className={`intro-container ${isVisible ? "visible" : ""}`}>
        <div className="intro-image-container">
          <div className="intro-image-wrapper">
            <img
              src="/images/me2.jpg"
              alt="Students showing their tickets during the educational tour"
              className="intro-image"
            />
            <div className="intro-image-overlay"></div>
          </div>
        </div>

        <div className="intro-content">
          <ScrollAnimation animation="fade-up" delay={200}>
          <p className="intro-description">
            This is my personal blog about our 8-day Industry Visit and Educational Tour experience, which is part of
            the practicum requirements for us graduating IT students of Western Mindanao State University. As the
            first batch from the Department of Information Technology in the College of Computing Studies, this tour
            was an exciting and eye-opening journey. We had the chance to visit a variety of industry locations,
            government facilities, and cultural institutions, learning how technology is applied across different
            sectors. Along the way, we also explored amazing and historical places that gave us a deeper understanding
            of the region's rich history. From ancient landmarks to cutting-edge innovations, each stop offered valuable 
            insights and unforgettable experiences.
          </p>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}

export default IntroSection
