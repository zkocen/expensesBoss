import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { ExpensesService } from 'src/app/services/expenses.service';
import * as ExpensesActions from './expense.actions';
import { Expense } from './expenses.state';
import { Action } from '@ngrx/store';

@Injectable()
export class ExpensesEffect {
  public loadExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.loadExpenses),
      mergeMap(() =>
        this.expensesService.getExpenses().pipe(
          map((expense) => {
            return ExpensesActions.loadExpensesSuccess({
              expenses: expense,
            });
          }),
          catchError(() =>
            catchError(() =>
              of({ type: '[Expenses API] Expenses Loaded Error' })
            )
          )
        )
      )
    )
  );

  public loadCurrentMonth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.loadCurrentMonth),
      mergeMap(() =>
        this.expensesService.getCurrentMonth().pipe(
          map((month) => {
            return ExpensesActions.loadCurrentMonthSuccess({
              currentMonth: month,
            });
          }),
          catchError(() =>
            catchError(() =>
              of({ type: '[Expenses API]loading current month error' })
            )
          )
        )
      )
    )
  );

  public putNewExpense: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.newExpense),
      mergeMap((action) => {
        return this.expensesService.putExpense(action.expenses).pipe(
          map((expense: Expense) => {
            return ExpensesActions.newExpenseAdded();
          }),
          catchError(() =>
            of({ type: '[Expenses API] adding new expense error' })
          )
        );
      })
    )
  );

  public archiveNewExpense: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.archiveExpenseBegin),
      mergeMap((action) => {
        return this.expensesService.archiveExpense(action.expense).pipe(
          map((expense: Expense) => {
            return ExpensesActions.archiveExpenseSuccess({ expense });
          }),
          catchError(() =>
            of({ type: '[Expenses API] archiving new expense error' })
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private expensesService: ExpensesService
  ) {}
}
