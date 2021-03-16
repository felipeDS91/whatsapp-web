export function isValidPhoneNumber(value: string): boolean {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return !!match;
}
