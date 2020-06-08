import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsDashboardComponent } from './charts-dashboard.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [ChartsDashboardComponent, BarChartComponent],
  exports: [ChartsDashboardComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
})
export class ChartsModule {}
