import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { baseUrl } from './shared/baseUrl';
import { MonthlyExpensesComponent } from './monthly-expenses/monthly-expenses.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';
import { ExpenseComponent } from './expense/expense.component';
import { EffectsModule } from '@ngrx/effects';
import { ExpensesEffect } from './store/UI/expenses/expenses.effect';
import { ExpensesDashboardComponent } from './expenses-dashboard/expenses-dashboard.component';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NewExpenseComponent } from './new-expense/new-expense.component'; // Angular CLI environment
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AllExpensesSingleComponent } from './all-expenses/all-expenses-single/all-expenses-single.component';
import { TotalsComponent } from './totals/totals.component';
import { TotalsMonthlyComponent } from './totals/totals-monthly/totals-monthly.component';
import { UsersEffect } from './store/UI/users/users.effect';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaidComponent } from './monthly-expenses/paid/paid.component';
import { ChartsModule } from './charts-dashboard/charts.module';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MonthlyExpensesComponent,
    DatePickerComponent,
    ExpenseComponent,
    ExpensesDashboardComponent,
    AllExpensesComponent,
    NewExpenseComponent,
    AllExpensesSingleComponent,
    TotalsComponent,
    TotalsMonthlyComponent,
    PaidComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    DragDropModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatDialogModule,
    ChartsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([ExpensesEffect, UsersEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  entryComponents: [ExpenseComponent],
  providers: [
    { provide: 'baseUrl', useValue: baseUrl },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
