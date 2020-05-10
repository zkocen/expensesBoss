import { Component, OnInit, OnChanges } from '@angular/core';
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
import { allExpenses } from '../store/UI/expenses/expenses.selector';
// import { selectedMonth } from '../store/UI/expenses/expenses.selector';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMMM - YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
export class DatePickerComponent implements OnInit, OnChanges {
  // public currentMonth$ = this.store.select(selectedMonth);

  public constructor(public store: Store<AppState>) {}
  public date = new FormControl(moment());

  public allExpenses$ = this.store.select(allExpenses);

  public ngOnInit() {}

  public ngOnChanges() {}

  chosenMonthHandler(selectedM: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(selectedM.month());
    this.date.setValue(ctrlValue);
    console.log('selectedM', selectedM.format('MM/YYYY'));
    datepicker.close();
  }
}
