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

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    setCurrentUser(profile);

    const { data: postsData } = await supabase
      .from("posts")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })
      .limit(30);

    if (postsData && profile) {
      const { data: myLikes } = await supabase
        .from("likes")
        .select("post_id")
        .eq("user_id", profile.id);

      const likedIds = new Set(myLikes?.map((l) => l.post_id));
      setPosts(postsData.map((p) => ({ ...p, liked_by_me: likedIds.has(p.id) })));
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d12] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d12] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0d0d12]/95 backdrop-blur border-b border-white/5 flex items-center justify-between px-4 py-3">
        <span className="text-white font-bold text-lg">BookVibe</span>
        <div className="flex gap-1 text-sm font-medium">
          <button className="px-3 py-1 rounded-full text-white/40">Following</button>
          <button className="px-3 py-1 rounded-full bg-white/10 text-white">For You</button>
        </div>
        <button onClick={() => router.push("/search")} className="text-white/60">
          🔍
        </button>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 gap-3 text-center px-8">
          <p className="text-4xl">📭</p>
          <p className="text-white font-semibold">No posts yet</p>
          <p className="text-white/40 text-sm">Be the first to share something!</p>
          <button
            onClick={() => router.push("/create")}
            className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold"
          >
            Create Post
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