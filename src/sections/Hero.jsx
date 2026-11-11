
import { useLocation, useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId) => {
    const scrollToTarget = () => {
      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    if (location.pathname === "/") {
      if (location.hash !== `#${sectionId}`) {
        navigate(`/#${sectionId}`, { replace: false });
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget);
      });
    } else {
      navigate(`/#${sectionId}`);

      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget);
      });
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-heading">
            Hello, I'm
            <span className="hero-name">SUMANYA R.</span>
          </h1>

          <p className="hero-eyebrow">Content Writer</p>

          <p className="hero-description">
I'm passionate about content writing and enjoy creating simple, engaging content. I'm looking for an opportunity to learn, grow, and build my career as a content writer.          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="hero-primary-link"
              onClick={() => goToSection("samples")}
            >
              Explore my work
              <span aria-hidden="true">↗</span>
            </button>

            <a
              href="/Sumanya selvi R.pdf"
              download="Sumanya selvi_R_Resume.pdf"
              className="hero-secondary-link"
            >
              Download Resume
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
