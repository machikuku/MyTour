"use client"

import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight, ChevronDown, MapPin } from "lucide-react"
import { useNavigation } from "../context/NavigationContext"
import "../styles/BlogPost.css"

const BlogPost = ({ blogs }) => {
  const { id } = useParams()
  const blogId = Number.parseInt(id)
  const blog = blogs.find((blog) => blog.id === blogId)

  const prevBlog = blogs.find((blog) => blog.id === blogId - 1)
  const nextBlog = blogs.find((blog) => blog.id === blogId + 1)

  // State for managing active images for each location
  const [activeImages, setActiveImages] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const contentSectionRef = useRef(null)
  const topRef = useRef(null)

  const navigate = useNavigate()
  const { navigateWithDirection } = useNavigation()

  // Check if device is mobile or tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992) // Consider tablets and phones as mobile
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Reset to the top of the page when blog post changes
  useEffect(() => {
    // Delay scrolling to top to allow transition to complete first
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto", // Use auto instead of smooth to avoid conflict with transition
      })
    }, 100)

    // Initialize active images for each location
    const initialActiveImages = {}
    if (blog && blog.locationDetails) {
      blog.locationDetails.forEach((_, index) => {
        initialActiveImages[index] = 0
      })
      setActiveImages(initialActiveImages)
    }
  }, [blogId, blog])

  // Handle navigation with animation direction
  const handleNavigation = (path, dir) => {
    // First trigger the navigation with animation
    navigateWithDirection(path, dir)
    navigate(path)
    // Don't scroll here - let the useEffect handle it after navigation completes
  }

  const scrollToContent = () => {
    contentSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleImageChange = (locationIndex, imageIndex) => {
    setActiveImages((prev) => ({
      ...prev,
      [locationIndex]: imageIndex,
    }))
  }

  const handleHomeClick = (e) => {
    // We'll let the default Link behavior handle this
    // The App.jsx component should handle the scroll reset
  }

  if (!blog) {
    return <div className="not-found">Blog post not found</div>
  }

  return (
    <>
      {/* Hero Section */}
      <div className="blog-post-hero" ref={topRef}>
        <div className="blog-post-hero-bg" style={{ backgroundImage: `url(${blog.coverImage})` }}></div>
        <div className="blog-post-hero-content">
          <div className="day-label">DAY {blog.id}</div>
          <h1 className="title">{blog.title}</h1>
          <p className="excerpt">{blog.excerpt}</p>
        </div>
        <div className="scroll-indicator" onClick={scrollToContent}>
          <ChevronDown size={32} />
        </div>
      </div>

      {/* Content Section */}
      <div className="blog-post-container" ref={contentSectionRef}>
        {/* Display each location sequentially */}
        {blog.locationDetails &&
          blog.locationDetails.map((location, locationIndex) => {
            const activeImageIndex = activeImages[locationIndex] || 0

            return (
              <div className="location-section" key={locationIndex}>
                <div className="location-header">
                  <h2 className="location-title">
                    <MapPin size={24} className="location-icon" />
                    {location.name}
                  </h2>
                </div>

                <div className="location-content">
                  <div className="location-text">{location.content}</div>

                  <div className="location-image-container">
                    <div className="location-image">
                      <img
                        src={location.images[activeImageIndex]?.url || "/placeholder.svg"}
                        alt={location.images[activeImageIndex]?.description || "Location image"}
                      />
                    </div>
                    <div className="location-caption">{location.images[activeImageIndex]?.description || ""}</div>

                    {/* Conditionally render image selection for mobile/tablet */}
                    {isMobile && (
                      <div className="location-nav mobile">
                        {location.images.map((image, imageIndex) => (
                          <div
                            key={imageIndex}
                            className={`location-thumbnail ${activeImageIndex === imageIndex ? "active" : ""}`}
                            onClick={() => handleImageChange(locationIndex, imageIndex)}
                          >
                            <img src={image.url || "/placeholder.svg"} alt={`Thumbnail ${imageIndex + 1}`} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop image selection - only show on larger screens */}
                {!isMobile && (
                  <div className="location-nav desktop">
                    {location.images.map((image, imageIndex) => (
                      <div
                        key={imageIndex}
                        className={`location-thumbnail ${activeImageIndex === imageIndex ? "active" : ""}`}
                        onClick={() => handleImageChange(locationIndex, imageIndex)}
                      >
                        <img src={image.url || "/placeholder.svg"} alt={`Thumbnail ${imageIndex + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

        {/* Navigation */}
        <div className="blog-navigation">
          {blogId === 1 ? (
            <Link to="/" className="nav-button all" onClick={handleHomeClick}>
              <ArrowLeft size={20} />
              <span>All</span>
            </Link>
          ) : prevBlog ? (
            <button className="nav-button prev" onClick={() => handleNavigation(`/blog/${prevBlog.id}`, "reverse")}>
              <ArrowLeft size={20} />
              <span>Previous: Day {prevBlog.id}</span>
            </button>
          ) : (
            <div className="nav-button disabled">
              <ArrowLeft size={20} />
              <span>Previous</span>
            </div>
          )}

          {blogId !== 1 && (
            <Link to="/" className="nav-button home" onClick={handleHomeClick}>
              <span>All Posts</span>
            </Link>
          )}

          {nextBlog ? (
            <button className="nav-button next" onClick={() => handleNavigation(`/blog/${nextBlog.id}`, "forward")}>
              <span>Next: Day {nextBlog.id}</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <div className="nav-button disabled">
              <span>Next</span>
              <ArrowRight size={20} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default BlogPost
