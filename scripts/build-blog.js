// Reads posts/*.md, renders each to blog/<slug>/index.html, rebuilds blog/index.html,
// and refreshes the "latest writing" section on the homepage (between the BLOG_POSTS markers).

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "posts");
const BLOG_DIR = path.join(ROOT, "blog");
const HOME_FILE = path.join(ROOT, "index.html");
const SITE_URL = "https://paskvan.eu";

const STATIC_PAGES = ["/", "/blog/", "/projects/calgebra/", "/projects/svgynths/"];

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      if (!data.title || !data.date) {
        throw new Error(`posts/${file} is missing required front matter: title and date`);
      }
      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description || "",
        tags: data.tags || [],
        html: marked.parse(content),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function headerNav() {
  return `    <header class="container mx-auto px-4 py-6 animate-slide-down-fade-in motion-reduce:animate-none">
        <nav class="flex items-center justify-between">
            <div class="flex items-center">
                <a href="/index.html" class="flex items-center">
                    <img src="/assets/logo.svg" alt="Logo" class="h-12 w-auto mr-4" />
                    <ul>
                        <li class="leading-tight">
                            Dino <strong class="font-bold">Paškvan</strong><br />
                            <span class="text-sm text-muted font-mono">systems engineer &amp; developer</span>
                        </li>
                    </ul>
                </a>
            </div>
            <div class="flex items-center space-x-5">
                <a href="/blog/" class="font-mono text-sm text-muted hover:text-accent transition-colors duration-200">blog</a>
                <a href="https://www.linkedin.com/in/dpaskvan/" aria-label="LinkedIn Profile" target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <img src="/assets/icons/linkedin.svg" class="h-5 w-5 align-middle" alt="LinkedIn" />
                </a>
                <a href="https://github.com/dpskvn" aria-label="View GitHub Profile" target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block opacity-60 hover:opacity-100 transition-opacity duration-200">
                    <img src="/assets/icons/github.svg" class="h-5 w-5 align-middle" alt="GitHub" />
                </a>
            </div>
        </nav>
    </header>`;
}

function footer() {
  return `    <footer
        class="container mx-auto px-4 py-6 mt-0 border-t border-line text-center flex-shrink-0 animate-fade-in-footer opacity-0 motion-reduce:animate-none motion-reduce:opacity-100">
        <small class="font-mono text-muted">&copy; 2026 Dino Paškvan</small>
    </footer>`;
}

function page({ title, description, url, body }) {
  const desc = description || "Notes on systems and software.";
  return `<!doctype html>
<html lang="en" class="bg-paper text-ink font-sans scroll-smooth">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | Dino Paškvan</title>
    <meta name="description" content="${desc}" />
    <link rel="icon" type="image/svg+xml" href="/assets/logo.svg" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title} | Dino Paškvan" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title} | Dino Paškvan" />
    <meta name="twitter:description" content="${desc}" />
    <link rel="alternate" type="application/rss+xml" title="Dino Paškvan's Blog" href="/feed.xml" />
    <link rel="stylesheet" href="/css/style.css" />
</head>

<body class="flex flex-col min-h-screen">
${headerNav()}

${body}

${footer()}
</body>

</html>
`;
}

function postPage(post) {
  const tagList = post.tags.length
    ? `<span class="font-mono text-xs text-muted tracking-wide">${post.tags.join(" &middot; ")}</span>`
    : "";
  const body = `    <main class="container mx-auto px-4 py-6 flex-grow animate-fade-in-main opacity-0 motion-reduce:animate-none motion-reduce:opacity-100">
        <section class="py-6">
            <p class="font-mono text-sm text-accent mb-2 text-center">// blog / ${post.slug}</p>
            <h1 class="font-mono text-3xl font-bold mb-3 text-center text-ink">${post.title}</h1>
            <p class="font-mono text-sm text-muted text-center mb-8">${formatDate(post.date)}</p>

            <div class="max-w-3xl mx-auto">
                <article class="bg-surface rounded-md p-8 border border-line prose-site prose">
${post.html}
                </article>
                ${tagList ? `<div class="mt-6">${tagList}</div>` : ""}
                <div class="text-center mt-10">
                    <a href="/blog/" class="font-mono text-sm text-accent hover:underline">&larr; back to blog</a>
                </div>
            </div>
        </section>
    </main>`;
  return page({
    title: post.title,
    description: post.description,
    url: `https://paskvan.eu/blog/${post.slug}/`,
    body,
  });
}

