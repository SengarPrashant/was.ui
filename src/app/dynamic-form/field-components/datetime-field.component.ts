import {  Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from './field-base';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-datetime-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatIconModule
  ],
  template: `
    <div [formGroup]="form" class="main-content-date">
      <div style="display:block">
        <mat-label>{{ config.label }}</mat-label>
        <span class="text-red-500" *ngIf="isRequired()">*</span>
      </div>

      <!-- Combined DateTime Picker -->
      <mat-form-field appearance="outline" class="date-time-full">
        <input
          matInput
          [owlDateTime]="picker"
          readonly
          [owlDateTimeTrigger]="picker"
          [placeholder]="config.type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm'"
          formControlName="{{ config.fieldKey }}"
          [min]="pastDateNotAllowed && viewType !== 'edit' ? today : null"
          [max]="futureDateNotAllowed && viewType !== 'edit' ? today: null"
        />
 
      <!-- our custom icon -->
      <mat-icon 
        class="custom-picker-icon" 
        (click)="picker.open()">
        calendar_today
      </mat-icon>

        <owl-date-time
        #picker
        [pickerType]="config.type === 'date' ? 'calendar' : 'both'"
        >
        </owl-date-time>
      </mat-form-field>

      <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `,
  styles: [`
    html, body {
  overflow-y: auto !important;   // always reserve scrollbar
}
    .custom-picker-icon{
    position: absolute;
    z-index: 10;
    right: -10px;
    }
    .date-time-full { width:100%; }
    .main-content-date {
      --mdc-outlined-text-field-container-shape:4px;
      --mdc-outlined-text-field-outline-color:#d9d9d9;
    }
    ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix {
      padding-top: 10px; padding-bottom: 10px;
    }
    ::ng-deep .mat-mdc-form-field-infix { min-height: 40px; }
    ::ng-deep .mat-mdc-text-field-wrapper { height: 40px !important; }
  `]
})
export class DateTimeFieldComponent implements OnInit {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;
  @Input() viewType:string = 'none';

  today: Date = new Date();

  ngOnInit() {
    
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
    return this.config?.validations?.some(v => v.type === 'required' && v.value === 'true') ?? false;
  }

  get pastDateNotAllowed(): boolean {
    return this.config?.validations?.some(v => v.type === 'pastDateAllowed' && v.value === 'false') ?? false;
  }

   get futureDateNotAllowed(): boolean {
    return this.config?.validations?.some(v => v.type === 'futureDateAllowed' && v.value === 'false') ?? false;
  }

}
