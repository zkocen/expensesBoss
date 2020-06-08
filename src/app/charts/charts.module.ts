import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsComponent } from './charts.component';

@NgModule({
  declarations: [ChartsComponent],
  exports: [ChartsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
})
export class ChartsModule {}
