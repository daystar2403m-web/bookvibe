"use client";

import Image from "next/image";

type Props = {
  url?: string | null;
  username?: string | null;
  size?: number;
};

export default function Avatar({ url, username, size = 40 }: Props) {
  const initials = username ? username.slice(0, 2).toUpperCase() : "?";

  if (url) {
    return (
      <div
        className="rounded-full overflow-hidden bg-zinc-800 flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <img
          src={url}
          alt={username ?? "avatar"}
          width={size}
          height={size}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.35 }}>
        {initials}
      </span>
    </div>
  );
}