export interface ExpensesState {
  currentMonth: CurrentMonth[];
  expenses: Expense[];
}

export interface CurrentMonth {
  cm: string;
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
