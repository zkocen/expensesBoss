import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-totals-monthly',
  templateUrl: './totals-monthly.component.html',
  styleUrls: ['./totals-monthly.component.scss'],
})
export class TotalsMonthlyComponent implements OnInit {
  @Input() userCalculatedDebt: any;

  constructor() {}
  ngOnInit(): void {}
}
