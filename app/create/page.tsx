"use client";
export const dynamic = "force-dynamic";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

export default function CreatePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<"image" | "video">("image");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setType(f.type.startsWith("video") ? "video" : "image");
  }

  async function handleSubmit() {
    if (!file) { setError("Please select a file."); return; }
    setError("");
    setUploading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    // Upload file
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    setProgress(30);

    const { error: uploadError } = await supabase.storage
      .from("posts")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) { setError(uploadError.message); setUploading(false); return; }
    setProgress(70);

    const { data: { publicUrl } } = supabase.storage.from("posts").getPublicUrl(path);

    // Insert post
    const { error: insertError } = await supabase.from("posts").insert({
      user_id: user.id,
      type,
      url: publicUrl,
      caption: caption.trim() || null,
    });

    if (insertError) { setError(insertError.message); setUploading(false); return; }
    setProgress(100);

    setTimeout(() => router.push("/feed"), 800);
  }

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white flex flex-col pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-white/10">
        <button onClick={() => router.back()} className="text-white/60 text-sm">← Back</button>
        <h1 className="text-base font-semibold">New Post</h1>
        <button
          onClick={handleSubmit}
          disabled={uploading || !file}
          className="text-indigo-400 font-semibold text-sm disabled:opacity-30"
        >
          {uploading ? `${progress}%` : "Share"}
        </button>
      </div>

      <div className="flex-1 px-4 py-6 space-y-5 max-w-lg mx-auto w-full">
        {/* Upload area */}
        <div
          onClick={() => fileRef.current?.click()}
          className={`relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-dashed cursor-pointer transition ${
            preview ? "border-transparent" : "border-white/20 hover:border-indigo-500"
          } bg-white/5 flex items-center justify-center`}
        >
          {preview ? (
            type === "image" ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <video src={preview} className="w-full h-full object-cover" muted playsInline />
            )
          ) : (
            <div className="text-center space-y-2">
              <p className="text-4xl">📷</p>
              <p className="text-white/50 text-sm">Tap to select photo or video</p>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              <p className="text-white text-sm font-medium">Uploading {progress}%</p>
            </div>
          )}
        </div>

        <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFile} />

        {preview && (
          <button
            onClick={() => { setFile(null); setPreview(null); }}
            className="text-white/40 text-xs"
          >
            Remove & choose again
          </button>
        )}

        {/* Caption */}
        <div>
          <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption… #bookvibe #reading"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={uploading || !file}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 py-4 rounded-2xl text-white font-bold text-base transition"
        >
          {uploading ? "Uploading…" : "Share to BookVibe ✨"}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}