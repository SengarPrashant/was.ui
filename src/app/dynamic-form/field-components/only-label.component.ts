import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldConfig } from './field-base';

@Component({
  selector: 'app-label-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
     <mat-label>{{ config.label }}</mat-label>
  `
})
export class labelFieldComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

   
}