function postCard(post) {
  return `                <article class="bg-surface rounded-md p-6 flex flex-col border border-line transition-colors duration-200 ease-in-out hover:border-accent hover:bg-surface-hover">
                    <p class="font-mono text-xs text-muted mb-2">${formatDate(post.date)}</p>
                    <h3 class="font-mono text-lg font-semibold text-ink mb-2">${post.title}</h3>
                    <p class="text-muted mb-6">${post.description}</p>
                    <footer class="mt-auto pt-4 flex justify-between items-end border-t border-line">
                        ${post.tags.length ? `<span class="font-mono text-xs text-muted tracking-wide">${post.tags.join(" &middot; ")}</span>` : "<span></span>"}
                        <a href="/blog/${post.slug}/" class="font-mono text-sm text-accent hover:underline">read &rarr;</a>
                    </footer>
                </article>`;
}

function blogIndexPage(posts) {
  const cards = posts.length
    ? posts.map((p) => postCard(p)).join("\n")
    : `                <p class="font-mono text-sm text-muted">// no posts yet</p>`;
  const body = `    <main class="container mx-auto px-4 py-6 flex-grow animate-fade-in-main opacity-0 motion-reduce:animate-none motion-reduce:opacity-100">
        <section class="py-6">
            <p class="font-mono text-sm text-accent mb-2">// blog</p>
            <h2 class="text-2xl font-semibold mb-8">Things I've written</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
${cards}
            </div>
            <div class="mt-8">
                <a href="/index.html" class="font-mono text-sm text-accent hover:underline">&larr; back home</a>
            </div>
        </section>
    </main>`;
  return page({ title: "Blog", description: "Notes on systems and software.", url: "https://paskvan.eu/blog/", body });
}

function updateHomepage(posts) {
  const html = fs.readFileSync(HOME_FILE, "utf8");
  const latest = posts.slice(0, 3);
  const cards = latest.length
    ? latest.map((p) => postCard(p)).join("\n")
    : `                <p class="font-mono text-sm text-muted">// no posts yet</p>`;
  const marker = /<!-- BLOG_POSTS_START -->[\s\S]*<!-- BLOG_POSTS_END -->/;
  if (!marker.test(html)) {
    console.warn("index.html has no BLOG_POSTS markers; skipping homepage update.");
    return;
  }
  const updated = html.replace(marker, `<!-- BLOG_POSTS_START -->\n${cards}\n                <!-- BLOG_POSTS_END -->`);
  fs.writeFileSync(HOME_FILE, updated);
}

function xmlEscape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sitemapXml(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const staticUrls = STATIC_PAGES.map(
    (p) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  );
  const postUrls = posts.map(
    (post) => `  <url>
    <loc>${SITE_URL}/blog/${post.slug}/</loc>
    <lastmod>${new Date(post.date).toISOString().slice(0, 10)}</lastmod>
  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].join("\n")}
</urlset>
`;
}

function feedXml(posts) {
  const items = posts
    .map(
      (post) => `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid>${SITE_URL}/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${xmlEscape(post.description)}</description>
    </item>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Dino Paškvan's Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Notes on systems and software.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
}

function main() {
  const posts = loadPosts();

  fs.rmSync(BLOG_DIR, { recursive: true, force: true });
  fs.mkdirSync(BLOG_DIR, { recursive: true });

  for (const post of posts) {
    const dir = path.join(BLOG_DIR, post.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), postPage(post));
  }

  fs.writeFileSync(path.join(BLOG_DIR, "index.html"), blogIndexPage(posts));
  updateHomepage(posts);
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemapXml(posts));
  fs.writeFileSync(path.join(ROOT, "feed.xml"), feedXml(posts));

  console.log(`Built ${posts.length} post(s).`);
}

main();
