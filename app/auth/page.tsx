"use client";

export const dynamic = "force-dynamic";
export const runtime = "edge";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) { setError(error.message); setLoading(false); return; }
      setDone(true);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push("/feed");
      router.refresh();
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-deep flex flex-col items-center justify-center px-6 text-center gap-5">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
          <span className="text-4xl">📬</span>
        </div>
        <h2 className="font-serif text-2xl text-text">Check your email</h2>
        <p className="text-muted text-sm leading-relaxed">
          We sent a confirmation link to<br />
          <strong className="text-accent">{email}</strong>
        </p>
        <button
          onClick={() => { setMode("login"); setDone(false); }}
          className="text-accent2 text-sm underline underline-offset-4 mt-2"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep flex flex-col" style={{ background: "linear-gradient(160deg, #1e2a35 0%, #2D3A47 50%, #1e2a35 100%)" }}>
      {/* Decorative top */}
      <div className="absolute top-0 left-0 right-0 h-64 opacity-10"
        style={{ background: "radial-gradient(ellipse at top, #ECC4C3, transparent)" }} />

      <div className="flex-1 flex flex-col justify-center px-6 py-12 relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="font-serif text-4xl text-text tracking-tight">BookVibe</h1>
          <p className="text-muted text-sm mt-2 italic">Read. Share. Discover.</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-card/50 rounded-2xl p-1 mb-6 border border-white/5">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === m
                  ? "bg-accent text-deep font-semibold shadow-sm"
                  : "text-muted hover:text-text"
              }`}
            >
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-card/50 border border-white/10 rounded-xl px-4 py-3.5 text-text placeholder:text-muted text-sm focus:outline-none focus:border-accent/50 transition"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-card/50 border border-white/10 rounded-xl px-4 py-3.5 text-text placeholder:text-muted text-sm focus:outline-none focus:border-accent/50 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full bg-card/50 border border-white/10 rounded-xl px-4 py-3.5 text-text placeholder:text-muted text-sm focus:outline-none focus:border-accent/50 transition"
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-deep font-semibold text-base transition-all disabled:opacity-50 active:scale-95"
            style={{ background: "linear-gradient(135deg, #ECC4C3, #B97D7B)" }}
          >
            {loading ? "Loading…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </div>

        <p className="text-muted/50 text-xs text-center mt-8">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}