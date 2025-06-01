// {
//     "journeyExpenseId": 7,
//     "journeyId": "6ad10126",
//     "payerName": "HI2",
//     "expenseDate": "2025-03-24",
//     "category": "기타",
//     "baseCurrency": "USD",
//     "quoteCurrency": "USD",
//     "amount": 100,
//     "remainingAmount": 0.01,
//     "memo": "",
//     "members": [
//       {
//         "journeyMemberId": 42,
//         "name": "HI1",
//         "amount": 33.33
//       },
//       {
//         "journeyMemberId": 43,
//         "name": "HI2",
//         "amount": 33.33
//       },
//       {
//         "journeyMemberId": 44,
//         "name": "HI3",
//         "amount": 33.33
//       }
//     ]
//   }
import { Member } from "./Member";

export interface JourneyExpense {
  journeyExpenseId: number; // Unique identifier for the expense
  journeyId: string; // Identifier of the journey to which this expense belongs
  payerName: string; // Name of the person who paid for the expense
  expenseDate: string; // Date of the expense in ISO 8601 format (e.g., "2025-03-24")
  category: string; // Category of the expense (e.g., "식사", "교통", "숙박", "기타")
  baseCurrency: string; // Base currency code (e.g., "USD", "EUR")
  quoteCurrency: string; // Quote currency code (e.g., "KRW")
  amount: number; // Total amount of the expense
  remainingAmount: number; // Remaining amount to be settled, if any
  memo: string; // Optional memo or note about the expense
  members: Array<Member>; // List of members with their names and amounts owed
}
