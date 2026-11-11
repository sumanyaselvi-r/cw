
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { samples } from "../data/samples";
import "./ProductPage.css";

const PROJECT_BRIEF_MARKER = "<!-- PROJECT_BRIEF_START -->";

export default function ProductPage() {
  const { slug } = useParams();

  const currentIndex = samples.findIndex(
    (sample) => sample.slug === slug
  );

  const product = samples[currentIndex];

  const { productContent, projectBrief } = useMemo(() => {
    if (!product?.content) {
      return { productContent: "", projectBrief: "" };
    }

    const markerIndex = product.content.indexOf(
      PROJECT_BRIEF_MARKER
    );

    if (markerIndex === -1) {
      return {
        productContent: product.content,
        projectBrief: "",
      };
    }

    return {
      productContent: product.content
        .slice(0, markerIndex)
        .trim(),
      projectBrief: product.content
        .slice(markerIndex + PROJECT_BRIEF_MARKER.length)
        .trim(),
    };
  }, [product]);

  if (!product) {
    return (
      <main className="product-not-found">
        <p className="product-eyebrow">THE WRITE CORNER</p>
        <h1>Product page not found.</h1>
        <p>The writing sample you are looking for doesn't exist.</p>
        <Link to="/#samples" className="product-back-link">
          ← Back to Samples
        </Link>
      </main>
    );
  }

  const previousProduct =
    currentIndex > 0 ? samples[currentIndex - 1] : null;

  const nextProduct =
    currentIndex < samples.length - 1
      ? samples[currentIndex + 1]
      : null;

  return (
    <main className="product-page">
      <div className="product-container">
        <header className="product-masthead">
          <Link to="/" className="product-brand">
            THE WRITE CORNER
          </Link>

          <span className="product-masthead-note">
            SELECTED WRITING
          </span>
        </header>

        <nav
          className="product-navigation"
          aria-label="Product page navigation"
        >
          <Link to="/#samples" className="product-back-link">
            ← All Samples
          </Link>

          {projectBrief && (
            <a
              href="#product-project-brief"
              className="product-brief-link"
            >
              Project Brief ↓
            </a>
          )}
        </nav>

        <header className="product-header">
          {product.category && (
            <p className="product-category">
              {product.category}
            </p>
          )}

          <h1 className="product-title">{product.title}</h1>

          {product.description && (
            <p className="product-description">
              {product.description}
            </p>
          )}

          {product.date && (
            <p className="product-date">{product.date}</p>
          )}
        </header>

        <div className="product-divider" />

        <article className="product-content">
          <ReactMarkdown>{productContent}</ReactMarkdown>
        </article>

        {projectBrief && (
          <section
            className="product-project-brief"
            id="product-project-brief"
            aria-labelledby="product-project-brief-title"
          >
            <p className="product-section-label">
              BEHIND THE COPY
            </p>

            <h2 id="product-project-brief-title">
              Project Brief
            </h2>

            <div className="product-brief-content">
              <ReactMarkdown>{projectBrief}</ReactMarkdown>
            </div>
          </section>
        )}

        <footer className="product-footer">
          <p>THE WRITE CORNER</p>

          <Link to="/#samples">
            ← Explore more writing samples
          </Link>
        </footer>

        {(previousProduct || nextProduct) && (
          <nav
            className="product-pagination"
            aria-label="More writing samples"
          >
            {previousProduct ? (
              <Link
                to={`/samples/${previousProduct.slug}`}
                className="product-pagination-link"
              >
                <span>← Previous</span>
                <strong>{previousProduct.title}</strong>
              </Link>
            ) : (
              <div />
            )}

            {nextProduct && (
              <Link
                to={`/samples/${nextProduct.slug}`}
                className="product-pagination-link product-pagination-next"
              >
                <span>Next →</span>
                <strong>{nextProduct.title}</strong>
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
