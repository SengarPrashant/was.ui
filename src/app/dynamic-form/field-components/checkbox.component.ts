import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldConfig } from './field-base';

@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  template: `
    <div [formGroup]="form">
      <mat-checkbox [formControlName]="config.fieldKey" class="custom-checkbox">
        {{ config.label }}
      </mat-checkbox>
    </div>
  `
})
export class CheckboxComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;
}
