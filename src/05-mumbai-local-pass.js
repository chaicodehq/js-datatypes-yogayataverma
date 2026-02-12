export function generateLocalPass(passenger) {
  if (!passenger || typeof passenger !== 'object') return "INVALID PASS";
  const { name, from, to, classType } = passenger;
  if (!name || !from || !to || !classType) return "INVALID PASS";
  if (typeof name !== 'string' || typeof from !== 'string' || typeof to !== 'string' || typeof classType !== 'string') return "INVALID PASS";
  const ct = classType.toLowerCase();
  if (ct !== "first" && ct !== "second") return "INVALID PASS";
  const titleCase = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  const passId = ct.charAt(0).toUpperCase() + from.slice(0, 3).toUpperCase() + to.slice(0, 3).toUpperCase();
  return `MUMBAI LOCAL PASS\n---\nName: ${name.toUpperCase()}\nFrom: ${titleCase(from)}\nTo: ${titleCase(to)}\nClass: ${ct.toUpperCase()}\nPass ID: ${passId}`;
}
