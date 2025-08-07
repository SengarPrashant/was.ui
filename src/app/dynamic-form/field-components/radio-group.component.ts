import { Component, computed, inject, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { FieldConfig } from './field-base';
import { LookupService } from '../../shared/services/lookup.service';
import { allLookupModel, generalOptionModel } from '../../shared/models/looup.model';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, MatFormFieldModule],
  template: `
    <div [formGroup]="form">
      <mat-label>{{ config.label }}</mat-label>
       <mat-radio-group [formControlName]="config.fieldKey">
        <mat-radio-button
          *ngFor="let option of options()"
          [value]="option.id"
          class="radio-button"
        >
          {{ option.name }}
        </mat-radio-button>
      </mat-radio-group>
    </div>
  `
})
export class RadioGroupComponent {
  lookupService = inject(LookupService);
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

   // Get options reactively based on optionType from config
  readonly options: Signal<generalOptionModel[]> = computed(() => {
    const type = this.config?.optionType;
    if (!type) return [];
    return this.lookupService.getOptionsByType(type)();
  });
}
