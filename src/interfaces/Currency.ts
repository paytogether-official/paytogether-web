// {
//   "date": "2025-03-21",
//   "currency": "USD",
//   "exchangeRate": 1459.2
// }
export interface Currency {
  date: string; // ISO 8601 format date
  currency: string; // Currency code (e.g., "USD", "EUR")
  exchangeRate: number; // Exchange rate against KRW
}
