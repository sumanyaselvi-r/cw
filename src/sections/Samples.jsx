
import { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { samples } from "../data/samples";
import "./Samples.css";

const categoryGroups = [
  {
    label: "Blog & Articles",
    matches: ["blog", "article", "business tools", "personal development", "mindfulness", "lifestyle", "goal setting"],
  },
  {
    label: "Product Copy",
    matches: ["product", "e-commerce", "ecommerce"],
  },
  {
    label: "Website & Landing Pages",
    matches: ["landing page", "website copy", "website & landing"],
  },
  {
    label: "Social Media",
    matches: ["social media", "social content"],
  },
];

function getCategoryGroup(category = "") {
  const normalized = category.toLowerCase();

  return (
    categoryGroups.find((group) =>
      group.matches.some((match) => normalized.includes(match))
    )?.label || "Other Writing"
  );
}

export default function Samples() {
  const [activeCategory, setActiveCategory] = useState("All Samples");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#samples") {
      requestAnimationFrame(() => {
        document.getElementById("samples")?.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      });
    }
  }, [location.pathname, location.hash]);

  const categories = useMemo(() => {
    const available = new Set(
      samples.map((sample) => getCategoryGroup(sample.category))
    );

    return [
      "All Samples",
      ...categoryGroups
        .map((group) => group.label)
        .filter((label) => available.has(label)),
      ...(available.has("Other Writing") ? ["Other Writing"] : []),
    ];
  }, []);

  const filteredSamples = useMemo(() => {
    if (activeCategory === "All Samples") return samples;

    return samples.filter(
      (sample) => getCategoryGroup(sample.category) === activeCategory
    );
  }, [activeCategory]);

  return (
    <section className="samples-section" id="samples">
      <div className="samples-container">
        <header className="samples-header">
          <p className="samples-eyebrow">THE PORTFOLIO</p>

          <h2 className="samples-title">
            My Writing <span>Samples.</span>
          </h2>

          <p className="samples-intro">
            These samples reflect my learning and practice in website writing,
            SEO, brand messaging, and social media content. Each piece helps me
            explore ideas, practise different writing styles, and develop my
            skills.
          </p>
        </header>

        <div className="samples-toolbar">
          <div className="samples-filter-label">
            <span>EXPLORE BY TYPE</span>
            <span className="samples-count">
              {String(filteredSamples.length).padStart(2, "0")} SAMPLES
            </span>
          </div>

          <div
            className="samples-filters"
            aria-label="Filter writing samples"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`samples-filter ${
                  activeCategory === category ? "is-active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredSamples.length > 0 ? (
          <div className="samples-grid">
            {filteredSamples.map((sample, index) => {
              const category = getCategoryGroup(sample.category);

              return (
                <article className="sample-card" key={sample.slug}>
                  <div className="sample-card-top">
                    <span className="sample-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="sample-category">{category}</span>
                  </div>

                  <div className="sample-card-body">
                    <p className="sample-card-kicker">
                      {sample.category || "Writing Sample"}
                    </p>

                    <h3 className="sample-title">{sample.title}</h3>

                    {sample.description && (
                      <p className="sample-description">
                        {sample.description}
                      </p>
                    )}

                    {sample.tags?.length > 0 && (
                      <div className="sample-tags" aria-label="Sample tags">
                        {sample.tags.map((tag) => (
                          <span className="sample-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="sample-card-footer">
                    <span className="sample-type">WRITING SAMPLE</span>

                    <Link
                      to={`/samples/${sample.slug}`}
                      className="sample-link"
                      aria-label={`Open ${sample.title}`}
                    >
                      <span>
                        {category === "Blog & Articles"
                          ? "Read article"
                          : "View sample"}
                      </span>

                      <span
                        className="sample-link-arrow"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="samples-empty">
            No samples in this category yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
