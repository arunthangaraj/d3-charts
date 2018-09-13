import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgresschartComponent } from './progresschart/progresschart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProgresschartComponent],
  exports: [
    ProgresschartComponent
  ]
})
export class SimpleProgressModule { }
