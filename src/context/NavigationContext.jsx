"use client"

import { createContext, useContext, useState, useEffect } from "react"

const NavigationContext = createContext()

export const NavigationProvider = ({ children }) => {
  const [direction, setDirection] = useState("forward")
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Add effect to temporarily disable smooth scrolling during transitions
  useEffect(() => {
    if (isTransitioning) {
      document.documentElement.classList.add("transitioning")
    } else {
      document.documentElement.classList.remove("transitioning")
    }
  }, [isTransitioning])

  const navigateWithDirection = (path, dir = "forward") => {
    setDirection(dir)
    setIsTransitioning(true)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1500) // Longer timeout to match the slower transition
  }

  return (
    <NavigationContext.Provider value={{ direction, isTransitioning, navigateWithDirection }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => useContext(NavigationContext)
