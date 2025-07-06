// {
//   "journeyId": "6192a34d",
//   "baseCurrency": "USD",
//   "quoteCurrency": "KRW",
//   "exchangeRate": 1450.2,
//   "title": "여정명",
//   "startDate": "2025-03-21",
//   "endDate": "2025-03-22",
//   "localeCode": "US",
//   "closedAt": null,
//   "createdAt": "2025-03-26T00:32:39",
//   "members": [
//     {
//       "journeyMemberId": 5,
//       "name": "HI1"
//     },
//     {
//       "journeyMemberId": 6,
//       "name": "HI2"
//     }
//   ]
// }

import { Member } from "./Member";

export interface Journey {
  journeyId: string; // Unique identifier for the journey
  baseCurrency: string; // Base currency code (e.g., "USD", "EUR")
  exchangeRate: number; // Exchange rate against the quote currency
  title: string; // Title of the journey
  startDate: string; // Start date in ISO 8601 format (e.g., "2025-03-21")
  endDate: string; // End date in ISO 8601 format (e.g., "2025-03-22")
  localeCode: string; // Locale code for the country (e.g., "US", "KR")
  totalExpenseAmount: number;
  totalExpenseCount: number;
  closedAt: string | null; // Date when the journey was closed, or null if still open
  createdAt: string; // Creation date in ISO 8601 format
  members: Array<Member>; // List of members in the journey
}
