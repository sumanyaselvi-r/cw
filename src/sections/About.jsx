
import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-visual">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85"
            alt="Open notebook and pen on a writing desk"
            loading="lazy"
          />
        </div>

        <div className="about-content">
          <p className="about-eyebrow">ABOUT ME</p>

          <p className="about-description">
            My interest in content writing grew while working as a WordPress
            web designer. Along with designing websites, I wrote website copy,
            SEO-friendly content, blog, and social media content.
            I enjoyed turning ideas into clear content that communicates the
            right message.
          </p>

          <p className="about-description">
            This experience made me want to focus more on writing. I’m now
            looking for opportunities in content writing and content marketing
            where I can apply my existing skills and gain more experience.
          </p>

          <Link to="/#samples" className="about-button">
            Explore my work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
