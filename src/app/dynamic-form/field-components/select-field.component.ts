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
      <mat-select [formControlName]="config.fieldKey">
        <mat-option *ngFor="let option of toppingList" [value]="option">
          {{ option}}
        </mat-option>
    </mat-select>
    </div>
  `
})
export class SelectFieldComponent {

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;
}