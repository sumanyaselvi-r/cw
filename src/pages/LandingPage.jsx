
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { samples } from "../data/samples";
import "./LandingPage.css";

const PROJECT_BRIEF_MARKER = "<!-- PROJECT_BRIEF_START -->";

export default function LandingPage() {
  const { slug } = useParams();

  const currentIndex = samples.findIndex(
    (sample) => sample.slug === slug
  );

  const page = samples[currentIndex];

  const { pageContent, projectBrief } = useMemo(() => {
    if (!page?.content) {
      return { pageContent: "", projectBrief: "" };
    }

    const markerIndex = page.content.indexOf(PROJECT_BRIEF_MARKER);

    if (markerIndex === -1) {
      return {
        pageContent: page.content,
        projectBrief: "",
      };
    }

    return {
      pageContent: page.content.slice(0, markerIndex).trim(),
      projectBrief: page.content
        .slice(markerIndex + PROJECT_BRIEF_MARKER.length)
        .trim(),
    };
  }, [page]);

  if (!page) {
    return (
      <main className="landing-not-found">
        <p className="landing-eyebrow">THE WRITE CORNER</p>
        <h1>Page not found.</h1>
        <p>The writing sample you are looking for doesn't exist.</p>
        <Link to="/#samples" className="landing-back-link">
          ← Back to Samples
        </Link>
      </main>
    );
  }

  const previousPage =
    currentIndex > 0 ? samples[currentIndex - 1] : null;

  const nextPage =
    currentIndex < samples.length - 1
      ? samples[currentIndex + 1]
      : null;

  return (
    <main className="landing-page">
      <div className="landing-container">
        <header className="landing-masthead">
          <Link to="/" className="landing-brand">
            THE WRITE CORNER
          </Link>

          <span className="landing-masthead-note">
            SELECTED WRITING
          </span>
        </header>

        <nav
          className="landing-navigation"
          aria-label="Page navigation"
        >
          <Link to="/#samples" className="landing-back-link">
            ← All Samples
          </Link>

          {projectBrief && (
            <a
              href="#landing-project-brief"
              className="landing-brief-link"
            >
              Project Brief ↓
            </a>
          )}
        </nav>

        <header className="landing-header">
          {page.category && (
            <p className="landing-category">{page.category}</p>
          )}

          <h1 className="landing-title">{page.title}</h1>

          {page.description && (
            <p className="landing-description">
              {page.description}
            </p>
          )}

          {page.date && (
            <p className="landing-date">{page.date}</p>
          )}
        </header>

        <div className="landing-divider" />

        <article className="landing-content">
          <ReactMarkdown>{pageContent}</ReactMarkdown>
        </article>

        {projectBrief && (
          <section
            className="landing-project-brief"
            id="landing-project-brief"
            aria-labelledby="landing-project-brief-title"
          >
            <p className="landing-section-label">
              BEHIND THE COPY
            </p>

            <h2 id="landing-project-brief-title">
              Project Brief
            </h2>

            <div className="landing-brief-content">
              <ReactMarkdown>{projectBrief}</ReactMarkdown>
            </div>
          </section>
        )}

        <footer className="landing-footer">
          <p>THE WRITE CORNER</p>

          <Link to="/#samples">
            ← Explore more writing samples
          </Link>
        </footer>

        {(previousPage || nextPage) && (
          <nav
            className="landing-pagination"
            aria-label="More writing samples"
          >
            {previousPage ? (
              <Link
                to={`/samples/${previousPage.slug}`}
                className="landing-pagination-link"
              >
                <span>← Previous</span>
                <strong>{previousPage.title}</strong>
              </Link>
            ) : (
              <div />
            )}

            {nextPage && (
              <Link
                to={`/samples/${nextPage.slug}`}
                className="landing-pagination-link landing-pagination-next"
              >
                <span>Next →</span>
                <strong>{nextPage.title}</strong>
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
