import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldConfig } from './field-base';

@Component({
  selector: 'app-table-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="form" class="table-wrapper">
      <table class="custom-table" *ngIf="rows">
        <thead>
          <tr>
            <th>Sr No</th>
            <th *ngFor="let col of columns">{{ col }}</th>
          </tr>
        </thead>
        <tbody formArrayName="{{ config.fieldKey }}">
          <tr *ngFor="let row of rows.controls; let i = index" [formGroupName]="i">
            <td>{{ i + 1 }}</td>
            <td *ngFor="let col of columnKeys">
              <input
                matInput
                type="text"
                [formControlName]="col"
                [required]="i === 0"
                class="custom-input"
                [class.invalid-input]="isInvalidField(i, col)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ✅ Error section -->
      <div class="error-text" *ngIf="firstRowHasError()">
        Please fill in all required fields in the first row.
      </div>
    </div>
  `,
  styles: [`
    .table-wrapper { margin-bottom: 1rem; width: 100%; overflow-x: auto; }
    .table-label { font-weight: 500; display: block; margin-bottom: 0.5rem; }
    .custom-table { width: 100%; border-collapse: collapse; }
    th, td {padding: 8px; text-align: left; }
    th { background: #f3f3f3; font-weight: 600; }
    input { width: 100%; border:1px solid #cfcfcf; padding:10px 6px; border-radius:4px; }
    input.invalid-input { border-bottom: 2px solid red; background-color: #fff5f5; }
    .error-text { color: #e53935; margin-top: 4px; font-size: 0.9rem; }
  `]
})
export class TableFieldComponent implements OnInit {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  columns: string[] = [];
 columnKeys:string[] = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.columns = this.config.label.split(',').map(c => c.trim());
    this.columnKeys = this.columns.map(c => this.normalizeKey(c));
    const rowCount = (this.config as any).rowCount || 3;

    const control = this.form.get(this.config.fieldKey);
    if (control && control instanceof FormArray) {
      this.ensureRows(control, rowCount);
    } else {
      const tableArray = this.fb.array<FormGroup<any>>([]);
      for (let i = 0; i < rowCount; i++) {
        tableArray.push(this.createRow(i === 0));
      }
      this.form.setControl(this.config.fieldKey, tableArray);
    }
  }

  get rows(): FormArray {
    return this.form.get(this.config.fieldKey) as FormArray;
  }

  private ensureRows(array: FormArray, rowCount: number) {
    if (array.length < rowCount) {
      for (let i = array.length; i < rowCount; i++) {
        array.push(this.createRow(i === 0));
      }
    }
  }

  private createRow(isFirstRow: boolean): FormGroup {
    const rowGroup: Record<string, any> = {};
    this.columnKeys.forEach(key => {
      rowGroup[key] = isFirstRow
        ? this.fb.control('', Validators.required)
        : this.fb.control('');
    });
    return this.fb.group(rowGroup);
  }

    private normalizeKey(label: string): string {
    return label.trim().toLowerCase().replace(/\s+/g, '_');
  }

  isInvalidField(rowIndex: number, col: string): boolean {
    if (rowIndex !== 0) return false; // only validate first row
    const row = this.rows.at(rowIndex) as FormGroup;
    const control = row.get(col);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /** ✅ Check if any first-row field is invalid */
  firstRowHasError(): boolean {
    const firstRow = this.rows.at(0) as FormGroup;
    if (!firstRow) return false;
    return Object.values(firstRow.controls).some(
      ctrl => ctrl.invalid && (ctrl.dirty || ctrl.touched)
    );
  }

  isRequired(): boolean {
    return (
      this.config?.validations?.some(v => v.type === 'required' && v.value === 'true') ?? false
    );
  }
}
