
const files = import.meta.glob("../articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, "").trimStart();

  const match = normalized.match(
    /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/
  );

  if (!match) {
    console.warn("Frontmatter not found:", normalized.slice(0, 100));

    return {
      metadata: {},
      content: normalized.trim(),
    };
  }

  const metadata = {};

  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");

    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    metadata[key] = value;
  }

  return {
    metadata,
    content: normalized.slice(match[0].length).trim(),
  };
}

function cleanValue(value = "") {
  return value.trim().replace(/^(['"])(.*)\1$/, "$2");
}

function parseTags(value = "") {
  const trimmed = value.trim();

  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
    return trimmed ? [cleanValue(trimmed)] : [];
  }

  const inner = trimmed.slice(1, -1);
  const matches = inner.match(/"[^"]*"|'[^']*'|[^,]+/g) || [];

  return matches
    .map((tag) => cleanValue(tag))
    .filter(Boolean);
}

export const samples = Object.entries(files).map(([path, raw]) => {
  const slug = path.split("/").pop().replace(/\.md$/, "");
  const { metadata, content } = parseFrontmatter(raw);

  return {
    slug,
    title: cleanValue(metadata.title) || slug.replace(/-/g, " "),
    category: cleanValue(metadata.category) || "Writing",
    description: cleanValue(metadata.description),
    date: cleanValue(metadata.date),
    tags: parseTags(metadata.tags),
    content,
  };
});
