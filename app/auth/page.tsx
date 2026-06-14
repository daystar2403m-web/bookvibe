"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0d0d12] flex flex-col items-center justify-center px-6 text-center gap-4">
        <p className="text-4xl">📬</p>
        <h2 className="text-white text-xl font-bold">Check your email</h2>
        <p className="text-white/50 text-sm">We sent a confirmation link to <strong>{email}</strong></p>
        <button onClick={() => setMode("login")} className="text-indigo-400 text-sm mt-2">
          Back to login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d12] flex flex-col justify-center px-6">
      {/* Logo */}
      <div className="text-center mb-10">
        <p className="text-5xl mb-3">📚</p>
        <h1 className="text-white text-3xl font-bold tracking-tight">BookVibe</h1>
        <p className="text-white/40 text-sm mt-1">Read books. Share vibes.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white/5 rounded-xl p-1 mb-6">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              mode === m ? "bg-indigo-600 text-white" : "text-white/40"
            }`}
          >
            {m === "login" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mode === "register" && (
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-indigo-500"
          />
        )}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-indigo-500"
        />

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 py-4 rounded-2xl text-white font-bold text-base transition"
        >
          {loading ? "Loading…" : mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </div>

      <p className="text-white/20 text-xs text-center mt-8">
        By continuing you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}