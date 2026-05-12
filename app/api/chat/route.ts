import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Charlie's blog assistant on "Bytes by Charlie" — a tech blog by Charles Agboh covering AI automation, Claude Code, n8n workflows, JavaScript, TypeScript, React, Next.js, Git, developer career advice, and productivity tools.

Your job is to help visitors:
- Find relevant blog posts and content
- Answer questions about tech topics covered on the blog
- Give quick, practical advice on AI tools, automation, and development
- Point people to the newsletter if they want regular updates

Keep your answers short, helpful, and practical — 2 to 4 sentences max unless a longer answer is truly needed. Be friendly and direct, like Charlie himself. Do not make up blog posts that don't exist.

Current blog posts available:
- "The Git Workflows Every Developer Actually Needs" - git commands, branching, fixing mistakes
- "n8n Flows That Scale: How Claude Code Makes the Impossible Feel Easy" - n8n, AI automation, Claude Code
- "You Don't Need Another Tutorial. You Need to Build Something." - developer career, beating tutorial paralysis
- "AI Automation, Claude Code, and the New Developer Stack" - AI tools, automation, Claude Code, n8n
- "React Hooks Explained" - React, useState, useEffect, custom hooks
- "Git Commands Every Developer Should Know" - git basics and commands
- "Getting Started with TypeScript" - TypeScript fundamentals

The blog is at https://bytes-by-charlie.vercel.app. The newsletter is at /newsletter. The about page is at /about.`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Chat is not configured yet." },
      { status: 503 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10), // Keep last 10 messages for context
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return Response.json({ message: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
