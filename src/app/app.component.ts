import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { IdleService } from './shared/services/idle.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styles: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {

  constructor(private idleService: IdleService, private router: Router) {

  }
   ngOnInit() {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        // ❌ Stop on login page
        if (event.url.includes('/login')) {
          this.idleService.stopWatching();
        }

        // ✅ Start on all other pages
        else {
          this.idleService.startWatching();
        }
      }

    });
  }

}
