// {
//     "payerName": "HI3",
//     "category": "기타",
//     "expenseDate": "2025-03-24",
//     "currency": "USD",
//     "amount": 100,
//     "remainingAmount": 0.01,
//     "memo": "",
//     "members": [
//         { "name": "HI1", "amount": 33.33 },
//         { "name": "HI2", "amount": 33.33 },
//         { "name": "HI3", "amount": 33.33 }
//     ]
// }
export interface AddJourneyExpenseRequestDtoMember {
  name: string; // Name of the member
  amount: number; // Amount owed by the member
}

export interface AddJourneyExpenseRequestDto {
  payerName: string; // Name of the person who paid for the expense
  category: string; // Category of the expense (e.g., "식사", "교통", "숙박", "기타")
  expenseDate: string; // Date of the expense in ISO 8601 format (e.g., "2025-03-24")
  currency: string; // Currency code of the expense (e.g., "USD", "EUR")
  amount: number; // Total amount of the expense
  remainingAmount: number; // Remaining amount to be settled, if any
  memo: string; // Optional memo or note about the expense
  members: Array<AddJourneyExpenseRequestDtoMember>; // List of members with their names and amounts owed
}

export const initialAddJourneyExpenseRequestDto: AddJourneyExpenseRequestDto = {
  payerName: "",
  category: "",
  expenseDate: "",
  currency: "",
  amount: 0,
  remainingAmount: 0,
  memo: "",
  members: []
};
