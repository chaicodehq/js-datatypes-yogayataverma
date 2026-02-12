export function validateForm(formData) {
  const errors = {};
  const name = formData?.name;
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) errors.name = "Name must be 2-50 characters";

  const email = formData?.email;
  if (typeof email !== 'string' || email.split('@').length !== 2 || email.indexOf('@') < 1 || email.indexOf('.', email.indexOf('@')) === -1)
    errors.email = "Invalid email format";

  const phone = formData?.phone;
  if (typeof phone !== 'string' || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone))
    errors.phone = "Invalid Indian phone number";

  let age = formData?.age;
  if (typeof age === 'string') age = parseInt(age);
  if (isNaN(age) || !Number.isInteger(age) || age < 16 || age > 100)
    errors.age = "Age must be an integer between 16 and 100";

  const pincode = formData?.pincode;
  if (typeof pincode !== 'string' || pincode.length !== 6 || !/^[1-9]\d{5}$/.test(pincode))
    errors.pincode = "Invalid Indian pincode";

  const state = formData?.state ?? "";
  if (typeof state !== 'string' || state === "") errors.state = "State is required";

  if (!Boolean(formData?.agreeTerms)) errors.agreeTerms = "Must agree to terms";

  return { isValid: Object.keys(errors).length === 0, errors };
}
