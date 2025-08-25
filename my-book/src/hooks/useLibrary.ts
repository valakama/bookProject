// hooks/useLibrary.ts
import { useEffect, useState } from "react";
import type { BookState } from "../types/book";

const uid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

type Options = { persistKey?: string };

export function useLibrary(initialBooks: BookState[] = [], options?: Options) {
  const { persistKey = "library" } = options || {};

  const [books, setBooks] = useState<BookState[]>(() => {
    try {
      const raw = localStorage.getItem(persistKey);
      return raw ? (JSON.parse(raw) as BookState[]) : initialBooks;
    } catch {
      return initialBooks;
    }
  });

  useEffect(() => {
    localStorage.setItem(persistKey, JSON.stringify(books));
  }, [books, persistKey]);

  const addBook = (title: string): BookState => {
    const newBook: BookState = {
      id: uid(),
      title,
      pages: [],
      currentPage: 0,
    };
    setBooks((prev) => [...prev, newBook]);
    return newBook;
  };

  const removeBook = (id: string) =>
    setBooks((prev) => prev.filter((b) => b.id !== id));

  const updateBook = (book: BookState) =>
    setBooks((prev) => prev.map((b) => (b.id === book.id ? book : b)));

  const renameBook = (id: string, title: string) =>
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, title } : b))
    );

  const getBook = (id: string) => books.find((b) => b.id === id);

  return {
    books,
    addBook,
    removeBook,
    updateBook,
    renameBook,
    getBook,
    setBooks,
  };
}
