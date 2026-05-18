/* ─────────────────────────────────────────────────────────────
   Vercel Cron Job - runs daily at 7:00 UTC (8:00 AM WAT)
   Generates a blog post via Groq and pushes it to GitHub.
   Vercel auto-deploys on every push, so the post goes live
   within ~60 seconds of this function completing.
───────────────────────────────────────────────────────────── */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GITHUB_REPO = "Challyboi/bytes-by-charlie";
const GITHUB_API = "https://api.github.com";

const TOPICS = [
  "React performance optimisation and useMemo",
  "Next.js App Router patterns and best practices",
  "Building n8n automation workflows step by step",
  "Claude Code agentic workflows for developers",
  "JavaScript async/await patterns and error handling",
  "TypeScript generics explained with real examples",
  "Git branching strategies for solo developers",
  "AI tools that save developers hours every week",
  "Email marketing automation with Klaviyo",
  "How to build a second brain as a developer",
  "CSS grid layout patterns every developer should know",
  "Node.js tips for building fast APIs",
  "Developer productivity with keyboard shortcuts and tooling",
  "How to think in systems as a developer",
  "Building in public - lessons from shipping real projects",
  "Prompt engineering tips for developers using Claude",
  "n8n vs Zapier - when to use each and why",
  "React Server Components explained simply",
  "Virtual assistant tools and automation for freelancers",
  "JavaScript array methods you should use more",
];

const COVER_COLORS = [
  "#6366f1", "#f59e0b", "#10b981", "#ef4444",
  "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316",
];

