import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
interface validModel {
  type: string;
  value:string;
  message:string;
}
@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  createForm(config: any): FormGroup {
    const group: Record<string, FormControl> = {};

    for (const section of config.sections) {
      for (const field of section.fields) {
        const validators = this.getValidators(field.validations);
        switch (field.type) {
          case 'checkboxGroup':
            group[field.fieldKey] = this.fb.control([], validators);
            break;
          case 'checkbox':
            group[field.fieldKey] = this.fb.control(false, validators);
            break;
          default:
            group[field.fieldKey] = this.fb.control('', validators);
            break;
        }
      }
    }

    return this.fb.group(group);
  }

  private getValidators(validatorList: validModel[] = []): any[] {
    const validators = [];

    for (const validator of validatorList) {
      if (validator.type === 'required' && validator.value === 'true') {
        validators.push(Validators.required);
      }
      // Extend here for minlength, maxlength, pattern, etc.
    }

    return validators;
  }
}
