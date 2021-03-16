import { format } from 'date-fns';

export function formatDateTime(value: Date | string): string {
  const date = new Date(value);
  return Number(date.getTime()) ? format(date, 'dd/MM/yyyy HH:mm') : '';
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = `${phone}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/);

  return match ? `+${match[1]} ${match[2]} ${match[3]}-${match[4]}` : '';
}
