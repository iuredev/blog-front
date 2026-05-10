'use client'

import { useGetReactionCounts, useToggleReaction } from "@/api/hooks/reactions";
import { ReactionType } from "@/types";

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: 'like', emoji: '👍', label: 'Like' },
  { type: 'dislike', emoji: '👎', label: 'Dislike' },
  { type: 'love', emoji: '❤️', label: 'Love' },
  { type: 'fire', emoji: '🔥', label: 'Fire' },
  { type: 'mindblown', emoji: '🤯', label: 'Mind blown' },
  { type: 'sad', emoji: '😢', label: 'Sad' },
];

interface ReactionsProps {
  articleDocumentId: string;
}

export default function Reactions({ articleDocumentId }: ReactionsProps) {
  const { counts, userReactions, isLoading } = useGetReactionCounts(articleDocumentId);
  const { toggle, isPending } = useToggleReaction(articleDocumentId);

  if (isLoading) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-8">
      {[...REACTIONS].sort((a, b) => counts[b.type] - counts[a.type]).map(({ type, emoji, label }) => {
        const active = userReactions.includes(type);
        return (
          <button
            key={type}
            onClick={() => toggle(type)}
            disabled={isPending}
            aria-label={label}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm
              transition-all duration-300 ease-out cursor-pointer
              hover:scale-110 active:scale-90
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              ${active
                ? "border-gray-400 text-gray-200"
                : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-400"
              }`}
          >
            <span className="inline-block transition-transform duration-300 ease-out">{emoji}</span>
            <span>{counts[type]}</span>
          </button>
        );
      })}
    </div>
  );
}
