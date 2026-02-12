export function maskAadhaar(aadhaarNumber) {
  if (typeof aadhaarNumber !== 'string') return "INVALID";
  if (aadhaarNumber.length !== 12) return "INVALID";
  if (!/^\d{12}$/.test(aadhaarNumber)) return "INVALID";
  const last4 = aadhaarNumber.slice(-4);
  return "XXXX-XXXX-" + last4;
}
