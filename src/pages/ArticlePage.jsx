
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { samples } from "../data/samples";
import "./ArticlePage.css";

const PROJECT_BRIEF_MARKER = "<!-- PROJECT_BRIEF_START -->";

export default function ArticlePage() {
  const { slug } = useParams();

  const currentIndex = samples.findIndex(
    (sample) => sample.slug === slug
  );

  const article = samples[currentIndex];

  const { articleContent, projectBrief } = useMemo(() => {
    if (!article?.content) {
      return { articleContent: "", projectBrief: "" };
    }

    const markerIndex = article.content.indexOf(
      PROJECT_BRIEF_MARKER
    );

    if (markerIndex === -1) {
      return {
        articleContent: article.content,
        projectBrief: "",
      };
    }

    return {
      articleContent: article.content
        .slice(0, markerIndex)
        .trim(),
      projectBrief: article.content
        .slice(markerIndex + PROJECT_BRIEF_MARKER.length)
        .trim(),
    };
  }, [article]);

  if (!article) {
    return (
      <main className="article-not-found">
        <p className="article-eyebrow">THE WRITE CORNER</p>
        <h1>Article not found.</h1>
        <p>The writing sample you are looking for doesn't exist.</p>
        <Link to="/#samples" className="article-back-link">
          ← Back to Samples
        </Link>
      </main>
    );
  }

  const previousArticle =
    currentIndex > 0 ? samples[currentIndex - 1] : null;

  const nextArticle =
    currentIndex < samples.length - 1
      ? samples[currentIndex + 1]
      : null;

  return (
    <main className="article-page">
      <div className="article-container">
        <header className="article-masthead">
          <Link to="/" className="article-brand">
            THE WRITE CORNER
          </Link>

          <span className="article-masthead-note">
            SELECTED WRITING
          </span>
        </header>

        <nav
          className="article-top-nav"
          aria-label="Article navigation"
        >
          <Link to="/#samples" className="article-back-link">
            ← All Samples
          </Link>

          {projectBrief && (
            <a href="#project-brief" className="article-brief-link">
              Project Brief ↓
            </a>
          )}
        </nav>

        <header className="article-header">
          {article.category && (
            <p className="article-category">
              {article.category}
            </p>
          )}

          <h1 className="article-title">{article.title}</h1>

          {article.description && (
            <p className="article-description">
              {article.description}
            </p>
          )}

          {article.date && (
            <p className="article-date">{article.date}</p>
          )}
        </header>

        <div className="article-divider" />

        <article className="article-content">
          <ReactMarkdown>{articleContent}</ReactMarkdown>
        </article>

        {projectBrief && (
          <section
            className="project-brief-section"
            id="project-brief"
            aria-labelledby="project-brief-title"
          >
            <p className="project-brief-eyebrow">
              BEHIND THE ARTICLE
            </p>

            <h2 id="project-brief-title">Project Brief</h2>

            <div className="project-brief-content">
              <ReactMarkdown>{projectBrief}</ReactMarkdown>
            </div>
          </section>
        )}

        <footer className="article-footer">
          <p>THE WRITE CORNER</p>

          <Link to="/#samples">
            ← Explore more writing samples
          </Link>
        </footer>

        {(previousArticle || nextArticle) && (
          <nav
            className="article-pagination"
            aria-label="More writing samples"
          >
            {previousArticle ? (
              <Link
                to={`/samples/${previousArticle.slug}`}
                className="article-pagination-link"
              >
                <span>← Previous</span>
                <strong>{previousArticle.title}</strong>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle && (
              <Link
                to={`/samples/${nextArticle.slug}`}
                className="article-pagination-link article-pagination-next"
              >
                <span>Next →</span>
                <strong>{nextArticle.title}</strong>
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
