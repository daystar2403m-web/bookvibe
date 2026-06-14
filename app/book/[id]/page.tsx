"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MOCK_BOOKS } from "@/lib/mockBooks";

export default function BookPage() {
  const params = useParams();
  const id = params.id as string;

  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode") || "detail";
  const chapterIndex = Number(searchParams.get("chapter") || 0);

  const book = MOCK_BOOKS.find((b) => b.id === id);

  if (!book) return <div className="p-6">Book not found</div>;

  const chapters = book.chapters || [];
  const chapter = chapters[chapterIndex];

  const openChapter = (i: number) => {
    localStorage.setItem(`progress-${id}`, String(i));
    router.push(`/book/${id}?mode=read&chapter=${i}`);
  };

  const exit = () => {
    router.push("/");
  };

  // ================= DETAIL =================
  if (mode !== "read") {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <img
          src={book.coverUrl}
          className="w-full h-96 object-cover rounded-xl cursor-pointer"
          onClick={() => openChapter(0)}
        />

        <h1 className="text-2xl font-bold mt-4">{book.title}</h1>
        <p className="text-gray-500">{book.author}</p>

        <div className="mt-6">
          <h2 className="font-semibold mb-3">Chapters</h2>

          {chapters.map((ch, i) => (
            <div
              key={ch.id}
              onClick={() => openChapter(i)}
              className="p-3 border rounded mb-2 cursor-pointer hover:bg-gray-100"
            >
              {ch.title}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= READ =================
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <button onClick={exit}>← Back</button>

        <p className="text-sm text-gray-500">
          Chapter {chapterIndex + 1} / {chapters.length}
        </p>
      </div>

      <h2 className="text-xl font-bold mb-4">
        {chapter?.title || "Loading..."}
      </h2>

      <p className="leading-7 text-gray-700 whitespace-pre-line">
        {chapter?.content || "No content"}
      </p>

      <div className="flex justify-between mt-10">
        <button onClick={() => openChapter(Math.max(chapterIndex - 1, 0))}>
          Prev
        </button>

        <button
          onClick={() =>
            openChapter(Math.min(chapterIndex + 1, chapters.length - 1))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}