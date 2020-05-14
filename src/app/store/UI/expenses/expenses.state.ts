export interface ExpensesState {
  currentMonth: string[];
  expenses: Expense[];
}

export interface Expense {
  id: number;
  month: string;
  dateEntered: string;
  recurring: boolean;
  category: string;
  name: string;
  amount: number;
  paidBy: string;
  archived: boolean;
}
