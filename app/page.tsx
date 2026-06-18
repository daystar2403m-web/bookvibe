"use client";

import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MOCK_BOOKS } from "@/lib/mockBooks";
import { Search, User, Star, ChevronRight } from "lucide-react";

export default function Home() {
  const [continueBooks, setContinueBooks] = useState<{ bookId: string; chapter: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const list: { bookId: string; chapter: number }[] = [];
    for (const book of MOCK_BOOKS) {
      const saved = localStorage.getItem(`progress-${book.id}`);
      if (saved !== null) list.push({ bookId: book.id, chapter: Number(saved) });
    }
    setContinueBooks(list);
  }, []);

  const featuredBook = MOCK_BOOKS[0];

  return (
    <div style={{ background: "#F8F9FA", fontFamily: "Montserrat, sans-serif", minHeight: "100vh", paddingBottom: 80 }}>

      {/* TOP BAR */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 13px 10px 13px", background: "#F8F9FA", position: "sticky", top: 0, zIndex: 30 }}>
        <div style={{ width: 36, height: 36, flexShrink: 0 }}>
          <svg width="36" height="36" viewBox="0 0 477 744" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M96.9588 145.5C104.029 129.569 109.558 121.344 123.459 108.5C137.971 93.9655 147.634 86.8045 169.459 77C181.254 72.5469 187.995 70.599 200.459 69C213.323 67.7859 218.012 68.2192 226.27 68.9826L226.459 69V81L230.459 143L236.459 223.5L242.959 283L250.459 340.5L264.959 420L324.959 64.5L328.959 44L351.959 31.5L377.459 19.5L408.209 14.5L435.709 10H442.959L428.459 64.5L395.459 233L366.959 397C352.771 496.387 338.709 553.079 330.959 649.5C333.323 656.534 322.959 673 322.959 673L309.959 684C301.87 689.706 295.862 693.131 283.459 699.5C271.965 702.759 264.717 704.176 248.459 705C248.459 705 232.459 704.5 220.959 699.5C209.459 694.5 207.442 684.149 202.959 673C192.916 675.483 157.076 353.442 152.459 397C147.842 440.558 123.094 547.044 121.459 649.5L104.959 661.5C99.0744 665.871 94.2905 668.399 83.9588 673C83.9588 673 68.7332 678.438 60.4588 680C52.1845 681.562 47.3612 682.437 37.9588 684C28.5565 685.563 11.4588 687.5 11.4588 687.5C11.4588 687.5 51.2837 360.743 96.9588 145.5Z" stroke="#176474" strokeWidth="20"/>
            <path d="M72.4588 677.5L65.9588 724L94.9588 719.5L121.459 712.5L145.959 701.5L156.959 695L168.959 548L162.459 499L154.959 447.5L136.959 548L132.459 654.5L104.959 673L72.4588 677.5Z" fill="#176474" stroke="#176474"/>
            <path d="M238.459 122.5C248.588 119.978 254.28 119.36 264.459 120L275.959 294.5L264.459 360C261.461 342.974 260.336 334.588 257.459 311C254.581 287.412 253.083 283.622 251.459 265.5L247.459 229.5L244.459 192L240.959 146.5L238.459 122.5Z" fill="#176474" stroke="#176474"/>
            <path d="M475.459 63.5C462.073 62.2839 454.048 62.5886 437.959 66.5L418.459 165L378.959 384.5L370.959 435.5L362.459 487L352.959 545L345.459 604.5L340.959 651L330.459 679L310.959 695L287.459 707.5L254.459 715C255.208 719.917 256.662 723.213 261.959 730.5C267.129 738.395 271.918 740.525 281.959 742.5C290.333 743.313 294.559 743.092 301.959 742.5C304.16 742.519 308.546 741.435 326.459 736C334.877 733.159 345.459 726.278 351.959 722.5C358.459 718.722 362.979 715.787 369.959 707.5L372.959 668.5L385.459 567L392.459 512L401.959 448.5L414.459 374L427.459 300.5L440.959 232L454.459 163L466.459 107L475.459 63.5Z" fill="#176474" stroke="#176474"/>
            <path d="M35.4589 673L62.9589 475L86.9589 318L112.959 179L121.459 150.5L133.459 127.5C141.064 119.552 146.087 115.257 156.959 108L157.262 107.805C168.397 100.627 174.733 96.5425 188.959 90C188.959 90 211.459 80.5 213.459 83C215.459 85.5 233.459 299 233.459 299L255.959 421C259.756 427.442 262.765 430.353 271.959 432.5C278.357 430.3 280.836 427.961 282.459 421L317.459 226L338.959 111L349.459 53C361.14 46.1949 368.907 42.8042 383.459 37C398.859 29.8271 424.959 25 424.959 25L395.959 176L360.459 375.5L343.459 483L333.459 544L321.459 641.5L313.959 668L287.459 687C274.23 691.73 266.423 693.397 251.959 695C241.767 694.664 235.285 694.826 234.959 690L226.959 668L207.959 593.5L192.959 512.5L175.459 399.5C172.952 386.482 159.459 384.5 159.459 384.5L143.459 391.5L134.959 440.5L119.959 544L110.459 630C109.186 645.149 105.063 649.638 95.4589 655C87.8322 660.232 82.2361 663.084 69.4589 668C55.4714 671.412 36.5905 674.719 35.4589 673Z" fill="#FEB0C1"/>
            <path d="M143.459 391.5C146.449 383.53 159.459 384.5 159.459 384.5C159.459 384.5 172.952 386.482 175.459 399.5L192.959 512.5L207.959 593.5L226.959 668L234.959 690C235.285 694.826 241.767 694.664 251.959 695C266.423 693.397 274.23 691.73 287.459 687L313.959 668L321.459 641.5L333.459 544L343.459 483L360.459 375.5L395.959 176L424.959 25C424.959 25 398.859 29.8271 383.459 37C368.907 42.8042 361.14 46.1949 349.459 53L338.959 111L317.459 226L282.459 421C280.836 427.961 278.357 430.3 271.959 432.5C262.765 430.353 259.756 427.442 255.959 421L233.459 299C233.459 299 215.459 85.5 213.459 83C211.459 80.5 188.959 90 188.959 90C174.605 96.6016 168.283 100.701 156.959 108C146.087 115.257 141.064 119.552 133.459 127.5C128.773 136.482 126.145 141.518 121.459 150.5L112.959 179L86.9589 318L62.9589 475L35.4589 673C36.5905 674.719 55.4714 671.412 69.4589 668C82.2361 663.084 87.8322 660.232 95.4589 655C105.063 649.638 109.186 645.149 110.459 630L119.959 544L134.959 440.5L143.459 391.5ZM159.459 384.5L143.459 391.5" stroke="#FEB0C1"/>
          </svg>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, background: "#E7EBEE", borderRadius: 20, padding: "8px 12px" }}>
          <Search size={13} color="#ADB5BD" strokeWidth={2} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitap, yazar veya etiket ara"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 12, color: "#ADB5BD", fontFamily: "Montserrat", fontWeight: 400 }}
          />
        </div>

        <Link href="/profile">
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(254,176,193,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <User size={15} color="#feb0c1" strokeWidth={2} />
          </div>
        </Link>
      </div>

      {/* BANNER */}
      <div style={{ padding: "0 13px", marginBottom: 18 }}>
        <FeaturedBanner book={featuredBook} />
      </div>

      {/* DEVAM ET */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "0 13px", marginBottom: 10 }}>
          <span style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>Kaldığın Yerden Devam Et</span>
          <ChevronRight size={13} color="#1a1a2e" strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 13px 4px", scrollbarWidth: "none" }}>
          {MOCK_BOOKS.map((book, i) => (
            <ContinueCard key={book.id} book={book} badge={i % 2 === 0 ? "Devam Et" : `${i + 1} yeni bölüm`} chapter={`${i + 6}. Bölüm`} />
          ))}
        </div>
      </div>

      {/* SEVDİĞİN YAZARLARDAN */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ padding: "0 13px", marginBottom: 10 }}>
          <span style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>Sevdiğin Yazarlardan</span>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 13px 4px", scrollbarWidth: "none" }}>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <Link href={`/book/${MOCK_BOOKS[0].id}`}>
              <div style={{ width: 61, height: 91, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                <img src={MOCK_BOOKS[0].coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Link>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {MOCK_BOOKS.slice(0, 4).map((book, i) => (
                <Link key={i} href={`/book/${book.id}`}>
                  <div style={{ width: 29, height: 43, borderRadius: 6, overflow: "hidden" }}>
                    <img src={book.coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {MOCK_BOOKS.slice(1).map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div style={{ width: 61, height: 91, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                <img src={book.coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SENİN İÇİN */}
      <div style={{ padding: "0 13px" }}>
        <div style={{ marginBottom: 10 }}>
          <span style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>Senin için ✨</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {MOCK_BOOKS.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <img src={book.coverUrl} style={{ width: "100%", height: 130, objectFit: "cover" }} />
                <div style={{ padding: "8px 10px 10px" }}>
                  <p style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 11, color: "#1a1a2e", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{book.title}</p>
                  <p style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 10, color: "#6c757d", marginTop: 3 }}>{book.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function FeaturedBanner({ book }: { book: any }) {
  const tags = ["Fantastik", "Romantik", "Macera"];
  return (
    <Link href={`/book/${book.id}`}>
      <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg, #ff7a59 0%, #ff4d6d 60%, #c9184a 100%)", minHeight: 126, display: "flex", gap: 10, padding: "14px 12px 12px" }}>
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.92)", borderRadius: 999, padding: "3px 9px" }}>
          <Star size={9} fill="#fff" color="#fff" strokeWidth={0} />
          <span style={{ fontSize: 8, fontWeight: 700, color: "#c9184a", fontFamily: "Montserrat", letterSpacing: 0.4 }}>GÜNÜN ÖNERİSİ</span>
        </div>
        <div style={{ flexShrink: 0, marginTop: 18 }}>
          <img src={book.coverUrl} style={{ width: 67, height: 99, objectFit: "cover", borderRadius: 8, border: "2px solid rgba(255,255,255,0.3)", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 18, minWidth: 0 }}>
          <p style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 16, color: "#fff", lineHeight: 1.2, margin: 0 }}>{book.title}</p>
          <p style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>{book.author}</p>
          <p style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 10, color: "rgba(255,255,255,0.88)", marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>
            "İnsan bir kutu kibrite benzer. Varolur, yanar ve söner."
          </p>
          <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <span key={tag} style={{ fontSize: 8, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(255,255,255,0.22)", color: "#fff", fontFamily: "Montserrat" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ContinueCard({ book, badge, chapter }: { book: any; badge: string; chapter: string }) {
  const isNew = badge.includes("yeni");
  return (
    <Link href={`/book/${book.id}`}>
      <div style={{ flexShrink: 0, width: 52 }}>
        <div style={{ width: 52, height: 79, borderRadius: 6, overflow: "hidden" }}>
          <img src={book.coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <p style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 9, color: isNew ? "#c9184a" : "#1a1a2e", marginTop: 4, lineHeight: 1.2 }}>{badge}</p>
        <p style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 8, color: "#6c757d", marginTop: 2 }}>{chapter}</p>
      </div>
    </Link>
  );
}