/**
 * Optimizes image URLs by adding width, height, and quality parameters
 * @param {string} url - Original image URL
 * @param {Object} options - Optimization options
 * @param {number} options.width - Desired width
 * @param {number} options.height - Desired height (optional)
 * @param {number} options.quality - Image quality (1-100)
 * @returns {string} - Optimized image URL
 */
export const optimizeImage = (url, { width, height, quality = 80 }) => {
    // If URL already has query parameters, append to them
    const separator = url.includes("?") ? "&" : "?"
  
    let optimizedUrl = `${url}${separator}width=${width}`
  
    if (height) {
      optimizedUrl += `&height=${height}`
    }
  
    optimizedUrl += `&quality=${quality}`
  
    return optimizedUrl
  }
  
  /**
   * Creates a responsive image URL based on device type
   * @param {string} url - Original image URL
   * @param {string} deviceType - 'mobile', 'tablet', or 'desktop'
   * @returns {string} - Responsive image URL
   */
  export const getResponsiveImageUrl = (url, deviceType = "desktop") => {
    switch (deviceType) {
      case "mobile":
        return optimizeImage(url, { width: 640, quality: 75 })
      case "tablet":
        return optimizeImage(url, { width: 1024, quality: 80 })
      case "desktop":
      default:
        return optimizeImage(url, { width: 1600, quality: 85 })
    }
  }
  