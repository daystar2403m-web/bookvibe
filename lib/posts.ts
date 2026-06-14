export type Post = {
  id: string;
  type: "image" | "video";
  url: string;
  caption: string;
  author?: string;
  likes?: number;
};

export const POSTS: Post[] = [
  { id: "p1", type: "image", url: "https://picsum.photos/seed/book1/400/700", caption: "Reading vibes 📚", author: "@midnight_reader", likes: 1204 },
  { id: "p2", type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Book aesthetic ✨", author: "@storytime.co", likes: 3871 },
  { id: "p3", type: "image", url: "https://picsum.photos/seed/cozy3/400/700", caption: "Cozy corner 🍵", author: "@chapter.one", likes: 892 },
  { id: "p4", type: "image", url: "https://picsum.photos/seed/novel4/400/700", caption: "Obsessed with this series 🌙", author: "@booknerd", likes: 5410 },
  { id: "p5", type: "video", url: "https://www.w3schools.com/html/movie.mp4", caption: "Book haul 📦", author: "@readingwithme", likes: 2143 },
  { id: "p6", type: "image", url: "https://picsum.photos/seed/shelf6/400/700", caption: "My shelf goals 🏠", author: "@shelflove", likes: 764 },
  { id: "p7", type: "image", url: "https://picsum.photos/seed/cafe7/400/700", caption: "Café reading day ☕", author: "@bookcafe", likes: 3312 },
  { id: "p8", type: "image", url: "https://picsum.photos/seed/rain8/400/700", caption: "Rainy day reads 🌧️", author: "@stormreader", likes: 980 },
  { id: "p9", type: "image", url: "https://picsum.photos/seed/vintage9/400/700", caption: "Vintage finds 📖", author: "@oldpages", likes: 2201 },
];

let runtimePosts: Post[] = [...POSTS];

export function getAllPosts(): Post[] {
  return runtimePosts;
}

export function addPost(post: Post): void {
  runtimePosts = [post, ...runtimePosts];
}