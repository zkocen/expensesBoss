import { Component, OnInit } from '@angular/core';
import { userPaidDebt } from '../store/UI/expenses/expenses.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss'],
})
export class TotalsComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  public userPaidDebt$ = this.store.select(userPaidDebt);
  public show = false;

  public toggle() {
    this.show = !this.show;
  }
  ngOnInit() {}
}
