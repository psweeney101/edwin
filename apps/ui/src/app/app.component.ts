import { Component, OnInit } from '@angular/core';
import { CronJob } from 'cron';

enum View {
  time = 'time',
  photos = 'photos',
  wifi = 'wifi',
}

@Component({
  selector: 'edwin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  /** All possible views */
  View = View;

  /** The current view */
  view?: View;

  ngOnInit(): void {
    // Set the current view
    const hour = new Date().getHours();

    // Display time while sleeping
    if (hour < 6) this.view = View.time;
    // Display photos while getting ready
    else if (hour < 8) this.view = View.photos;
    // Display time during the day
    else if (hour < 16) this.view = View.time;
    // Display photos during the evening
    else if (hour < 22) this.view = View.photos;
    // Display time at night
    else this.view = View.time;

    /* eslint-disable no-new */
    //           m   h   dom mon dow
    new CronJob('0   6   *   *   *', () => { this.view = View.photos; }, null, true);
    new CronJob('0   8   *   *   *', () => { this.view = View.time; }, null, true);
    new CronJob('0   16  *   *   *', () => { this.view = View.photos; }, null, true);
    new CronJob('0   22  *   *   *', () => { this.view = View.time; }, null, true);
    /* eslint-enable no-new */
  }
}
