// {
//   "journeyId": "c1e4f219",
//   "settlements": [
//     {
//       "fromMemberId": 8,
//       "fromMemberName": "HI2",
//       "toMemberId": 7,
//       "toMemberName": "HI1",
//       "amount": 251
//     }
//   ],
//   "expenseCategories": [
//     {
//       "category": "ss",
//       "amount": 501,
//       "percentage": 100
//     }
//   ],
//   "memberExpenses": [
//     {
//       "name": "HI1",
//       "amount": 100.2
//     },
//     {
//       "name": "HI2",
//       "amount": 0
//     }
//   ]
// }

export interface JourneyResult {
  journeyId: string;
  settlements: Settlement[];
  expenseCategories: ExpenseCategory[];
  memberExpenses: MemberExpense[];
}

export interface Settlement {
  fromMemberId: number;
  fromMemberName: string;
  toMemberId: number;
  toMemberName: string;
  amount: number;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
}

export interface MemberExpense {
  name: string;
  amount: number;
}
