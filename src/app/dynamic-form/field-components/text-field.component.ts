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
    </div>
  `
})
export class TextFieldComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;
}
