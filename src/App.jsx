"use client"

import React from "react"

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { ThemeProvider } from "./context/ThemeContext"
import { NavigationProvider } from "./context/NavigationContext"
import Navbar from "./components/Navbar"
import BlogList from "./pages/BlogList"
import BlogPost from "./pages/BlogPost"
import BackToTop from "./components/BackToTop"
import { blogData } from "./data/blogData"
import "./App.css"

// Wrapper component for animated routes
const AnimatedRoutes = () => {
  const location = useLocation()
  const nodeRef = React.useRef(null)

  // Handle scroll restoration after transitions
  useEffect(() => {
    // Wait for the transition to complete before scrolling
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto", // Use auto to avoid conflict with transition animation
      })
    }, 100) // Small delay to let the transition start

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={location.key} nodeRef={nodeRef} timeout={1000} classNames="page-transition" unmountOnExit>
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<BlogList blogs={blogData} />} />
            <Route path="/blog/:id" element={<BlogPost blogs={blogData} />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Apply smooth scrolling to the entire document
    document.documentElement.style.scrollBehavior = "smooth"

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      // Reset scroll behavior when component unmounts
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <ThemeProvider>
      <NavigationProvider>
        <Router>
          <Navbar scrollY={scrollY} />
          <AnimatedRoutes />
          <BackToTop />
        </Router>
      </NavigationProvider>
    </ThemeProvider>
  )
}

export default App
