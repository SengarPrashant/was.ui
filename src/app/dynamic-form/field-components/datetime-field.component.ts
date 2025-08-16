import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from './field-base';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-datetime-field',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
  ],
  template: `
    <div [formGroup]="form" class="main-content-date">
      <mat-label style="display:block;">{{ config.label }}</mat-label>

      <!-- Date Picker -->
      <mat-form-field appearance="outline" class="date-time-left">
        <input
          matInput
          [matDatepicker]="picker"
          [value]="selectedDate"
          (dateChange)="onDateChange($event)"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <!-- Time Picker -->
      <mat-form-field appearance="outline" class="date-time-right">
        <input
          matInput
          [ngxTimepicker]="timepicker"
          readonly
          [value]="selectedTime"
          (timeSet)="onTimeChange($event)"
        />
        <ngx-material-timepicker #timepicker></ngx-material-timepicker>
      </mat-form-field>
           <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `,
    styles: [`
    .date-time-left{
    width:70%; 
    --mat-form-field-container-height: 20px;
    }

    .date-time-right{
    width:30%; 
--mat-form-field-container-height: 20px;
}

.main-content-date{
--mdc-outlined-text-field-container-shape:4px;
--mdc-outlined-text-field-outline-color:#d9d9d9;
}
  `]
})
export class DateTimeFieldComponent implements OnInit {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  selectedDate: Date = new Date();
  selectedTime: string = this.getCurrentTime();

  ngOnInit() {
    this.updateDateTime();
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.updateDateTime();
  }

  onTimeChange(event:any) {
    this.selectedTime = event.target?.value || event.detail || '';
    this.updateDateTime();
  }

  private updateDateTime() {
    if (this.selectedDate && this.selectedTime) {
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      const updatedDateTime = new Date(this.selectedDate);
      updatedDateTime.setHours(hours);
      updatedDateTime.setMinutes(minutes);

      this.form.get(this.config.fieldKey)?.setValue(updatedDateTime);
    }
  }

  private getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // HH:MM
  }

    get control() {
    return this.form.get(this.config.fieldKey);
  }

  hasError(error: string): boolean {
    const control = this.control;
    if (!control) return false;
    return control?.hasError(error) && control.touched;
  }

}
