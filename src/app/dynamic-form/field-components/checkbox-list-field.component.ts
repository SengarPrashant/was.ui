import { Component, Input, computed, inject, Signal, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

      <div [formGroup]="localGroup" [ngClass]="{'checkboxh': config.type === 'checkboxlist-h'}">
        <div formArrayName="checkboxArray">
          <div *ngFor="let option of options(); let i = index" class="checkbox-item">
            <mat-checkbox color="primary"
              [formControlName]="i"
              (change)="onCheckboxChange()">
              {{ option.name }}
            </mat-checkbox>
          </div>
        </div>
      </div>

      <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `,
  styles: [`
    .checkbox-item {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }
    .checkboxh {
      display: flex;
    }
  `]
})
export class CheckboxListFieldComponent implements OnInit, OnChanges {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;
  @Input() viewType: string = 'none';

  private fb = inject(FormBuilder);
  private lookupService = inject(LookupService);

  /** Local FormGroup with FormArray just for checkbox UI */
  localGroup = this.fb.group({
    checkboxArray: this.fb.array([])
  });

  /** Options from lookup service */
  readonly options: Signal<generalOptionModel[]> = computed(() => {
    const type = this.config?.optionType;
    if (!type) return [];
    return this.lookupService.getOptionsByType(type)();
  });

  get parentControl() {
    return this.form.get(this.config.fieldKey);
  }

  get checkboxArray(): FormArray {
    return this.localGroup.get('checkboxArray') as FormArray;
  }

  ngOnInit() {
    this.setupLocalArray();
    this.onCheckboxChange();
    if (this.viewType === 'view') {
      this.localGroup.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && this.form) {
      this.setupLocalArray();
    }
  }

  /** ✅ Initialize local checkbox array based on parent control’s value */
 private setupLocalArray() {
  const selectedIds: string[] = this.parentControl?.value || [];
  const opts = this.options();
  const checkboxArray = this.checkboxArray;

  // clear existing
  while (checkboxArray.length) {
    checkboxArray.removeAt(0);
  }

  // rebuild
  opts.forEach(opt => {
    checkboxArray.push(this.fb.control(selectedIds.includes(opt.id!)));
  });
}


  /** ✅ When any checkbox toggled — update parent control value (IDs array) */
  onCheckboxChange() {
    const opts = this.options();
    const selectedIds = this.checkboxArray.value
      .map((checked: boolean, i: number) => (checked ? opts[i].id : null))
      .filter((v: any) => v !== null);

    // update parent control only
    this.parentControl?.setValue(selectedIds);
    this.parentControl?.markAsDirty();
    this.parentControl?.updateValueAndValidity();

    // Optional: “Other” logic
    const isOtherSelected = opts.some(
      (opt, i) => opt.name?.toLowerCase() === 'other' && this.checkboxArray.value[i]
    );
    const otherField = `${this.config.fieldKey}_other`;
    const otherControl = this.form.get(otherField);
    if (isOtherSelected) {
      otherControl?.setValidators(Validators.required);
    } else {
      otherControl?.clearValidators();
    }
    otherControl?.updateValueAndValidity({ emitEvent: false });
  }

  hasError(error: string): boolean {
    const control = this.form.get(this.config.fieldKey);
    return !!control && control.hasError(error) && control.touched;
  }

  isRequired(): boolean {
    return (
      this.config?.validations?.some(
        v => v.type === 'required' && v.value === 'true'
      ) ?? false
    );
  }
}
