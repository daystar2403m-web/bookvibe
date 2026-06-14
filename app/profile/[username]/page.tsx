"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Avatar from "@/components/Avatar";
import FollowButton from "@/components/FollowButton";
import BottomNav from "@/components/BottomNav";
import type { Post, Profile } from "@/types";

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { init(); }, [username]);

  async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id ?? null);

    const { data: p } = await supabase.from("profiles").select("*").eq("username", username).single();
    if (!p) { router.push("/"); return; }
    setProfile(p);

    // Kendi profiliyse kendi sayfasına yönlendir
    if (user?.id === p.id) { router.push("/profile"); return; }

    const { data: userPosts } = await supabase
      .from("posts").select("*").eq("user_id", p.id).order("created_at", { ascending: false });
    setPosts(userPosts ?? []);

    const { count: fCount } = await supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", p.id);
    const { count: fgCount } = await supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", p.id);
    setFollowers(fCount ?? 0);
    setFollowing(fgCount ?? 0);
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
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-white/5">
        <button onClick={() => router.back()} className="text-white/60">←</button>
        <span className="text-white font-bold">@{profile?.username}</span>
      </div>

      <div className="px-4 py-5 space-y-4">
        <div className="flex items-center gap-5">
          <Avatar url={profile?.avatar_url} username={profile?.username} size={72} />
          <div className="flex gap-6 flex-1 justify-around">
            <div className="text-center">
              <p className="text-white font-bold text-lg">{posts.length}</p>
              <p className="text-white/40 text-xs">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">{followers}</p>
              <p className="text-white/40 text-xs">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">{following}</p>
              <p className="text-white/40 text-xs">Following</p>
            </div>
          </div>
        </div>

        {profile?.full_name && <p className="text-white font-semibold text-sm">{profile.full_name}</p>}
        {profile?.bio && <p className="text-white/70 text-sm">{profile.bio}</p>}

        <FollowButton targetUserId={profile!.id} currentUserId={currentUserId} />
      </div>

      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((post) => (
          <div key={post.id} className="relative aspect-square bg-zinc-900">
            {post.type === "image" ? (
              <img src={post.url} alt="" className="w-full h-full object-cover" />
            ) : (
              <video src={post.url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}