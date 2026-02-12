export function parseWhatsAppMessage(message) {
  if (typeof message !== 'string') return null;
  const dashIdx = message.indexOf(" - ");
  if (dashIdx === -1) return null;
  const afterDash = message.substring(dashIdx + 3);
  const colonIdx = afterDash.indexOf(": ");
  if (colonIdx === -1) return null;
  const dateTime = message.substring(0, dashIdx);
  const commaIdx = dateTime.indexOf(", ");
  const date = dateTime.substring(0, commaIdx);
  const time = dateTime.substring(commaIdx + 2);
  const sender = afterDash.substring(0, colonIdx);
  const text = afterDash.substring(colonIdx + 2).trim();
  const words = text.split(" ").filter(w => w !== "");
  const lowerText = text.toLowerCase();
  let sentiment = "neutral";
  if (text.includes("😂") || text.includes(":)") || lowerText.includes("haha")) sentiment = "funny";
  else if (text.includes("❤") || lowerText.includes("love") || lowerText.includes("pyaar")) sentiment = "love";
  return { date, time, sender, text, wordCount: words.length, sentiment };
}
