import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef  } from '@angular/material/snack-bar';

@Component({
    standalone: true,
    selector: 'app-custom-toast',
    template: `
    <div class="custom-snackbar">
      <div class="custom-snackbar-title" [ngClass]="typeClass">
        <mat-icon>{{ typeIcon }}</mat-icon>
        <span>{{ data.title }}!</span>
      </div>
      <div class="custom-snackbar-message">
        {{ data.message }}
      </div>
      <button mat-icon-button class="toast-close" (click)="close()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
    styles: [],
    imports: [CommonModule, MatIconModule],
})
export class CustomToastComponent {
    typeClass = '';
    typeIcon = '';

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { title: string; message: string; type: 'success' | 'error' },
    private snackBarRef: MatSnackBarRef<CustomToastComponent>
  ) {
        this.typeClass = data.type === 'success' ? 'custom-snackbar-success' : 'custom-snackbar-error';
        this.typeIcon = data.type === 'success' ? 'check_circle' : 'error';
    }

    close(): void {
    this.snackBarRef.dismiss();
  }
}
