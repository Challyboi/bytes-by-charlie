"use server";

export async function subscribeToNewsletter(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const dc = process.env.MAILCHIMP_DC; // e.g. "us1", "us21"

  // If env vars aren't set yet, return a friendly message
  if (!apiKey || !listId || !dc) {
    return {
      success: false,
      error: "Newsletter isn't connected yet  -  check back soon!",
    };
  }

  try {
    const res = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    );

    const data = await res.json().catch(() => ({}));

    // 400 with "Member Exists" title means already subscribed  -  treat as success
    if (!res.ok) {
      if (data?.title === "Member Exists") {
        return { success: true };
      }
      return {
        success: false,
        error: data?.detail || "Something went wrong. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
