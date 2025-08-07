import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FieldConfig } from './field-base';

@Component({
  selector: 'app-datetime-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  template: `
    <div [formGroup]="form" class="datetime-wrapper">
      <label class="block font-medium mb-2">{{ config.label }}</label>

      <!-- Date Picker -->
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Choose a date</mat-label>
        <input matInput [matDatepicker]="picker" [formControlName]="config.fieldKey" />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <!-- Time Picker -->
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Select time</mat-label>
        <input
          matInput
          type="time"
          [value]="defaultTime"
          (input)="onTimeChange($event)"
        />
      </mat-form-field>
    </div>
  `
})
export class DateTimeFieldComponent implements OnInit {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  defaultTime = '';

  ngOnInit() {
    const now = new Date();
    this.defaultTime = now.toTimeString().slice(0, 5); // Format: "HH:MM"
  }

  onTimeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const time = input.value;
    const currentDate: Date = this.form.get(this.config.fieldKey)?.value ?? new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const updatedDate = new Date(currentDate);
    updatedDate.setHours(hours, minutes);
    this.form.get(this.config.fieldKey)?.setValue(updatedDate);
  }
}
