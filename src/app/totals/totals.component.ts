import { Component, OnInit } from '@angular/core';
import {
  userPaidDebt,
  debtCalcPerMonth,
} from '../store/UI/expenses/expenses.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-totals-dashboard',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss'],
})
export class TotalsComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  public userPaidDebt$ = this.store.select(userPaidDebt);
  public debtCalcPerMonth$ = this.store.select(debtCalcPerMonth);
  public showUserPaidDebt = false;
  public showDebtCalcPerMonth = false;

  public toggleUpd() {
    this.showUserPaidDebt = !this.showUserPaidDebt;
  }

  public toggleDcpm() {
    this.showDebtCalcPerMonth = !this.showDebtCalcPerMonth;
  }

  ngOnInit() {}
}
