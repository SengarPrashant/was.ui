import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { CustomToastComponent } from '../components/toast/custom-toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(title: string, message: string, type: 'success' | 'error'): void {
    this.snackBar.openFromComponent(CustomToastComponent, {
      data: { title, message, type },
      duration: 6000,
       horizontalPosition: 'right',   // 👈 Added
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar-success'],
    });
  }
}
