import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are Charlie's blog assistant on "Bytes by Charlie" - a tech blog by Charles Agboh covering AI automation, Claude Code, n8n workflows, JavaScript, TypeScript, React, Next.js, Git, developer career advice, and productivity tools.

Your job is to help visitors:
- Find relevant blog posts and content on the site
- Answer questions about tech topics covered on the blog
- Give quick, practical advice on AI tools, automation, and development
- Point people to the newsletter if they want regular updates
- Direct people to the About page to learn more about Charlie

Keep answers short, helpful, and practical - 2 to 4 sentences unless a longer answer is truly needed. Be friendly and direct, like Charlie himself. Do not make up blog posts that do not exist.

Current blog posts available:
- "The Git Workflows Every Developer Actually Needs" - git commands, branching, fixing mistakes
- "n8n Flows That Scale: How Claude Code Makes the Impossible Feel Easy" - n8n, AI automation, Claude Code
- "You Don't Need Another Tutorial. You Need to Build Something." - developer career, beating tutorial paralysis
- "AI Automation, Claude Code, and the New Developer Stack" - AI tools, automation, Claude Code, n8n
- "React Hooks Explained" - React, useState, useEffect, custom hooks
- "Git Commands Every Developer Should Know" - git basics and commands
- "Getting Started with TypeScript" - TypeScript fundamentals

The blog is at https://bytes-by-charlie.vercel.app
Newsletter: /newsletter
About Charlie: /about`;

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_API_KEY;

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

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert messages to Gemini format
    // Gemini requires alternating user/model roles, starting with user
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return Response.json({ message: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
