"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Avatar from "@/components/Avatar";
import BottomNav from "@/components/BottomNav";
import type { Post, Profile } from "@/types";

export default function MyProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { init(); }, []);

  async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setProfile(p);
    setBio(p?.bio ?? "");
    setFullName(p?.full_name ?? "");

    const { data: userPosts } = await supabase
      .from("posts").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setPosts(userPosts ?? []);

    const { count: fCount } = await supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", user.id);
    const { count: fgCount } = await supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", user.id);
    setFollowers(fCount ?? 0);
    setFollowing(fgCount ?? 0);
    setLoading(false);
  }

  async function saveProfile() {
    if (!profile) return;
    await supabase.from("profiles").update({ bio, full_name: fullName }).eq("id", profile.id);
    setProfile((p) => p ? { ...p, bio, full_name: fullName } : p);
    setEditing(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/auth");
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
      <div className="flex items-center justify-between px-4 pt-12 pb-3 border-b border-white/5">
        <span className="text-white font-bold">@{profile?.username}</span>
        <div className="flex gap-3">
          <button onClick={() => setEditing(true)} className="text-white/50 text-sm">Edit</button>
          <button onClick={signOut} className="text-white/50 text-sm">Sign out</button>
        </div>
      </div>

      {/* Profile info */}
      <div className="px-4 py-5 space-y-4">
        <div className="flex items-center gap-5">
          <Avatar url={profile?.avatar_url} username={profile?.username} size={72} />
          <div className="flex gap-6 flex-1 justify-around">
            <Stat label="Posts" value={posts.length} />
            <Stat label="Followers" value={followers} />
            <Stat label="Following" value={following} />
          </div>
        </div>

        {!editing ? (
          <div>
            {profile?.full_name && <p className="text-white font-semibold text-sm">{profile.full_name}</p>}
            {profile?.bio && <p className="text-white/70 text-sm mt-0.5">{profile.bio}</p>}
          </div>
        ) : (
          <div className="space-y-3">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
            <div className="flex gap-3">
              <button onClick={saveProfile} className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-sm font-semibold">Save</button>
              <button onClick={() => setEditing(false)} className="flex-1 bg-white/5 text-white/60 py-2 rounded-xl text-sm">Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((post) => (
          <div key={post.id} className="relative aspect-square bg-zinc-900">
            {post.type === "image" ? (
              <img src={post.url} alt="" className="w-full h-full object-cover" />
            ) : (
              <video src={post.url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
            )}
            {post.type === "video" && (
              <div className="absolute top-1 right-1 text-white text-xs">▶</div>
            )}
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <p className="text-3xl">📷</p>
          <p className="text-white/40 text-sm">No posts yet</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-white font-bold text-lg">{value}</p>
      <p className="text-white/40 text-xs">{label}</p>
    </div>
  );
}