
import "./Skills.css";

const skillGroups = [
  {
    number: "01",
    title: "Writing & Content",
    description:
      "Creating website copy, brand messaging, and social media content.",
    skills: [
      "Content Writing",
      "Copywriting",
      "Website Copy",
      "Storytelling",
      "Social Media Content",
    ],
  },
  {
    number: "02",
    title: "SEO & Marketing",
    description:
      "Researching content and supporting digital marketing efforts.",
    skills: [
      "SEO Basics",
      "Content Research",
      "Content Marketing",
      "Competitor Research",
      "Marketing Psychology",
    ],
  },
  {
    number: "03",
    title: "Tools",
    description: "Using digital tools for content creation and design.",
    skills: [
      "WordPress",
      "Canva",
      "AI-Assisted Content Creation",
      "Google Docs",
      "MS Office",
    ],
  },
  {
    number: "04",
    title: "Web & Design",
    description:
      "Applying web development and design knowledge to websites.",
    skills: [
      "HTML & CSS",
      "Responsive Web Design",
      "JavaScript",
      "UX Principles",
      "Design Thinking",
    ],
  },
  {
    number: "05",
    title: "Professional Skills",
    description:
      "Bringing creativity, communication, and teamwork to projects.",
    skills: [
      "Communication",
      "Creativity",
      "Adaptability",
      "Time Management",
      "Teamwork",
    ],
  },
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <header className="skills-header">
          <p className="skills-eyebrow">WHAT I BRING</p>

          <h2 className="skills-title">
            Skills & <span>expertise.</span>
          </h2>

          <p className="skills-intro">
            Through my experience in web design, I’ve developed skills in
            writing website copy, researching content, and creating
            SEO-friendly and social media content.
          </p>
        </header>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.number}>
              <div className="skill-card-top">
                <span className="skill-number">{group.number}</span>
                <span className="skill-card-label">CORE SKILLS</span>
              </div>

              <h3 className="skill-card-title">{group.title}</h3>

              <p className="skill-card-description">
                {group.description}
              </p>

              <div className="skill-divider" />

              <ul className="skill-list">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <span className="skill-dot" aria-hidden="true" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
