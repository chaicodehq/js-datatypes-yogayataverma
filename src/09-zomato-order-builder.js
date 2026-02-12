export function buildZomatoOrder(cart, coupon) {
  if (!Array.isArray(cart) || cart.length === 0) return null;
  const validItems = cart.filter(item => item.qty > 0);
  if (validItems.length === 0) return null;
  const items = validItems.map(item => {
    const addons = item.addons || [];
    const addonTotal = addons.reduce((s, a) => s + parseFloat(a.split(":")[1]), 0);
    const itemTotal = (item.price + addonTotal) * item.qty;
    return { name: item.name, qty: item.qty, basePrice: item.price, addonTotal, itemTotal };
  });
  const subtotal = items.reduce((s, i) => s + i.itemTotal, 0);
  let deliveryFee = subtotal < 500 ? 30 : subtotal < 1000 ? 15 : 0;
  const gst = parseFloat((subtotal * 0.05).toFixed(2));
  let discount = 0;
  if (coupon && typeof coupon === 'string') {
    const c = coupon.toUpperCase();
    if (c === "FIRST50") discount = Math.min(subtotal * 0.5, 150);
    else if (c === "FLAT100") discount = 100;
    else if (c === "FREESHIP") { discount = deliveryFee; deliveryFee = 0; }
  }
  const grandTotal = parseFloat(Math.max(0, subtotal + deliveryFee + gst - discount).toFixed(2));
  return { items, subtotal, deliveryFee, gst, discount, grandTotal };
}
