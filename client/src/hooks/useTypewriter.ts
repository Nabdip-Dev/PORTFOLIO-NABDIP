import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
}

/**
 * Cycles through `words`, typing and deleting each one.
 */
export function useTypewriter({
  words,
  typingSpeedMs = 80,
  deletingSpeedMs = 40,
  pauseMs = 1600,
}: UseTypewriterOptions): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) {
      return;
    }

    // noUncheckedIndexedAccess-এর জন্য fallback রাখা হয়েছে
    const current = words[wordIndex % words.length] ?? "";

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseMs);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);

      setWordIndex((currentIndex) => {
        return (currentIndex + 1) % words.length;
      });
    } else {
      const next: string = isDeleting
        ? current.slice(0, Math.max(0, text.length - 1))
        : current.slice(0, text.length + 1);

      timeout = setTimeout(() => {
        setText(next);
      }, isDeleting ? deletingSpeedMs : typingSpeedMs);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeedMs,
    deletingSpeedMs,
    pauseMs,
  ]);

  return text;
}
