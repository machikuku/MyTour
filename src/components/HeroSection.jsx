"use client"

import { useEffect, useState, useRef } from "react"
import "../styles/HeroSection.css"

const destinations = [
  {
    id: 1,
    name: "Manila City",
    image: "/images/manila.jpg",
    description: "The vibrant capital city with a stunning skyline",
  },
  {
    id: 2,
    name: "Quezon City",
    image: "/images/quezon.jpg",
    description: "Home to the iconic Quezon Memorial Circle",
  },
  {
    id: 3,
    name: "Subic Bay",
    image: "/images/subic.jpg",
    description: "A coastal paradise with breathtaking views",
  },
  {
    id: 4,
    name: "Baguio City",
    image: "/images/baguio.jpg",
    description: "The summer capital with cool mountain air",
  },
]

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const autoplayTimerRef = useRef(null)
  const heroRef = useRef(null)

  // Set visibility for initial animation and check for mobile
  useEffect(() => {
    setIsVisible(true)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Preload images for smoother transitions
    destinations.forEach((destination) => {
      const img = new Image()
      img.src = destination.image
    })

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Handle automatic slideshow
  useEffect(() => {
    // Clear any existing timer
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }

    // Set up a new timer
    autoplayTimerRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % destinations.length)
    }, 5000)

    // Clean up on unmount or when activeIndex changes
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [activeIndex])

  // Set up smooth scrolling for the entire page
  useEffect(() => {
    // Apply smooth scrolling to the entire document
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
  }

  // Handle scroll to intro section with motion effect
  const scrollToIntro = () => {
    const introSection = document.getElementById("intro")
    if (introSection) {
      window.scrollTo({
        top: introSection.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="hero-section" ref={heroRef}>
      {/* Background Slideshow */}
      <div className="hero-slideshow">
        {destinations.map((destination, index) => (
          <div fetchpriority={high}
            key={destination.id}
            className={`hero-slide ${index === activeIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${destination.image})` }}
          >
            <div className="slide-gradient"></div>
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="hero-content-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">INDUSTRY VISIT</span>
            <span className="hero-title-line highlight">& EDUCATIONAL TOUR</span>
          </h1>
        </div>
      </div>

      {/* Bottom Center Thumbnails Container */}
      <div className="hero-thumbnails-container">
        <div className="hero-thumbnails">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`hero-thumbnail ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={destination.image || "/placeholder.svg"} alt={destination.name} />
              <div className="thumbnail-overlay">
                <span>{destination.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSection
