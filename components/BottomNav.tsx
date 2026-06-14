"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BottomNav() {
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    checkUnread();
  }, [pathname]);

  async function checkUnread() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { count } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("read", false);
    setUnread(count ?? 0);
  }

  const items = [
    { href: "/", icon: "🏠", label: "Home" },
    { href: "/search", icon: "🔍", label: "Search" },
    { href: "/create", icon: "➕", label: "Create", highlight: true },
    { href: "/notifications", icon: "🔔", label: "Alerts", badge: unread },
    { href: "/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d12]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-2 py-2 max-w-md mx-auto">
      {items.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href}>
            <div className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              item.highlight
                ? "bg-indigo-600 text-white px-4 -translate-y-1 shadow-lg shadow-indigo-500/30"
                : isActive
                ? "text-white"
                : "text-white/30"
            }`}>
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}