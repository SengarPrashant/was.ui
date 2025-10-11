import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldConfig } from './field-base';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textarea-field',
   standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <div [formGroup]="form" [ngClass]="getClassName()">
     <mat-label>{{ config.label }}</mat-label>
     <span class="text-red-500" *ngIf="isRequired() || form.get(config.fieldKey)?.hasValidator(validators.required)">*</span>
    <textarea matInput [formControlName]="config.fieldKey" class="custom-textarea">
    </textarea>
     <mat-error *ngIf="hasError('required')">
        {{ config.label }} is required
      </mat-error>
    </div>
  `,

  styles: [
    `
   .hide{
    display:none
    }
    .show{
    display:block
    }
    `,
  ]
})
export class TextareaFieldComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;
  validators = Validators

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

  getClassName():string{
    let className = ''
    if(this.config.fieldKey === 'delay_justification'){
      if(this.form.get(this.config.fieldKey)?.hasValidator(Validators.required)){
        className = 'show'
      } else {
        className = 'hide'
      }
    }
    return className;
  }
  
}