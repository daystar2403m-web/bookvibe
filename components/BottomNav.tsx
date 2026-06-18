"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CompassIcon, PenLineIcon, BellIcon, LibraryIcon } from "./BottomNavIcons";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", Icon: HomeIcon },
    { href: "/feed", Icon: CompassIcon },
    { href: "/create", Icon: PenLineIcon },
    { href: "/notifications", Icon: BellIcon },
    { href: "/book/b1", Icon: LibraryIcon },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-3 py-3 max-w-md mx-auto"
      style={{ background: "#ffffff", borderTop: "1px solid #e7ebee" }}
    >
      {items.map(({ href, Icon }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link key={href} href={href}>
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
              style={isActive ? { background: "#feb0c1" } : { background: "transparent" }}
            >
              <Icon size={20} color="#1a1a2e" strokeWidth={1.8} />
            </div>
          </Link>
        );
      })}
    </nav>
  );
}