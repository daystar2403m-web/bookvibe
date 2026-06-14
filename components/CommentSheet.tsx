"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Comment, Profile } from "@/types";
import Avatar from "./Avatar";

type Props = {
  postId: string;
  currentUser: Profile | null;
  onClose: () => void;
};

export default function CommentSheet({ postId, currentUser, onClose }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchComments();
    // realtime
    const channel = supabase
      .channel(`comments:${postId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "comments", filter: `post_id=eq.${postId}` },
        () => fetchComments()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [postId]);

  async function fetchComments() {
    const { data } = await supabase
      .from("comments")
      .select("*, profiles(*)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (data) setComments(data as Comment[]);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  async function submit() {
    if (!text.trim() || !currentUser) return;
    setLoading(true);
    await supabase.from("comments").insert({
      post_id: postId,
      user_id: currentUser.id,
      content: text.trim(),
    });
    setText("");
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#1a1a2e] rounded-t-2xl flex flex-col max-h-[75vh]">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>
        <p className="text-center text-white font-semibold text-sm pb-3 border-b border-white/10">
          Comments
        </p>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {comments.length === 0 && (
            <p className="text-white/30 text-sm text-center py-8">No comments yet. Be first!</p>
          )}
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar url={c.profiles?.avatar_url} username={c.profiles?.username} size={32} />
              <div className="flex-1">
                <span className="text-white/80 text-xs font-semibold mr-2">
                  @{c.profiles?.username}
                </span>
                <span className="text-white text-sm">{c.content}</span>
                <p className="text-white/30 text-[10px] mt-0.5">
                  {new Date(c.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-t border-white/10 bg-[#1a1a2e]">
          <Avatar url={currentUser?.avatar_url} username={currentUser?.username} size={32} />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Add a comment…"
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={submit}
            disabled={!text.trim() || loading}
            className="text-indigo-400 font-semibold text-sm disabled:opacity-30"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}