"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import "../styles/Navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled more than 100px
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navbarClass = `navbar ${isHomePage && !isScrolled ? "transparent" : ""} ${isScrolled ? "scrolled" : ""}`

  return (
    <nav className={navbarClass}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/logo.png" alt="TourBlog Logo" className="navbar-logo-image" />
          <span>Blog</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop-nav">
          <a href="/#hero" className="nav-link">
            Home
          </a>
          <a href="https://deangmarkuportfolio.netlify.app/" className="nav-link">
            Portfolio
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle navigation menu">
          <div className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
            <a href="/#hero" className="nav-link" onClick={toggleMenu}>
              Home
            </a>
            <a href="https://deangmarkuportfolio.netlify.app/" className="nav-link" onClick={toggleMenu}>
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
