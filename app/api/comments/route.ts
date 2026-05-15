import { auth, currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/* GET /api/comments?slug=... */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return Response.json({ error: "Missing slug" }, { status: 400 });

  const supabase = getSupabase();
  if (!supabase) return Response.json({ comments: [] });

  const { data, error } = await supabase
    .from("comments")
    .select("id, user_name, user_image, body, created_at")
    .eq("post_slug", slug)
    .order("created_at", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ comments: data ?? [] });
}

/* POST /api/comments */
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = await currentUser();
  if (!user) return Response.json({ error: "User not found" }, { status: 401 });

  const { slug, body } = await req.json();
  if (!slug || !body?.trim()) {
    return Response.json({ error: "Missing slug or body" }, { status: 400 });
  }
  if (body.trim().length > 2000) {
    return Response.json({ error: "Comment too long (max 2000 chars)" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return Response.json({ error: "Comments not configured" }, { status: 503 });
  }

  const userName =
    user.fullName ||
    user.firstName ||
    user.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Anonymous";

  const userImage = user.imageUrl ?? null;

  const { data, error } = await supabase
    .from("comments")
    .insert({ post_slug: slug, user_id: userId, user_name: userName, user_image: userImage, body: body.trim() })
    .select("id, user_name, user_image, body, created_at")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ comment: data }, { status: 201 });
}

/* DELETE /api/comments?id=... */
export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const supabase = getSupabase();
  if (!supabase) return Response.json({ error: "Comments not configured" }, { status: 503 });

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .eq("user_id", userId); // Users can only delete their own comments

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
