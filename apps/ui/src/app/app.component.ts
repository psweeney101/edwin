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
    // Mon-Fri Photos from 06:00-09:00
    new CronJob('0 6 * * 1-5', () => this.router.navigateByUrl('/photos'), null, true);
    new CronJob('0 9 * * 1-5', () => this.router.navigateByUrl('/time'), null, true);

    // Mon-Fri Photos at 18:00
    new CronJob('0 18 * * 1-5', () => this.router.navigateByUrl('/photos'), null, true);

    // Sat-Sun Photos at 10:00
    new CronJob('0 10 * * 6,0', () => this.router.navigateByUrl('/photos'), null, true);

    // Sun-Thu Photos until 22:00
    new CronJob('0 22 * * 0-4', () => this.router.navigateByUrl('/time'), null, true);

    // Fri-Sat Photos until 00:00
    new CronJob('0 0 * * 6,0', () => this.router.navigateByUrl('/time'), null, true);
    /* eslint-enable no-new */
  }
}
