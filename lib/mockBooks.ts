export type Chapter = {
  id: string;
  title: string;
  content: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  chapters: Chapter[];
};

export const MOCK_BOOKS: Book[] = [
  {
    id: "b1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
    chapters: [
      { id: "c1", title: "Chapter 1", content: "..." },
      { id: "c2", title: "Chapter 2", content: "..." },
    ],
  },
  {
    id: "b2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg",
    chapters: [
      { id: "c1", title: "Chapter 1", content: "..." },
      { id: "c2", title: "Chapter 2", content: "..." },
    ],
  },
  {
    id: "b3",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg",
    chapters: [
      { id: "c1", title: "Chapter 1", content: "..." },
      { id: "c2", title: "Chapter 2", content: "..." },
    ],
  },
  {
    id: "b4",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780062060624-L.jpg",
    chapters: [
      { id: "c1", title: "Chapter 1", content: "..." },
      { id: "c2", title: "Chapter 2", content: "..." },
    ],
  },
  {
    id: "b5",
    title: "Circe",
    author: "Madeline Miller",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780316556347-L.jpg",
    chapters: [
      { id: "c1", title: "Chapter 1", content: "..." },
      { id: "c2", title: "Chapter 2", content: "..." },
    ],
  },
  {
    id: "b6",
    title: "Mexican Gothic",
    author: "Silvia Moreno-Garcia",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780525620785-L.jpg",
    chapters: [
      { id: "c1", title: "Chapter 1", content: "..." },
      { id: "c2", title: "Chapter 2", content: "..." },
    ],
  },
];