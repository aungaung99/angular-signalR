import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
})
export class DateTimeComponent implements OnInit {
  @Input('format') format!: string;
  @Input('date') date!: number;
  @Input('label') label: string = '';
  ngOnInit(): void {
    if (this.date === undefined)
      this.date = Date.now();

    if (this.format === undefined) {
      this.format = 'full';
    }
  }
}
