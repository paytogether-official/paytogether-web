import { JourneyExpense } from "./JourneyExpense";

export interface GetJourneyExpensesResponseDto {
  totalAmount: number;
  quoteCurrency: string;
  expenses: Array<JourneyExpense>;
}
