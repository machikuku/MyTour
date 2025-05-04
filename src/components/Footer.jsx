import { Github, Mail, Linkedin, Heart } from "lucide-react"
import "../styles/Footer.css"
import ScrollAnimation from "./ScrollAnimation"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <ScrollAnimation animation="fade-up" delay={100}>
            <div className="footer-section">
              <h3>TourBlog</h3>
              <p>
                Follow our educational journey through amazing destinations, exploring technology applications and
                cultural heritage across different sectors.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={300}>
            <div className="footer-section">
              <h3>Contact</h3>
              <div className="social-links" style={{ flexDirection: "row", flexWrap: "wrap", gap: "15px" }}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a href="mailto:info@tourblog.com" className="social-link">
                  <Mail size={20} />
                  <span>Email</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation animation="fade-up" delay={500}>
          <div className="footer-bottom">
            <p>
              &copy; {currentYear} MJD | Blog. All rights reserved. Made with{" "}
              <Heart
                size={14}
                className="inline-icon"
                style={{ color: "#42d5c3", verticalAlign: "middle", marginBottom: "3px" }}
              />{" "}
              by MJD
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  )
}

export default Footer
