
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./Header.css";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Samples", id: "samples" },
  { label: "Skills", id: "skills" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const sectionId = location.state?.scrollTo;

    if (location.pathname !== "/" || !sectionId) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      navigate("/", {
        replace: true,
        state: null,
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.state, navigate]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          to="/"
          className="brand-link"
          aria-label="The Write Corner home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-name">
            The Write <span>Corner.</span>
          </span>

          <span className="brand-tagline">
            A portfolio of words
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`header-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navItems.map(({ label, id }) => (
            <button
              className="nav-link"
              key={id}
              type="button"
              onClick={() => goToSection(id)}
            >
              {label}
            </button>
          ))}

          <button
            className="header-contact-link"
            type="button"
            onClick={() => goToSection("contact")}
          >
            Let's Talk <span aria-hidden="true">↗</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
