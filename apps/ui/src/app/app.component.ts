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
    //           m   h   dom mon dow
    new CronJob('0   6   *   *   *', () => { this.router.navigateByUrl('/photos'); }, null, true);
    new CronJob('0   8   *   *   *', () => { this.router.navigateByUrl('/time'); }, null, true);
    new CronJob('0   16  *   *   *', () => { this.router.navigateByUrl('/photos'); }, null, true);
    new CronJob('0   22  *   *   *', () => { this.router.navigateByUrl('/time'); }, null, true);
    /* eslint-enable no-new */
  }
}
