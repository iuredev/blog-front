import axios from "axios";
import { ReactionCounts, ReactionType } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;

const headers = { Authorization: `Bearer ${NEXT_API_KEY}` };

export const getReactionCounts = async (articleDocumentId: string): Promise<ReactionCounts | null> => {
  try {
    const response = await axios.get(
      `${NEXT_API_URL}/reactions/counts/${articleDocumentId}`,
      { headers }
    );
    return response.data as ReactionCounts;
  } catch {
    return null;
  }
};

export const toggleReaction = async (articleDocumentId: string, type: ReactionType): Promise<void> => {
  await axios.post(
    `${NEXT_API_URL}/reactions/toggle`,
    { articleDocumentId, type },
    { headers }
  );
};
