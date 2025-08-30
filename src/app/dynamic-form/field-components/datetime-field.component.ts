import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from './field-base';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import moment from 'moment';
import { ToastService } from '../../shared/services/toast.service';

export class AppDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if ((typeof value === 'string') && value.includes('/')) {
      const str = value.split('/');
      if (str.length === 3) {
        const day = +str[0];
        const month = +str[1] - 1;
        const year = +str[2];
        return new Date(year, month, day);
      }
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  override format(date: Date, displayFormat: Object): string {
    const day = this._to2digit(date.getDate());
    const month = this._to2digit(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // 👈 Always DD/MM/YYYY
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export const APP_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-datetime-field',
  standalone: true,
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    provideNgxMask()
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  template: `
    <div [formGroup]="form" class="main-content-date">
      <div style="display:block">
        <mat-label>{{ config.label }}</mat-label>
        <span class="text-red-500" *ngIf="isRequired()">*</span>
      </div>

      <!-- Date Picker -->
      <mat-form-field appearance="outline" class="date-time-left">
        <input
          matInput
          [matDatepicker]="picker"
          [value]="selectedDate"
          placeholder="DD/MM/YYYY"
          readonly
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
          placeholder="HH:MM"
        />
        <ngx-material-timepicker 
          #timepicker 
          (timeSet)="onTimeChange($event)">
        </ngx-material-timepicker>
      </mat-form-field>
    </div>
  `,
   styles: [`
    .date-time-left { width:70%; --mat-form-field-container-height: 20px; }
    .date-time-right { width:30%; --mat-form-field-container-height: 20px; }
    .main-content-date {
      --mdc-outlined-text-field-container-shape:4px;
      --mdc-outlined-text-field-outline-color:#d9d9d9;
    }
    ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix {
      padding-top: 10px; padding-bottom: 10px;
    }
    ::ng-deep .mat-mdc-form-field-infix { min-height: 40px; }
    ::ng-deep.mat-mdc-text-field-wrapper { height: 40px !important; }
  `]
})
export class DateTimeFieldComponent implements OnInit {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  today: Date = new Date();
  selectedDate: Date | null = null;
  selectedTime: string = '12:30';

  constructor(private toastService:ToastService){

  }
  ngOnInit() {}

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.updateDateTime();
  }

  onDateManual(event: any) {
          //     mask="d0/M0/0000"
          // (blur)="onDateManual($event)"
    const inputValue: string = event.target.value;
    if (!moment(inputValue, 'DD/MM/YYYY', true).isValid()) return;

    const parsedDate = moment(inputValue, 'DD/MM/YYYY').toDate();
    if (!this.pastDateAllowed && parsedDate < this.today) {
      this.form.get(this.config.fieldKey)?.setErrors({ pastDateNotAllowed: true });
      return;
    }
    this.selectedDate = parsedDate;
    this.updateDateTime();
  }

  onTimeChange(event: any) {
    this.selectedTime = event;
    if (this.selectedDate) {
      const selected = moment(this.selectedDate)
        .hour(+event.split(':')[0])
        .minute(+event.split(':')[1])
        .toDate();
      if (!this.pastDateAllowed && selected < this.today) {
         this.selectedTime = ''
        this.form.get(this.config.fieldKey)?.setErrors({ pastDateNotAllowed: true });
        this.toastService.showToast('Error', 'Past time is not allowed' , 'error');
        this.selectedTime = ''
        return;
      }
    }
    this.updateDateTime();
  }

private updateDateTime() {
  if (this.selectedDate && this.selectedTime) {
    // Parse time with AM/PM into 24h format
    const time24 = moment(this.selectedTime, ["h:mm A"]).format("HH:mm");
    const [hours, minutes] = time24.split(":").map(Number);

    // Clone selected date
    const finalDate = new Date(this.selectedDate);
    if (isNaN(finalDate.getTime())) {
      console.error("Invalid selectedDate:", this.selectedDate);
      return;
    }

    finalDate.setHours(hours);
    finalDate.setMinutes(minutes);

    // Save to API in MM/DD/YYYY HH:mm (24h)
    const apiFormat = moment(finalDate).format("MM/DD/YYYY HH:mm");
    this.form.get(this.config.fieldKey)?.setValue(apiFormat);

    console.log("API date:", apiFormat);
  }
}



  isRequired(): boolean {
    return this.config?.validations?.some(v => v.type === 'required' && v.value === 'true') ?? false;
  }

  get pastDateAllowed(): boolean {
    return this.config?.validations?.some(v => v.type === 'pastDateAllowed' && v.value === 'true') ?? false;
  }
}

