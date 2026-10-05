export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);
}

export function progressPercent(raisedCents: number, amountCents: number): number {
  if (amountCents <= 0) return 0;
  return Math.min(100, Math.round((raisedCents / amountCents) * 100));
}
