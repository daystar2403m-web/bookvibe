"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  targetUserId: string;
  currentUserId: string | null;
};

export default function FollowButton({ targetUserId, currentUserId }: Props) {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) { setLoading(false); return; }
    supabase
      .from("follows")
      .select("id")
      .eq("follower_id", currentUserId)
      .eq("following_id", targetUserId)
      .maybeSingle()
      .then(({ data }) => {
        setFollowing(!!data);
        setLoading(false);
      });
  }, [currentUserId, targetUserId]);

  async function toggle() {
    if (!currentUserId) return;
    setLoading(true);

    if (following) {
      await supabase
        .from("follows")
        .delete()
        .eq("follower_id", currentUserId)
        .eq("following_id", targetUserId);
      setFollowing(false);
    } else {
      await supabase.from("follows").insert({
        follower_id: currentUserId,
        following_id: targetUserId,
      });
      // bildirim gönder
      await supabase.from("notifications").insert({
        user_id: targetUserId,
        from_user_id: currentUserId,
        type: "follow",
      });
      setFollowing(true);
    }
    setLoading(false);
  }

  if (!currentUserId) return null;

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`px-5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
        following
          ? "bg-white/10 text-white border border-white/20"
          : "bg-indigo-600 text-white"
      } disabled:opacity-50`}
    >
      {loading ? "..." : following ? "Following" : "Follow"}
    </button>
  );
}