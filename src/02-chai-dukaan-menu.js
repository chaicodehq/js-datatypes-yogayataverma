export function formatChaiMenu(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  const valid = items.filter(item => typeof item.name === 'string' && item.name !== '' && item.price > 0);
  return valid.map(item => item.name.toUpperCase() + " - Rs." + item.price).join(" | ");
}
