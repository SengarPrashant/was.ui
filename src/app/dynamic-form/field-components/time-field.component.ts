import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from './field-base';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-time-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  template: `
    <div [formGroup]="form" class="main-content-time">
      <div style="display:block;">
        <mat-label>{{ config.label }}</mat-label>
        <span class="text-red-500" *ngIf="isRequired()">*</span>
      </div>

      <mat-form-field appearance="outline" class="full-width">
        <input
          matInput
          [owlDateTime]="timePicker"
          [owlDateTimeTrigger]="timePicker" 
          placeholder="HH:mm"
          readonly
          formControlName="{{ config.fieldKey }}"
        />

        <!-- our custom icon -->
      <mat-icon 
        class="custom-picker-icon" 
        (click)="timePicker.open()">
        access_time
      </mat-icon>

        <owl-date-time #timePicker [pickerType]="'timer'"></owl-date-time>
      </mat-form-field>

      <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `,
  styles: [`
     .custom-picker-icon{
    position: absolute;
    z-index: 10;
    right: -10px;
    }
    .main-content-time {
      --mdc-outlined-text-field-container-shape:4px;
      --mdc-outlined-text-field-outline-color:#d9d9d9;
      width: 100%;
    }
  `]
})
export class TimeFieldComponent implements OnInit {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  ngOnInit() {
    // start empty by default
    if (this.form.get(this.config.fieldKey)?.value === undefined) {
      this.form.get(this.config.fieldKey)?.setValue(null);
    }
  }

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
