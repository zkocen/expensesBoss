import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { Injectable } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffect {
  public loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadCurrentUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((user) => {
            return UsersActions.loadCurrentUsersSuccess({ users: user });
          }),
          catchError(() =>
            catchError(() => of({ type: '[Users] Users Loaded Error' }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
