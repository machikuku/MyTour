"use client"
import HeroSection from "../components/HeroSection"
import IntroSection from "../components/IntroSection"
import Footer from "../components/Footer"
import ScrollAnimation from "../components/ScrollAnimation"
import { Link } from "react-router-dom"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import "../styles/BlogList.css"

const BlogList = ({ blogs, title = "Our Journey" }) => {
  const [scrollDirection, setScrollDirection] = useState("none")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visibleCards, setVisibleCards] = useState([])
  const observerRef = useRef(null)
  const cardsRef = useRef([])

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Set up intersection observer for cards
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, entry.target.dataset.id])
          }
        })
      },
      { threshold: 0.2 },
    )

    cardsRef.current.forEach((card) => {
      if (card) observerRef.current.observe(card)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Get animation direction based on card position
  const getAnimationDirection = (index) => {
    if (scrollDirection === "up") return "fade-down"

    // Alternate animation directions for a more dynamic effect
    const column = index % 3
    if (column === 0) return "fade-right"
    if (column === 2) return "fade-left"
    return "fade-up"
  }

  return (
    <div className="main-container monument-font">
      {/* Hero Section */}
      <section className="hero-section-container" id="hero">
        <HeroSection />
      </section>

      {/* Intro Section */}
      <section className="content-section" id="intro">
        <IntroSection />
      </section>

      {/* All Blog Posts Section */}
      <section className="content-section blog-posts-section" id="days">
        <div className="blog-posts-container">
          <ScrollAnimation animation="fade-up">
            <h2 className="section-title">{title}</h2>
          </ScrollAnimation>

          <div className="blog-grid">
            {blogs.map((blog, index) => (
              <ScrollAnimation key={blog.id} animation={getAnimationDirection(index)} delay={index * 150}>
                <Link
                  to={`/blog/${blog.id}`}
                  className="blog-card"
                  ref={(el) => (cardsRef.current[index] = el)}
                  data-id={blog.id}
                >
                  <div className="blog-card-image">
                    <img src={blog.coverImage || "/placeholder.svg"} alt={blog.title} loading="lazy" />
                    <div className="day-badge">
                      <strong>Day {blog.id}</strong>
                    </div>
                  </div>
                  <div className="blog-card-content">
                    <h3>{blog.title}</h3>
                    <p className="blog-date">
                      <Calendar size={14} className="date-icon" />
                      {blog.date}
                    </p>
                    <p className="blog-excerpt">{blog.excerpt}</p>

                    {/* Location Tags with Icons */}
                    <div className="location-tags">
                      {blog.locations &&
                        blog.locations.map((location, i) => (
                          <span key={i} className="location-tag">
                            <MapPin size={14} className="location-icon" />
                            {location}
                          </span>
                        ))}
                    </div>

                    <div className="read-more">
                      Read More <ArrowRight size={16} className="inline-icon" />
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default BlogList
