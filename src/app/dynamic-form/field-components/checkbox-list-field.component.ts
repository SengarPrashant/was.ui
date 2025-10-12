import { Component, Input, computed, inject, Signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LookupService } from '../../shared/services/lookup.service';
import { FieldConfig } from './field-base';
import { generalOptionModel } from '../../shared/models/looup.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-checkbox-list-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule],
  template: `
    <div [formGroup]="form">
      <label>{{ config.label }}</label>
      <span class="text-red-500" *ngIf="isRequired()">*</span>

      <div formArrayName="{{ config.fieldKey }}" [ngClass]= "{'checkboxh':config.type === 'checkboxlist-h'}">
        <div *ngFor="let option of options(); let i = index" class="checkbox-item">
          <mat-checkbox color="primary"
            [formControlName]="i"
            (change)="onCheckboxChange($event, option)"
          >
            {{ option.name }}
          </mat-checkbox>
        </div>
      </div>

      <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `,
  styles: [
    `
      .checkbox-item {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
      }

      .checkboxh{
      display:flex;
      }
    `,
  ],
})
export class CheckboxListFieldComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  private fb = inject(FormBuilder);
  private lookupService = inject(LookupService);

  /** Reactive lookup options */
  readonly options: Signal<generalOptionModel[]> = computed(() => {
    const type = this.config?.optionType;
    if (!type) return [];
    return this.lookupService.getOptionsByType(type)();
  });

  get formArray(): FormArray {
    return this.form.get(this.config.fieldKey) as FormArray;
  }

  ngOnInit() {
    this.initializeCheckboxes();
  }
  private initializeCheckboxes() {
     // Keep parent FormControl in sync with FormArray
    const parentValue: boolean[] = this.form.get(this.config.fieldKey)?.value; 
    console.log('df', this.form.get(this.config.fieldKey)?.value)
    const options = this.options();
    const formArray = this.fb.array([]);

    options.forEach(() => formArray.push(this.fb.control(false)));
    this.form.setControl(this.config.fieldKey, formArray);
     if (parentValue) {
        this.formArray.patchValue(parentValue);
      }
  }

  onCheckboxChange(event: any, option: generalOptionModel) {
    const selectedValues = this.formArray.value
      .map((checked: boolean, i: number) =>
        checked ? this.options()[i].id : null
      )
      .filter((v: string | null) => v !== null);

    // Optionally emit or store selected values
    console.log('Selected Values:', selectedValues);
  }

  hasError(error: string): boolean {
    const control = this.form.get(this.config.fieldKey);
    return !!control && control.hasError(error) && control.touched;
  }

  isRequired(): boolean {
    return (
      this.config?.validations?.some(
        (v) => v.type === 'required' && v.value === 'true'
      ) ?? false
    );
  }
  
}
