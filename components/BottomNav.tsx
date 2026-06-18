"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", icon: "🏠", label: "Ana Sayfa" },
    { href: "/feed", icon: "🧭", label: "Keşfet" },
    { href: "/create", icon: "✏️", label: "Yaz" },
    { href: "/notifications", icon: "🔔", label: "Bildirim" },
    { href: "/book/b1", icon: "📚", label: "Kitaplık" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-3 py-3 max-w-md mx-auto"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e7ebee",
      }}
    >
      {items.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href}>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
              style={
                isActive
                  ? { background: "#feb0c1", boxShadow: "0 4px 12px rgba(254,176,193,0.4)" }
                  : { background: "transparent" }
              }
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}