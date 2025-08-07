import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from './field-base';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textarea-field',
   standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <div [formGroup]="form">
     <mat-label>{{ config.label }}</mat-label>
    <textarea matInput [formControlName]="config.fieldKey" class="custom-textarea">
    </textarea>
    </div>
  `
})
export class TextareaFieldComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;
}