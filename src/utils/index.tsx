export const formatDate = ( date: string, locale:  Intl.LocalesArgument = "en-US",) => {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const minutesToRead = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
   const minutesToRead = Math.ceil(wordCount / wordsPerMinute);

  return `${minutesToRead} min`;
};
