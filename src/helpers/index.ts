export function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function toBoolean(value: string) {
  return value.toLocaleLowerCase() === 'true';
}
