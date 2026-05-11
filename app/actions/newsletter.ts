"use server";

export async function subscribeToNewsletter(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  // If env vars aren't set yet, return a friendly message
  if (!apiKey || !groupId) {
    return {
      success: false,
      error: "Newsletter isn't connected yet - check back soon!",
    };
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // 409 = subscriber already exists - treat as success
      if (res.status === 409) {
        return { success: true };
      }
      return {
        success: false,
        error: data?.message || "Something went wrong. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
