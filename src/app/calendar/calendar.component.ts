import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {}
  Selection(event: any) {
    console.log ('onSelection',event);
  }
  onSubmit(){}
}
