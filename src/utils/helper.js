export function generateUniqueCode(prefix) {
  const timestamp = Date.now().toString();
  const uniqueCode = `${prefix}-${timestamp}`;
  return uniqueCode;
}

export const calculateSubtotal = (qty, price) => qty * price;
