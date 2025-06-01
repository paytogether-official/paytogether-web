export interface Member {
  journeyMemberId: number; // Unique identifier for the member in the journey
  name: string; // Name of the member
}

export interface ExpenseMember extends Member {
  amount: number; // Amount owed by the member for the expense
}
