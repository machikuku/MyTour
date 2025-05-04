"use client"

import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import "../styles/ImageLightbox.css"

const ImageLightbox = ({ images, initialIndex = 0, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  // Reset current index when images change
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex, images])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          navigatePrev()
          break
        case "ArrowRight":
          navigateNext()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, images, onClose])

  // Prevent body scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const navigateNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsLoading(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const navigatePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsLoading(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="lightbox-content">
          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button className="lightbox-nav prev" onClick={navigatePrev}>
                <ChevronLeft size={36} />
              </button>
              <button className="lightbox-nav next" onClick={navigateNext}>
                <ChevronRight size={36} />
              </button>
            </>
          )}

          {/* Image */}
          <div className="lightbox-image-container">
            {isLoading && <div className="lightbox-loader"></div>}
            <img
              src={currentImage.url || "/placeholder.svg"}
              alt={currentImage.description || "Image"}
              className={`lightbox-image ${isLoading ? "loading" : "loaded"}`}
              onLoad={handleImageLoad}
            />
          </div>

          {/* Caption */}
          <div className="lightbox-caption">
            <p className="lightbox-description">{currentImage.description}</p>
            <p className="lightbox-counter">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="lightbox-thumbnails">
            {images.map((image, index) => (
              <div
                key={index}
                className={`lightbox-thumbnail ${index === currentIndex ? "active" : ""}`}
                onClick={() => {
                  setIsLoading(true)
                  setCurrentIndex(index)
                }}
              >
                <img src={image.url || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageLightbox
