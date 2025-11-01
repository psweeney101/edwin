import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CronJob } from 'cron';

@Component({
  selector: 'edwin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    /* eslint-disable no-new */
    // Weekdays: Photos 06:00–09:00
    new CronJob('0 6 * * 1-5', () => this.router.navigateByUrl('/photos'), null, true);
    new CronJob('0 9 * * 1-5', () => this.router.navigateByUrl('/time'), null, true);

    // Weekdays: Photos 16:00–00:00
    new CronJob('0 16 * * 1-5', () => this.router.navigateByUrl('/photos'), null, true);
    new CronJob('0 0 * * 2-6', () => this.router.navigateByUrl('/time'), null, true);

    // Weekends: Photos 08:00–00:00
    new CronJob('0 8 * * 6,0', () => this.router.navigateByUrl('/photos'), null, true);
    new CronJob('0 0 * * 0,1', () => this.router.navigateByUrl('/time'), null, true);
    /* eslint-enable no-new */
  }
}
