"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Avatar from "@/components/Avatar";
import BottomNav from "@/components/BottomNav";
import type { Notification } from "@/types";

export default function NotificationsPage() {
  const router = useRouter();
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { init(); }, []);

  async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    const { data } = await supabase
      .from("notifications")
      .select("*, from_profile:profiles!notifications_from_user_id_fkey(*), post:posts(url,type)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    setNotifs((data as Notification[]) ?? []);

    // Hepsini okundu işaretle
    await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
    setLoading(false);
  }

  function notifText(n: Notification) {
    if (n.type === "like") return "liked your post ❤️";
    if (n.type === "comment") return "commented on your post 💬";
    if (n.type === "follow") return "started following you 👤";
    return "";
  }

  return (
    <div className="min-h-screen bg-[#0d0d12] pb-24">
      <div className="px-4 pt-12 pb-3 border-b border-white/5">
        <h1 className="text-white font-bold text-lg">Notifications</h1>
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : notifs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <p className="text-3xl">🔔</p>
          <p className="text-white/40 text-sm">No notifications yet</p>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {notifs.map((n) => (
            <div key={n.id} className={`flex items-center gap-3 px-4 py-3 ${!n.read ? "bg-indigo-950/30" : ""}`}>
              <Link href={`/profile/${n.from_profile?.username}`}>
                <Avatar url={n.from_profile?.avatar_url} username={n.from_profile?.username} size={40} />
              </Link>
              <div className="flex-1">
                <p className="text-white text-sm">
                  <span className="font-semibold">@{n.from_profile?.username}</span>{" "}
                  {notifText(n)}
                </p>
                <p className="text-white/30 text-xs mt-0.5">
                  {new Date(n.created_at).toLocaleDateString("tr-TR")}
                </p>
              </div>
              {n.post && (
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                  {n.post.type === "image" ? (
                    <img src={(n.post as any).url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <video src={(n.post as any).url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}