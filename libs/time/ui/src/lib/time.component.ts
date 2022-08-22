import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edwin-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent implements OnInit {
  /** The current timestamp, which is updated every second */
  now = Date.now();

  ngOnInit(): void {
    setInterval(() => { this.now = Date.now(); }, 1000);
  }
}
