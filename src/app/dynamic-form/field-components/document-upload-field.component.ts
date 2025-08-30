import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldConfig } from './field-base';

@Component({
  selector: 'app-document-upload-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <div [formGroup]="form" class="doc-upload">
      <mat-label>{{ config.label }}</mat-label>
      <span class="text-red-500" *ngIf="isRequired()">*</span>

      <input
        type="file"
        multiple
        (change)="onFileChange($event)"
        class="file-input"
      />

      <!-- file list -->
      <div *ngIf="files.length" class="file-list">
        <div *ngFor="let file of files; let i = index" class="file-item">
          {{ file.name }} ({{ formatSize(file.size) }})
          <button type="button" class="remove-btn" (click)="removeFile(i)">x</button>
        </div>
      </div>

      <!-- errors -->
      <mat-error *ngIf="error">{{ error }}</mat-error>
      <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `,
  styles: [`
    .doc-upload {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    .file-input {
      padding: 6px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    .file-list {
      margin-top: 8px;
      background: #f9f9f9;
      padding: 6px;
      border-radius: 4px;
    }
    .file-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .remove-btn {
      background: transparent;
      border: none;
      color: red;
      cursor: pointer;
      font-weight: bold;
    }
  `]
})
export class DocumentUploadFieldComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  files: File[] = [];
  error: string | null = null;

  get control() {
    return this.form.get(this.config.fieldKey);
  }

  hasError(error: string): boolean {
    const control = this.control;
    if (!control) return false;
    return control.hasError(error) && control.touched;
  }

  isRequired(): boolean {
    if (!this.config?.validations) return false;
    return this.config.validations.some(v => v.type === 'required' && v.value === 'true');
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const selectedFiles = Array.from(input.files);
    let totalFiles = [...this.files, ...selectedFiles];

    if (totalFiles.length > 5) {
      this.error = 'Maximum 5 files allowed';
      return;
    }

    for (const file of selectedFiles) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        this.error = `${file.name} exceeds 10MB`;
        return;
      }
    }

    this.files = totalFiles;
    this.error = null;

    // ✅ update formControl value
    this.control?.setValue(this.files);
    this.control?.markAsTouched();
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.control?.setValue(this.files);
  }

  formatSize(size: number): string {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }
}
