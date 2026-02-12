export function fixBollywoodTitle(title) {
  if (typeof title !== 'string') return "";
  const trimmed = title.trim();
  if (trimmed === "") return "";
  const smallWords = ["ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"];
  const words = trimmed.split(/\s+/);
  return words.map((word, index) => {
    const lower = word.toLowerCase();
    if (index !== 0 && smallWords.includes(lower)) return lower;
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join(" ");
}
