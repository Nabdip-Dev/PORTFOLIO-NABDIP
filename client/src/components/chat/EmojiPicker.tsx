"use client";

// A small curated set rather than pulling in a full emoji-picker package —
// keeps the bundle light while still covering the common reactions people
// actually use in a chat widget like this.
const EMOJIS = ["👍", "❤️", "😂", "😮", "🙏", "🎉", "🔥", "👏", "😅", "🤔"];

export function EmojiPicker({ onSelect }: { onSelect: (emoji: string) => void }) {
  return (
    <div className="grid grid-cols-5 gap-1 rounded-card glass p-2 shadow-glass">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg hover:bg-[var(--surface-elevated)]"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
