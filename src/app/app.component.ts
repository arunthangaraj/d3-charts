import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: any;
  progressData: any;
  constructor() {
     this.data = [ {
       date: '2018-06-01',
       value: 100
     }];

     this.progressData = {
       data: 30
     };

  }
}
