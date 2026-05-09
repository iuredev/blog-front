import axios from "axios";
import { ReactionCounts, ReactionType } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;

const headers = { Authorization: `Bearer ${NEXT_API_KEY}` };

async function getVisitorId(): Promise<string> {
  const key = "blog_visitor_id";
  const cached = localStorage.getItem(key);
  if (cached) return cached;

  const res = await fetch("https://api.ipify.org?format=json");
  const { ip } = await res.json();

  const encoded = new TextEncoder().encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hash = Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");

  localStorage.setItem(key, hash);
  return hash;
}

export const getReactionCounts = async (articleDocumentId: string): Promise<ReactionCounts | null> => {
  try {
    const visitorId = await getVisitorId();
    const response = await axios.get(
      `${NEXT_API_URL}/reactions/counts/${articleDocumentId}`,
      { headers, params: { visitorId } }
    );
    return response.data as ReactionCounts;
  } catch {
    return null;
  }
};

export const toggleReaction = async (articleDocumentId: string, type: ReactionType): Promise<void> => {
  const visitorId = await getVisitorId();
  await axios.post(
    `${NEXT_API_URL}/reactions/toggle`,
    { articleDocumentId, type, visitorId },
    { headers }
  );
};
