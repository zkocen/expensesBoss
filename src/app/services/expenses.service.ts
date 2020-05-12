import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../store/UI/expenses/expenses.state';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  public getExpenses(): Observable<Expense> {
    return this.http
      .get<Expense>(baseUrl + 'expenses')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public getCurrentMonth(): Observable<string[]> {
    return this.http
      .get<string[]>(baseUrl + 'currentMonth')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public putExpense(expense: Expense): Observable<Expense> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<Expense>(
      baseUrl + 'expenses' + expense.id,
      expense,
      httpOptions
    );
  }
}
