import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { SimpleBarModule } from './module/d3chart/simple-bar/simple-bar.module';
import { SimpleProgressModule } from './module/d3chart/simple-progress/simple-progress.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SimpleBarModule,
    SimpleProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
