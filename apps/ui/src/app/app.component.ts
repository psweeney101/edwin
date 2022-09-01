import { Component } from '@angular/core';

@Component({
  selector: 'edwin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /** Whether or not the <edwin-time> component should be displayed */
  get shouldDisplayTime(): boolean {
    const date = new Date();
    const hour = date.getHours();

    // Display time while sleeping
    if (hour < 6) return true;
    // Display photos while getting ready
    if (hour < 8) return false;
    // Display time during the day
    if (hour < 16) return true;
    // Display photos during the evening
    if (hour < 22) return false;
    // Display time at night
    return true;
  }
}
