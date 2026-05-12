const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are Charlie's blog assistant on "Bytes by Charlie" - a tech blog by Charles Agboh covering AI automation, Claude Code, n8n workflows, JavaScript, TypeScript, React, Next.js, Git, developer career advice, and productivity tools.

Your job is to help visitors:
- Find relevant blog posts and content on the site
- Answer questions about tech topics covered on the blog
- Give quick, practical advice on AI tools, automation, and development
- Point people to the newsletter if they want regular updates
- Direct people to the About page to learn more about Charlie

Keep answers short, helpful, and practical - 2 to 4 sentences unless a longer answer is truly needed. Be friendly and direct, like Charlie himself.

Current blog posts available:
- "The Git Workflows Every Developer Actually Needs" - git commands, branching, fixing mistakes
- "n8n Flows That Scale: How Claude Code Makes the Impossible Feel Easy" - n8n, AI automation, Claude Code
- "You Don't Need Another Tutorial. You Need to Build Something." - developer career, beating tutorial paralysis
- "AI Automation, Claude Code, and the New Developer Stack" - AI tools, automation, Claude Code, n8n
- "React Hooks Explained" - React, useState, useEffect, custom hooks
- "Git Commands Every Developer Should Know" - git basics and commands
- "Getting Started with TypeScript" - TypeScript fundamentals

The blog is at https://bytes-by-charlie.vercel.app. Newsletter: /newsletter. About: /about.`;

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY is not set in environment variables." },
      { status: 503 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    // Build messages for Groq (OpenAI-compatible format)
    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages
        .filter((m: { role: string; content: string }) => m.content?.trim())
        .map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
    ];

    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: groqMessages,
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json(
        { error: `Groq API error: ${err}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? "No response.";

    return Response.json({ message: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Chat API error:", message);
    return Response.json({ error: `Error: ${message}` }, { status: 500 });
  }
}
