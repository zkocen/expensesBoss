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
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material';
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
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatDialogModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([ExpensesEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    { provide: 'baseUrl', useValue: baseUrl },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
