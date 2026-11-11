
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">
          Contact
        </h2>

        <p className="contact-description">
        </p>

        <div className="contact-links">
          <a
            href="mailto:your.email@example.com"
            className="contact-link"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="m4 7 8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>sumanyaselvi@gmail.com</span>
          </a>

          <a
            href="tel:+917603948115"
            className="contact-link"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 3h3l2 5-2.5 1.8a14 14 0 0 0 4.7 4.7L16 12l5 2v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 5c0-1.1.9-2 2-2Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>+917603948115</span>
          </a>
        </div>
      </div>
    </section>
  );
}
