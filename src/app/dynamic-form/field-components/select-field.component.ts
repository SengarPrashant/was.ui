import { Component, computed, inject, Input, OnInit, Signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldConfig } from './field-base';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LookupService } from '../../shared/services/lookup.service';
import { generalOptionModel } from '../../shared/models/looup.model';

@Component({
  selector: 'app-select-field',
   standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  template: `
     <div [formGroup]="form">
     <mat-label>{{ config.label }}</mat-label>
     <span class="text-red-500" *ngIf="isRequired()">*</span>
      <mat-select [formControlName]="config.fieldKey" placeholder="select" class="custom-select" (selectionChange)="onSelectChange($event.value)">
        <mat-option *ngFor="let option of options()" [value]="option.id">
          {{ option.name}}
        </mat-option>
    </mat-select>
        <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `
})
export class SelectFieldComponent implements OnInit {

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;
  lookupService = inject(LookupService);

  ngOnInit(): void {
    if(this.control && this.control?.value){
      this.onSelectChange(this.control?.value);
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

     // Get options reactively based on optionType from config
    readonly options: Signal<generalOptionModel[]> = computed(() => {
      const type = this.config?.optionType;
      if (!type) return [];
      return this.lookupService.getOptionsByType(type)();
    });

  onSelectChange(selectedId: string) {
  // find option object by id
    const selectedOption = this.options().find(opt => opt.id === selectedId);
    // check if option name is "Other"
  // ✅ Make `other` control required ONLY if "Other" is selected
    const field = `${this.config.fieldKey}_other`;   // "OtherField"`this.config.fieldKey`
    const otherControl = this.form.get(field);
    if (selectedOption?.name?.toLowerCase() === 'other') {
      otherControl?.setValidators(Validators.required);
      otherControl?.updateValueAndValidity();
    } else {
      otherControl?.clearValidators();
      otherControl?.updateValueAndValidity();
    }
  }

}