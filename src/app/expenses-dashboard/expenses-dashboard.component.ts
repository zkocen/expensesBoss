import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.scss'],
})
export class ExpensesDashboardComponent implements OnInit {
  public faBars = faBars;

  ngOnInit() {}
}
