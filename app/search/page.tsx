"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Avatar from "@/components/Avatar";
import BottomNav from "@/components/BottomNav";
import type { Profile, Post } from "@/types";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<Profile[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [tab, setTab] = useState<"explore" | "users">("explore");
  const [loading, setLoading] = useState(false);
  const [explorePosts, setExplorePosts] = useState<Post[]>([]);

  useEffect(() => {
    loadExplore();
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) { setUsers([]); setPosts([]); return; }
    const t = setTimeout(search, 300);
    return () => clearTimeout(t);
  }, [query]);

  async function loadExplore() {
    const { data } = await supabase
      .from("posts")
      .select("*, profiles(*)")
      .order("likes_count", { ascending: false })
      .limit(24);
    setExplorePosts(data ?? []);
  }

  async function search() {
    setLoading(true);
    const [{ data: uData }, { data: pData }] = await Promise.all([
      supabase.from("profiles").select("*").ilike("username", `%${query}%`).limit(10),
      supabase.from("posts").select("*, profiles(*)").ilike("caption", `%${query}%`).limit(20),
    ]);
    setUsers(uData ?? []);
    setPosts(pData ?? []);
    setLoading(false);
  }

  const isSearching = query.trim().length >= 2;

  return (
    <div className="min-h-screen bg-[#0d0d12] pb-24">
      {/* Search bar */}
      <div className="sticky top-0 z-20 bg-[#0d0d12]/95 backdrop-blur px-4 pt-12 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
          <span className="text-white/40">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users or posts…"
            className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-white/30 text-xs">✕</button>
          )}
        </div>

        {isSearching && (
          <div className="flex gap-1 mt-3">
            {(["explore", "users"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  tab === t ? "bg-indigo-600 text-white" : "bg-white/5 text-white/50"
                }`}
              >
                {t === "explore" ? "Posts" : "Users"}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Results */}
      {isSearching ? (
        tab === "users" ? (
          <div className="divide-y divide-white/5">
            {users.map((u) => (
              <Link key={u.id} href={`/profile/${u.username}`}>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/5">
                  <Avatar url={u.avatar_url} username={u.username} size={44} />
                  <div>
                    <p className="text-white text-sm font-semibold">@{u.username}</p>
                    {u.full_name && <p className="text-white/50 text-xs">{u.full_name}</p>}
                  </div>
                </div>
              </Link>
            ))}
            {users.length === 0 && !loading && (
              <p className="text-white/30 text-sm text-center py-12">No users found</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5 mt-0.5">
            {posts.map((post) => (
              <div key={post.id} className="relative aspect-square bg-zinc-900">
                {post.type === "image" ? (
                  <img src={post.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <video src={post.url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                )}
              </div>
            ))}
            {posts.length === 0 && !loading && (
              <p className="text-white/30 text-sm text-center py-12 col-span-3">No posts found</p>
            )}
          </div>
        )
      ) : (
        /* Explore grid */
        <div>
          <p className="text-white/30 text-xs uppercase tracking-widest px-4 py-3">Explore</p>
          <div className="grid grid-cols-3 gap-0.5">
            {explorePosts.map((post) => (
              <div key={post.id} className="relative aspect-square bg-zinc-900">
                {post.type === "image" ? (
                  <img src={post.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <video src={post.url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                    <div className="absolute top-1 right-1 text-white text-xs">▶</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}