"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PostCard from "@/components/PostCard";
import BottomNav from "@/components/BottomNav";
import type { Post, Profile } from "@/types";

export default function FeedPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { init(); }, []);

  async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    const { data: profile } = await supabase
      .from("profiles").select("*").eq("id", user.id).single();
    setCurrentUser(profile);

    const { data: postsData } = await supabase
      .from("posts")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })
      .limit(30);

    if (postsData && profile) {
      const { data: myLikes } = await supabase
        .from("likes").select("post_id").eq("user_id", profile.id);
      const likedIds = new Set(myLikes?.map((l) => l.post_id));
      setPosts(postsData.map((p) => ({ ...p, liked_by_me: likedIds.has(p.id) })));
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#1e2a35" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin"
            style={{ borderColor: "#ECC4C3", borderTopColor: "transparent" }} />
          <p className="font-serif text-muted italic text-sm">Opening the pages…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: "#2D3A47" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(30, 42, 53, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(169, 183, 198, 0.1)",
        }}
      >
        <h1 className="font-serif text-xl" style={{ color: "#ECC4C3" }}>BookVibe</h1>
        <div className="flex gap-1 text-sm font-medium">
          <button className="px-3 py-1 rounded-full text-muted/50 text-xs">Following</button>
          <button
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(236, 196, 195, 0.15)", color: "#ECC4C3" }}
          >
            For You
          </button>
        </div>
        <button onClick={() => router.push("/search")} style={{ color: "#A9B7C6" }}>
          🔍
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 gap-4 text-center px-8">
          <span className="text-5xl">📭</span>
          <h3 className="font-serif text-xl text-text">No stories yet</h3>
          <p className="text-muted text-sm">Be the first to share something beautiful</p>
          <button
            onClick={() => router.push("/create")}
            className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold text-deep"
            style={{ background: "linear-gradient(135deg, #ECC4C3, #B97D7B)" }}
          >
            Share Something
          </button>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} currentUser={currentUser} />
        ))
      )}

      <BottomNav />
    </div>
  );
}