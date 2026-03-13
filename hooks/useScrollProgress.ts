"use client";
import { useEffect, useRef } from "react";

export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      progress.current = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}
