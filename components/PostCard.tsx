"use client";

import { useState } from "react";
import Link from "next/link";
import Avatar from "./Avatar";
import CommentSheet from "./CommentSheet";
import { supabase } from "@/lib/supabase";
import type { Post, Profile } from "@/types";

type Props = {
  post: Post;
  currentUser: Profile | null;
  onLikeToggle?: (postId: string, liked: boolean) => void;
};

export default function PostCard({ post, currentUser, onLikeToggle }: Props) {
  const [liked, setLiked] = useState(post.liked_by_me ?? false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [showComments, setShowComments] = useState(false);

  async function toggleLike() {
    if (!currentUser) return;
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((c) => c + (newLiked ? 1 : -1));

    if (newLiked) {
      await supabase.from("likes").insert({ user_id: currentUser.id, post_id: post.id });
      await supabase.from("posts").update({ likes_count: likesCount + 1 }).eq("id", post.id);
      if (post.user_id !== currentUser.id) {
        await supabase.from("notifications").insert({
          user_id: post.user_id,
          from_user_id: currentUser.id,
          type: "like",
          post_id: post.id,
        });
      }
    } else {
      await supabase.from("likes").delete().eq("user_id", currentUser.id).eq("post_id", post.id);
      await supabase.from("posts").update({ likes_count: likesCount - 1 }).eq("id", post.id);
    }
    onLikeToggle?.(post.id, newLiked);
  }

  return (
    <>
      <div className="bg-[#0d0d12] border-b border-white/5">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href={`/profile/${post.profiles?.username}`}>
            <Avatar url={post.profiles?.avatar_url} username={post.profiles?.username} size={36} />
          </Link>
          <div className="flex-1">
            <Link href={`/profile/${post.profiles?.username}`}>
              <p className="text-white text-sm font-semibold">@{post.profiles?.username}</p>
            </Link>
            <p className="text-white/30 text-[10px]">
              {new Date(post.created_at).toLocaleDateString("tr-TR")}
            </p>
          </div>
          <button className="text-white/40">···</button>
        </div>

        {/* Media */}
        <div className="relative w-full aspect-square bg-zinc-900">
          {post.type === "image" ? (
            <img src={post.url} alt={post.caption ?? ""} className="w-full h-full object-cover" />
          ) : (
            <video
              src={post.url}
              className="w-full h-full object-cover"
              controls
              playsInline
              muted
            />
          )}
        </div>

        {/* Actions */}
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center gap-5 mb-2">
            <button onClick={toggleLike} className="transition-transform active:scale-90">
              <span className={`text-2xl ${liked ? "" : "grayscale opacity-60"}`}>❤️</span>
            </button>
            <button onClick={() => setShowComments(true)}>
              <span className="text-2xl opacity-60">💬</span>
            </button>
            <button>
              <span className="text-2xl opacity-60">↗️</span>
            </button>
            <div className="flex-1" />
            <button>
              <span className="text-2xl opacity-60">🔖</span>
            </button>
          </div>
          <p className="text-white text-sm font-semibold">{likesCount.toLocaleString()} likes</p>
          {post.caption && (
            <p className="text-white text-sm mt-0.5">
              <span className="font-semibold mr-1">@{post.profiles?.username}</span>
              {post.caption}
            </p>
          )}
          {post.comments_count > 0 && (
            <button
              onClick={() => setShowComments(true)}
              className="text-white/40 text-xs mt-1"
            >
              View all {post.comments_count} comments
            </button>
          )}
        </div>
      </div>

      {showComments && (
        <CommentSheet
          postId={post.id}
          currentUser={currentUser}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
}