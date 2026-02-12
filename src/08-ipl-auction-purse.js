export function iplAuctionSummary(team, players) {
  if (!team || typeof team !== 'object' || typeof team.purse !== 'number' || team.purse <= 0) return null;
  if (!Array.isArray(players) || players.length === 0) return null;
  const totalSpent = players.reduce((s, p) => s + p.price, 0);
  const remaining = team.purse - totalSpent;
  const sorted = [...players].sort((a, b) => b.price - a.price);
  const byRole = players.reduce((acc, p) => { acc[p.role] = (acc[p.role] || 0) + 1; return acc; }, {});
  return {
    teamName: team.name,
    totalSpent,
    remaining,
    playerCount: players.length,
    costliestPlayer: sorted[0],
    cheapestPlayer: sorted[sorted.length - 1],
    averagePrice: Math.round(totalSpent / players.length),
    byRole,
    isOverBudget: totalSpent > team.purse
  };
}
