import { GoogleGenerativeAI } from "@google/generative-ai";

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
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "GOOGLE_API_KEY is not set in environment variables." },
      { status: 503 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build a single prompt string that includes all context
    // This avoids Gemini's strict history format requirements
    const conversationText = messages
      .map((m: { role: string; content: string }) => {
        const label = m.role === "user" ? "User" : "Assistant";
        return `${label}: ${m.content}`;
      })
      .join("\n\n");

    const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation so far:\n${conversationText}\n\nAssistant:`;

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    return Response.json({ message: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Chat API error:", message);
    return Response.json(
      { error: `API error: ${message}` },
      { status: 500 }
    );
  }
}
