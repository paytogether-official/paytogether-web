// {
//     "baseCurrency": "USD",
//     "exchangeRate": "1450.2",
//     "title": "여정명",
//     "startDate": "2025-03-21",
//     "endDate": "2025-03-22",
//     "localeCode": "US",
//     "members": [
//         { "name": "HI1" },
//         { "name": "HI2" }
//     ]
// }
export interface CreateJourneyRequestDto {
  baseCurrency: string; // Base currency code (e.g., "USD", "EUR")
  exchangeRate: string; // Exchange rate against KRW
  title: string; // Journey title
  startDate: string; // Start date in ISO 8601 format (e.g., "2025-03-21")
  endDate: string; // End date in ISO 8601 format (e.g., "2025-03-22")
  localeCode: string; // Locale code for the country (e.g., "US", "KR")
  members: Array<{ name: string }>; // List of members with their names
}

// initial data
export const initialCreateJourneyRequestDto: CreateJourneyRequestDto = {
  baseCurrency: "",
  exchangeRate: "",
  title: "",
  startDate: "",
  endDate: "",
  localeCode: "",
  members: [{ name: "" }]
};