const UNSPLASH_PHOTOS = [
  // Code & dev setup
  "photo-1517694712202-14dd9538aa97",
  "photo-1555066931-4365d14bab8c",
  "photo-1461749280684-dccba630e2f6",
  "photo-1504639725590-34d0984388bd",
  "photo-1542831371-29b0f74f9713",
  "photo-1587620962725-abab7fe55159",
  "photo-1593720213428-28a5b9e94613",
  "photo-1537432376769-00f5c2f4c8d2",
  "photo-1571171637578-41bc2dd41cd2",
  "photo-1526374965328-7f61d4dc18c5",
  // AI & tech abstract
  "photo-1620712943543-bcc4688e7485",
  "photo-1677442135703-1787eea5ce01",
  "photo-1676299081847-824916de030a",
  "photo-1655635643532-fa9ba2648cbe",
  "photo-1666875753105-c63a6f3bdc86",
  // Workspace & productivity
  "photo-1518432031352-d6fc5c10da5a",
  "photo-1551288049-bebda4e38f71",
  "photo-1484480974693-6ca0a78fb36b",
  "photo-1499750310107-5fef28a66643",
  "photo-1522202176988-66273c2fd55f",
  "photo-1498050108023-c5249f4df085",
  "photo-1488190211105-8b0e65b80b4e",
  "photo-1454165804606-c3d57bc86b40",
  "photo-1488229297570-58520851e868",
  // Data & automation
  "photo-1556075798-4825dfaaf498",
  "photo-1618401471353-b98afee0b2eb",
  "photo-1558494949-ef010cbdcc31",
  "photo-1518770660439-4636190af475",
  "photo-1573164713714-d95e436ab8d6",
  "photo-1607799279861-4dd421887fb3",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getTodayISO(): string {
  const now = new Date();
  return now.toISOString().replace("Z", "").split(".")[0];
}

/* ── 1. Fetch existing post slugs from GitHub ─────────────── */
async function getExistingPosts(token: string): Promise<string[]> {
  const res = await fetch(
    `${GITHUB_API}/repos/${GITHUB_REPO}/contents/content/posts`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) return [];
  const files = await res.json() as { name: string }[];
  return files.map((f) => f.name.replace(".mdx", ""));
}

/* ── 2. Generate post content via Groq ────────────────────── */
async function generatePost(
  groqKey: string,
  topic: string,
  existingSlugs: string[],
  photo1: string,
  photo2: string,
  coverColor: string
): Promise<{ title: string; slug: string; content: string }> {

  const date = getTodayISO();

  const prompt = `Write a complete, publish-ready tech blog post for "Bytes by Charlie" on this topic: "${topic}".

Charles Agboh (Charlie) writes this blog. He covers AI automation, Claude Code, n8n, JavaScript, TypeScript, React, Next.js, Git, career advice, and productivity tools. His voice is practical, direct, and opinionated - no fluff.

EXISTING POSTS (do not repeat these topics):
${existingSlugs.join(", ")}

OUTPUT FORMAT - return the complete MDX file content exactly like this, nothing before or after:

---
title: "Your Title Here"
date: "${date}"
description: "One or two sentence compelling description."
tags: ["tag1", "tag2", "tag3"]
coverColor: "${coverColor}"
---

Opening hook paragraph that grabs the reader immediately.

<ImageCaption
  src="https://images.unsplash.com/photo-${photo1}?w=1200&q=80"
  alt="descriptive alt text"
  caption="A relevant caption for this image."
/>

---

## First Major Section

Content here...

<Callout type="fire">
Key insight or pro tip here.
</Callout>

## Second Major Section

Content with a code example if relevant:

\`\`\`javascript
// real code example here
\`\`\`

<Callout type="tip">
Practical tip here.
</Callout>

## Third Major Section

More content...

<ImageCaption
  src="https://images.unsplash.com/photo-${photo2}?w=1200&q=80"
  alt="descriptive alt text"
  caption="A relevant caption."
/>

## Fourth Section

More content...

<Callout type="info">
Something good to know.
</Callout>

## Closing Section

Final punchy paragraph and call to action. End with a single sentence on its own line followed by an emoji.

RULES:
- 700 to 1000 words total
- NO em dashes (use hyphens or rephrase)
- NO filler openers like "In this article" or "In conclusion"
- Use real, accurate code examples where relevant
- Tags should be 2-4 lowercase tags from: javascript, typescript, react, nextjs, git, ai, automation, tools, career, beginners, frontend
- Keep Charlie's voice: direct, practical, confident`;

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2048,
      temperature: 0.8,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq error: ${err}`);
  }

  const data = await res.json() as {
    choices: { message: { content: string } }[];
  };
  const content = data.choices[0]?.message?.content?.trim() ?? "";

  // Extract title from frontmatter
  const titleMatch = content.match(/^title:\s*"(.+)"/m);
  const title = titleMatch?.[1] ?? topic;
  const slug = slugify(title);

  return { title, slug, content };
}

/* ── 3. Push file to GitHub ───────────────────────────────── */
async function pushToGitHub(
  token: string,
  slug: string,
  title: string,
  content: string
): Promise<void> {
  const path = `content/posts/${slug}.mdx`;
  const encoded = Buffer.from(content).toString("base64");

  const res = await fetch(
    `${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `post: ${title}`,
        content: encoded,
        branch: "main",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub error: ${err}`);
  }
}

/* ── Main handler ─────────────────────────────────────────── */
export async function GET(req: Request) {
  // Verify this is a legitimate Vercel cron request
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const groqKey = process.env.GROQ_API_KEY;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!groqKey || !githubToken) {
    return Response.json(
      { error: "Missing GROQ_API_KEY or GITHUB_TOKEN" },
      { status: 500 }
    );
  }

  try {
    // Get existing posts to avoid repeating topics
    const existingSlugs = await getExistingPosts(githubToken);

    // Pick a random topic and assets
    const topic = pickRandom(TOPICS);
    const photo1 = pickRandom(UNSPLASH_PHOTOS);
    const photo2 = pickRandom(UNSPLASH_PHOTOS.filter((p) => p !== photo1));
    const coverColor = pickRandom(COVER_COLORS);

    // Generate the post
    const { title, slug, content } = await generatePost(
      groqKey, topic, existingSlugs, photo1, photo2, coverColor
    );

    // Push to GitHub - Vercel auto-deploys from there
    await pushToGitHub(githubToken, slug, title, content);

    console.log(`Published: ${title} (${slug})`);

    return Response.json({
      success: true,
      post: { title, slug, topic },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Cron post error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
