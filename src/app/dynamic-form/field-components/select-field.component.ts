import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from './field-base';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-field',
   standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  template: `
     <div [formGroup]="form">
     <mat-label>{{ config.label }}</mat-label>
     <span class="text-red-500" *ngIf="isRequired()">*</span>
      <mat-select [formControlName]="config.fieldKey">
        <mat-option *ngFor="let option of toppingList" [value]="option">
          {{ option}}
        </mat-option>
    </mat-select>
        <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `
})
export class SelectFieldComponent {

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
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

  isRequired(): boolean {
    if (!this.config?.validations) return false;
    return this.config.validations.some(v => v.type === 'required' && v.value === 'true');
  }
}