
import "./Experience.css";

const experiences = [
  {
    number: "01",
    period: "NOV 2025 — JAN 2026",
    type: "VIDEO ANALYSIS",
    role: "Video Analyst",
    organization: "DataCorp Traffic Private Limited",
    description:
      "Reviewed video footage, identified incidents and unusual events, and maintained accurate records to support reporting and data review.",
    highlights: [
      "Reviewed videos and recorded accurate data",
      "Identified incidents and unusual events",
      "Maintained records and supported data review",
    ],
  },
  {
    number: "02",
    period: "APR 2024 — MAY 2025",
    type: "WEB DESIGN",
    role: "WordPress Web Designer",
    organization: "XpressReach Branding Agency",
    description:
      "Created responsive WordPress websites using Divi and worked on website copy, SEO-friendly content, brand messaging, and social media projects.",
    highlights: [
      "Created responsive WordPress websites using Divi",
      "Wrote and edited SEO-friendly website content",
      "Developed website stories and marketing content",
      "Created ideas and scripts for YouTube Shorts",
      "Created, published, and reviewed social media content",
      "Used AI tools for research, content ideas, and draft improvement",
      "Worked with design and marketing teams",
    ],
  },
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <header className="experience-header">
          <p className="experience-eyebrow">CAREER & EXPERIENCE</p>

          <h2 className="experience-title">
            The Professional <span>Journey.</span>
          </h2>

          <p className="experience-intro">
            I have hands-on experience in WordPress web design, SEO-friendly
            website content, social media, and video analysis.
          </p>
        </header>

        <div className="experience-edition">
          <span>WORK EXPERIENCE</span>
          <span>
            {String(experiences.length).padStart(2, "0")} ENTRIES
          </span>
        </div>

        <div className="experience-list">
          {experiences.map((experience) => (
            <article
              className="experience-entry"
              key={experience.number}
            >
              <div className="experience-date">
                <span className="experience-number">
                  {experience.number}
                </span>

                <p>{experience.period}</p>

                <span className="experience-type">
                  {experience.type}
                </span>
              </div>

              <div className="experience-details">
                <h3 className="experience-role">
                  {experience.role}
                </h3>

                <p className="experience-organization">
                  {experience.organization}
                </p>

                <p className="experience-description">
                  {experience.description}
                </p>

                <ul className="experience-highlights">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>
                      <span className="experience-dash" aria-hidden="true">
                        —
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <span
                className="experience-entry-mark"
                aria-hidden="true"
              >
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
