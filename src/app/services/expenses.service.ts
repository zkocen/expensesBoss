import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public getCurrentMonth(): Observable<Expense> {
    return this.http
      .get<Expense>(baseUrl + 'currentMonth')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
