import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class IdleService {

  private timeout: any;
  private readonly idleTime = 2 * 60 * 60 * 1000; // ✅ 1 min (change later to 1 hour)

  private events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
  private isWatching = false;

  private eventHandler = this.resetTimer.bind(this);

  constructor(private authService: AuthService) {}

  startWatching() {
    if (this.isWatching) return; // ✅ prevent duplicate

    console.log('IdleService: startWatching');

    this.isWatching = true;

    this.events.forEach(event => {
      window.addEventListener(event, this.eventHandler);
    });

    this.resetTimer();
  }

  stopWatching() {
    if (!this.isWatching) return;

    console.log('IdleService: stopWatching');

    this.isWatching = false;

    this.events.forEach(event => {
      window.removeEventListener(event, this.eventHandler);
    });

    clearTimeout(this.timeout);
  }

  resetTimer() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      console.log('Idle timeout reached');

      this.stopWatching(); // ✅ IMPORTANT
      this.authService.logout(); // call logout

    }, this.idleTime);
  }
}