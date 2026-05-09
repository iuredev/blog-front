import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReactionCounts, toggleReaction } from "../queries/reactions";
import { keys } from "../keys";
import { realtimeOptions } from "./utils";
import { ReactionCounts, ReactionType } from "../../types";

const DEFAULT_COUNTS: ReactionCounts = {
  counts: { like: 0, dislike: 0, love: 0, fire: 0, mindblown: 0, sad: 0 },
  userReactions: [],
};

export const useGetReactionCounts = (articleDocumentId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [keys.REACTIONS, articleDocumentId],
    queryFn: () => getReactionCounts(articleDocumentId),
    enabled: !!articleDocumentId,
    ...realtimeOptions,
  });

  return {
    counts: data?.counts ?? DEFAULT_COUNTS.counts,
    userReactions: data?.userReactions ?? [],
    isLoading,
  };
};

export const useToggleReaction = (articleDocumentId: string) => {
  const queryClient = useQueryClient();
  const queryKey = [keys.REACTIONS, articleDocumentId];

  const { mutate, isPending } = useMutation({
    mutationFn: (type: ReactionType) => toggleReaction(articleDocumentId, type),

    onMutate: async (type) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<ReactionCounts>(queryKey);

      queryClient.setQueryData<ReactionCounts>(queryKey, (old) => {
        const base = old ?? DEFAULT_COUNTS;
        const isActive = base.userReactions.includes(type);
        return {
          counts: {
            ...base.counts,
            [type]: isActive ? Math.max(0, base.counts[type] - 1) : base.counts[type] + 1,
          },
          userReactions: isActive
            ? base.userReactions.filter((r) => r !== type)
            : [...base.userReactions, type],
        };
      });

      return { previous };
    },

    onError: (_err, _type, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { toggle: mutate, isPending };
};
