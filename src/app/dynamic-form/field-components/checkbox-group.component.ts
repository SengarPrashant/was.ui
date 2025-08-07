import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldConfig } from './field-base';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  template: `

  `
})
export class CheckboxGroupComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  // getOptionKey(value: string): string {
  //   return `${this.config.key}_${value}`;
  // }
}
