import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  template: `
    <div class="loading-overlay" *ngIf="isLoading$ | async">
    <img src="./assets/images/half-logo.jpeg" class="loading-logo" alt="indiqube"/>
    </div>
  `,
  styles: [
    `
      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        /* Ensures the overlay takes full screen space */
      }

      .loading-logo {
      width:30px;
      height:30px;
         animation: spin 2s linear infinite;
        /* Ensures the SVG fits within the container and is centered */
      }

      @keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
    `,
  ],
  imports: [CommonModule],
})
export class LoadingSpinnerComponent {
  isLoading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
