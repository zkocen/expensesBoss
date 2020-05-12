import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ExpensesService } from 'src/app/services/expenses.service';
import * as ExpensesActions from './expense.actions';

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
              of({ type: '[Expenses API] Expenses Loaded Error' })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private expensesService: ExpensesService
  ) {}
}
