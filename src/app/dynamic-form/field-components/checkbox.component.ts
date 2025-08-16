import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldConfig } from './field-base';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule],
  template: `
    <div [formGroup]="form">
      <mat-checkbox [formControlName]="config.fieldKey" class="custom-checkbox" color="primary">
        {{ config.label }}
      </mat-checkbox>
          <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `
})
export class CheckboxComponent {
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
}
