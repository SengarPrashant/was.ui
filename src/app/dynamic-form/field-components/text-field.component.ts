import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldConfig } from './field-base';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <div [formGroup]="form">
     <mat-label>{{ config.label }}</mat-label>
    <input matInput [formControlName]="config.fieldKey" class="custom-input" />
    <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>

      <mat-error *ngIf="hasError('minlength')">
        Minimum length is {{ getErrorValue('minlength', 'requiredLength') }}
      </mat-error>

      <mat-error *ngIf="hasError('maxlength')">
        Maximum length is {{ getErrorValue('maxlength', 'requiredLength') }}
      </mat-error>

      <mat-error *ngIf="hasError('pattern')">
        Invalid {{ config.label }}
      </mat-error>

    </div>
  `
})
export class TextFieldComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

   get control() {
    return this.form.get(this.config.fieldKey);
  }

  hasError(error: string): boolean {
    const control = this.control;
    if (!control) return false;
    return control?.hasError(error) && control.touched;
  }

  getErrorValue(error: string, key: string): any {
    return this.control?.getError(error)?.[key];
  }
  
}
