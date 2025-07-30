import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

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
    </div>
  `,
    styles: [],
    imports: [CommonModule, MatIconModule],
})
export class CustomToastComponent {
    typeClass = '';
    typeIcon = '';

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { title: string; message: string; type: 'success' | 'error' }) {
        this.typeClass = data.type === 'success' ? 'custom-snackbar-success' : 'custom-snackbar-error';
        this.typeIcon = data.type === 'success' ? 'check_circle' : 'error';
    }
}
