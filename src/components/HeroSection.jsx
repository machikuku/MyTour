"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import "../styles/HeroSection.css"
import { ChevronDown } from "lucide-react"

// Define destinations outside component to avoid re-creation on each render
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
  const [imagesLoaded, setImagesLoaded] = useState({})
  const autoplayTimerRef = useRef(null)
  const heroRef = useRef(null)

  // Create optimized image URLs with width/height parameters
  const optimizedImages = useMemo(() => {
    return destinations.map((destination) => ({
      ...destination,
      // Create responsive image URLs based on screen size
      optimizedImage: `${destination.image}?width=1600&quality=80`,
      thumbnailImage: `${destination.image}?width=280&quality=70`,
    }))
  }, [])

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

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Preload images with priority
  useEffect(() => {
    // Preload the first image immediately with high priority
    const firstImage = new Image()
    firstImage.src = optimizedImages[0].optimizedImage
    firstImage.onload = () => {
      setImagesLoaded((prev) => ({ ...prev, 0: true }))
    }

    // Preload the rest of the images with lower priority
    const preloadRestOfImages = () => {
      optimizedImages.forEach((destination, index) => {
        if (index === 0) return // Skip first image as it's already loading

        const img = new Image()
        img.src = destination.optimizedImage
        img.onload = () => {
          setImagesLoaded((prev) => ({ ...prev, [index]: true }))
        }
      })
    }

    // Use requestIdleCallback for non-critical images if available
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadRestOfImages)
    } else {
      // Fallback to setTimeout for browsers that don't support requestIdleCallback
      setTimeout(preloadRestOfImages, 200)
    }
  }, [optimizedImages])

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

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
  }

  // Handle scroll to intro section with motion effect
  const scrollToIntro = () => {
    const introSection = document.getElementById("intro")
    if (introSection) {
      // Ensure smooth scrolling
      introSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="hero-section" ref={heroRef}>
      {/* Background Slideshow with optimized loading */}
      <div className="hero-slideshow">
        {optimizedImages.map((destination, index) => {
          const isActive = index === activeIndex
          // Only render slides that are active or have been loaded
          // This prevents unnecessary DOM elements
          if (!isActive && !imagesLoaded[index]) return null

          return (
            <div
              key={destination.id}
              className={`hero-slide ${isActive ? "active" : ""}`}
              style={{
                backgroundImage: `url(${destination.optimizedImage})`,
                // Add will-change for GPU acceleration when active or about to be active
                willChange: isActive || index === (activeIndex + 1) % destinations.length ? "opacity" : "auto",
              }}
            >
              <div className="slide-gradient"></div>
            </div>
          )
        })}
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

      {/* Bottom Center Thumbnails Container with optimized thumbnails */}
      <div className="hero-thumbnails-container">
        <div className="hero-thumbnails">
          {optimizedImages.map((destination, index) => (
            <div
              key={destination.id}
              className={`hero-thumbnail ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleThumbnailClick(index)}
            >
              {/* Use smaller optimized images for thumbnails */}
              <img
                src={destination.thumbnailImage || "/placeholder.svg"}
                alt={destination.name}
                loading="eager" // Load thumbnails eagerly as they're visible
                width="140"
                height="100"
              />
              <div className="thumbnail-overlay">
                <span>{destination.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator with improved scrolling */}
      <div className="scroll-indicator" onClick={scrollToIntro}>
        <ChevronDown size={32} />
      </div>
    </div>
  )
}

export default HeroSection
