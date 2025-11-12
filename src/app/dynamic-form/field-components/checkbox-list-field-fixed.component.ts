import {
  Component,
  Input,
  computed,
  inject,
  Signal,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LookupService } from '../../shared/services/lookup.service';
import { FieldConfig } from './field-base';
import { generalOptionModel } from '../../shared/models/looup.model';
import { formDataByIDModel } from '../../shared/models/work-permit.model';

@Component({
  selector: 'app-checkbox-list-field-fixed',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div [formGroup]="form">
      <label>{{ config.label }}</label>
      <span class="text-red-500" *ngIf="isRequired()">*</span>

      <!-- Local group just for checkbox handling -->
      <div
        [formGroup]="localGroup"
        [ngClass]="{ checkboxh: config.type === 'checkboxlist-h' }"
      >
        <div formArrayName="checkboxArray">
          <div *ngFor="let option of options(); let i = index" class="checkbox-item">
            <!-- ✅ Checkbox -->
            <mat-checkbox
              color="primary"
              [formControlName]="i"
              (change)="onCheckboxChange()"
            >
              {{ option.name }}
            </mat-checkbox>

            <!-- ✅ Input (only visible when checked + control exists in parent form) -->
            <div
              *ngIf="checkboxArray.at(i).value && form.get(getInputControlName(option))"
              class="ml-3"
            >

              <div class="extra-input">
                <textarea rows="3" class="custom-textarea" name="option.name "
                  [formControl]="getControl(getInputControlName(option))"
                  placeholder="Enter {{ option.name }} value"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Validation error for main checkbox group -->
      <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `,
  styles: [
    `
      .checkbox-item {
        display: block;
        align-items: center;
        margin-bottom: 4px;
        justify-content: space-between;
        width:80%;
        min-height:60px;
      }
      .checkboxh {
        display: flex;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class CheckboxListFieldFixedComponent implements OnInit, OnChanges {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;
  @Input() viewType: string = 'none';
  @Input() formData!:formDataByIDModel

  private fb = inject(FormBuilder);
  private lookupService = inject(LookupService);

  /** Local group for checkbox UI only */
  localGroup = this.fb.group({
    checkboxArray: this.fb.array([]),
  });

  /** Dynamic lookup options */
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
    this.createInitialInputs(); // ✅ handle pre-selected values
    this.onCheckboxChange(); // initial sync
    this.setInputControlValues();
    if (this.viewType === 'view') {
      this.localGroup.disable();
      this.disableDynamicInputs();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && this.form) {
      this.setupLocalArray();
    }
  }

  /** Setup checkboxes */
  private setupLocalArray() {
    const selectedIds: string[] = this.parentControl?.value || [];
    const opts = this.options();
    const checkboxArray = this.checkboxArray;
    while (checkboxArray.length) checkboxArray.removeAt(0);

    opts.forEach((opt) => {
      checkboxArray.push(this.fb.control(selectedIds.includes(opt.id!)));
    });
  }

  /** Create missing controls for initially selected options */
  private createInitialInputs() {
    const selectedIds: string[] = this.parentControl?.value || [];
    const opts = this.options();
    opts.forEach((opt) => {
      const ctrlName = this.getInputControlName(opt);
      if (selectedIds.includes(opt.id!) && !this.form.get(ctrlName)) {
        this.form.addControl(ctrlName, this.fb.control('', Validators.required));
      }
    });
  }

  /** Checkbox change handler */
  onCheckboxChange() {
    const opts = this.options();
    const selectedIds = this.checkboxArray.value
      .map((checked: boolean, i: number) => (checked ? opts[i].id : null))
      .filter((v: any) => v !== null);

    // update main form's checkbox field
    this.parentControl?.setValue(selectedIds);
    this.parentControl?.markAsDirty();
    this.parentControl?.updateValueAndValidity();

    // dynamically add/remove input controls
    opts.forEach((opt, i) => {
      const ctrlName = this.getInputControlName(opt);
      const existing = this.form.get(ctrlName);

      if (this.checkboxArray.at(i).value) {
        // add control if not exists
        if (!existing) {
          this.form.addControl(ctrlName, this.fb.control('', Validators.required));
        }
      } else {
        // remove control when unchecked
        if (existing) {
          this.form.removeControl(ctrlName);
        }
      }
    });
  }

  /** Generate unique control name */
  getInputControlName(opt: generalOptionModel): string {
    // safe pattern: <fieldKey>_<optionId>
    return `${this.config.fieldKey}_${opt.id}`;
  }

  /** Disable dynamic inputs in view mode */
  private disableDynamicInputs() {
    Object.keys(this.form.controls).forEach((key) => {
      if (key.startsWith(`${this.config.fieldKey}_`)) {
        this.form.get(key)?.disable({ emitEvent: false });
      }
    });
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

  getControl(name: string): FormControl {
  return this.form.get(name) as FormControl;
}

/** ✅ Set values for all input controls starting with the fieldKey prefix */
setInputControlValues() {
  if (!this.form || !this.config?.fieldKey) return;

  const prefix = `${this.config.fieldKey}_`;
  const data = this.formData?.formData?.formDetails as Record<string, any>;

  Object.keys(this.formData?.formData?.formDetails).forEach((key) => {
    if (key.startsWith(prefix) && this.form.get(key)) {
      this.form.get(key)?.setValue(data[key]);
    }
  });
}


}
