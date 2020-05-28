import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { User } from '../store/UI/users/users.state';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  public getUsers(): Observable<User> {
    return this.http
      .get<User>(baseUrl + 'users')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
