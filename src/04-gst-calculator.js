export function calculateGST(amount, category) {
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) return null;
  if (typeof category !== 'string') return null;
  const rates = { essential: 0, food: 5, standard: 12, electronics: 18, luxury: 28 };
  const rate = rates[category.toLowerCase()];
  if (rate === undefined) return null;
  const gstAmount = parseFloat((amount * rate / 100).toFixed(2));
  const totalAmount = parseFloat((amount + gstAmount).toFixed(2));
  return { baseAmount: amount, gstRate: rate, gstAmount, totalAmount };
}
