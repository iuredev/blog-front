export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getMinutesToRead = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
   const minutesToRead = Math.ceil(wordCount / wordsPerMinute);

  return `${minutesToRead} min`;
};
