import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../store/UI/expenses/expenses.state';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(
    private http: HttpClient,
    private as: AuthenticationService,
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
    const authToken = this.as.currentUserValue;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Expense>(baseUrl + 'expenses', expense, httpOptions);
  }

  public archiveExpense(expense: Expense): Observable<Expense> {
    if (expense && expense.id !== undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      return this.http
        .put<Expense>(baseUrl + 'expenses/' + expense.id, expense, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    console.log('error no expense to archive');
  }
}
