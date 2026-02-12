export function analyzeUPITransactions(transactions) {
  if (!Array.isArray(transactions) || transactions.length === 0) return null;
  const valid = transactions.filter(t => typeof t.amount === 'number' && t.amount > 0 && (t.type === 'credit' || t.type === 'debit'));
  if (valid.length === 0) return null;
  const totalCredit = valid.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const totalDebit = valid.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
  const allAmounts = valid.reduce((s, t) => s + t.amount, 0);
  const highestTransaction = valid.reduce((max, t) => t.amount > max.amount ? t : max, valid[0]);
  const categoryBreakdown = valid.reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {});
  const contactCount = valid.reduce((acc, t) => { acc[t.to] = (acc[t.to] || 0) + 1; return acc; }, {});
  const frequentContact = Object.entries(contactCount).reduce((max, e) => e[1] > max[1] ? e : max, Object.entries(contactCount)[0])[0];
  return {
    totalCredit, totalDebit, netBalance: totalCredit - totalDebit,
    transactionCount: valid.length,
    avgTransaction: Math.round(allAmounts / valid.length),
    highestTransaction, categoryBreakdown, frequentContact,
    allAbove100: valid.every(t => t.amount > 100),
    hasLargeTransaction: valid.some(t => t.amount >= 5000)
  };
}
