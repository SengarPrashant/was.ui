import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from './field-base';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-time-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
  ],
  template: `
    <div [formGroup]="form" class="main-content-date">
    <div style="display:block;">
      <mat-label>{{ config.label }}</mat-label>
      <span class="text-red-500" *ngIf="isRequired()">*</span>
     </div> 
      <mat-form-field appearance="outline" class="full-width" style="width:100%;">
        <input
          matInput
          [ngxTimepicker]="timepicker"
          readonly
          [value]="selectedTime"
          placeholder="HH:MM"
          (timeSet)="onTimeChange($event)"
        />
        <ngx-material-timepicker #timepicker  (timeSet)="onTimeChange($event)"></ngx-material-timepicker>
      </mat-form-field>
           <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `,
  styles: [`

  .main-content-date{
  --mdc-outlined-text-field-container-shape:4px;
  --mdc-outlined-text-field-outline-color:#d9d9d9;
  width:100%;
  }
  `]
})
export class TimeFieldComponent implements OnInit {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  selectedTime: string = '';

  ngOnInit() {
    // const existing = this.form.get(this.config.fieldKey)?.value;
    // this.selectedTime = existing ? existing : this.getCurrentTime();
    // this.form.get(this.config.fieldKey)?.setValue(this.selectedTime);
  }

  onTimeChange(event: any) {
   this.selectedTime = event;
    this.form.get(this.config.fieldKey)?.setValue(this.selectedTime);
  }

  // private getCurrentTime(): string {
  //   const now = new Date();
  //   const hours = String(now.getHours()).padStart(2, '0');
  //   const minutes = String(now.getMinutes()).padStart(2, '0');
  //   return `${hours}:${minutes}`;
  // }

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
