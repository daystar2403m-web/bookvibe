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
    { href: "/create", icon: "✦", label: "Create", highlight: true },
    { href: "/notifications", icon: "🔔", label: "Alerts", badge: unread },
    { href: "/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-3 max-w-md mx-auto"
      style={{
        background: "rgba(30, 42, 53, 0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(169, 183, 198, 0.1)",
      }}
    >
      {items.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href}>
            <div className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              item.highlight ? "-translate-y-1" : ""
            }`}>
              {item.highlight ? (
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #ECC4C3, #B97D7B)" }}
                >
                  <span className="text-deep text-xl font-bold">{item.icon}</span>
                </div>
              ) : (
                <>
                  <span className={`text-xl leading-none transition-all ${isActive ? "scale-110" : ""}`}>
                    {item.icon}
                  </span>
                  <span className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-accent" : "text-muted/50"
                  }`}>
                    {item.label}
                  </span>
                </>
              )}
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent2 text-deep text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
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