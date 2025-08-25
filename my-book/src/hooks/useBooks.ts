// hooks/useBook.ts
import { useEffect, useState } from "react";
import type { BookState, PageInfo } from "../types/book";

type Options = { persistKey?: string };
const uid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

type ContentType = "text" | "image";

export function useBook(initial: BookState, options?: Options) {
  const { persistKey } = options || {};
  const [book, setBook] = useState<BookState>(() => {
    if (!persistKey) return initial;
    try {
      const raw = localStorage.getItem(persistKey);
      return raw ? (JSON.parse(raw) as BookState) : initial;
    } catch { return initial; }
  });

  useEffect(() => {
    if (persistKey) localStorage.setItem(persistKey, JSON.stringify(book));
  }, [book, persistKey]);

  const canPrev = book.currentPage > 0;
  const canNext = book.currentPage < book.pages.length - 1;
  const page = book.pages[book.currentPage] ?? null;

  const goTo = (idx: number) =>
    setBook(b => ({ ...b, currentPage: Math.min(Math.max(0, idx), Math.max(0, b.pages.length - 1)) }));
  const prev = () => canPrev && goTo(book.currentPage - 1);
  const next = () => canNext && goTo(book.currentPage + 1);

  const addPage = (content: string, contentType: ContentType, at?: number) =>
    setBook(b => {
      const p: PageInfo = { id: uid(), type: contentType, content };
      const pages = at == null ? [...b.pages, p] : [...b.pages.slice(0, at), p, ...b.pages.slice(at)];
      return { ...b, pages, currentPage: at ?? pages.length - 1 };
    });

  const updatePageContent = (pageId: string, content: string) =>
    setBook(b => ({ ...b, pages: b.pages.map(p => p.id === pageId ? { ...p, content } : p) }));

  const updateCurrentPageContent = (content: string) => {
    const curr = book.pages[book.currentPage];
    if (!curr) return;
    updatePageContent(curr.id, content);
  };

  const removePage = (pageId: string) =>
    setBook(b => {
      const idx = b.pages.findIndex(p => p.id === pageId);
      if (idx < 0) return b;
      const pages = b.pages.filter(p => p.id !== pageId);
      const newIndex = Math.min(Math.max(0, idx - 1), Math.max(0, pages.length - 1));
      return { ...b, pages, currentPage: newIndex };
    });

  const setTitle = (title: string) => setBook(b => ({ ...b, title }));

  return {
    book, page,
    currentIndex: book.currentPage, total: book.pages.length,
    canPrev, canNext, goTo, prev, next,
    addPage, updatePageContent, updateCurrentPageContent, removePage,
    setTitle, setBook,
  };
}
