import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  setCurrentMonth,
  loadExpenses,
  loadCurrentMonth,
} from '../store/UI/expenses/expense.actions';
import { MY_FORMATS } from '../shared/formats';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatePickerComponent implements OnInit {
  public constructor(public store: Store<AppState>) {}
  public date = new FormControl(moment());

  public ngOnInit() {
    this.store.dispatch(loadExpenses());
    this.store.dispatch(loadCurrentMonth());
  }

  chosenMonthHandler(selectedM: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(selectedM.month());
    this.date.setValue(ctrlValue);

    this.store.dispatch(
      setCurrentMonth({
        currentMonth: { cm: selectedM.format(MY_FORMATS.parse.dateInput) },
      })
    );
    datepicker.close();
  }
}
