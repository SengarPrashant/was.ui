import { FormGroup } from '@angular/forms';
export interface FieldConfig {
  id: number
  label: string
  fieldKey: string
  type: string
  placeholder: any
  order: number
  optionType: any
  cascadeField: any
  colSpan: number
  validations: Validation[]
}

export interface Validation {
  type: string
  value: string
  message: string
}