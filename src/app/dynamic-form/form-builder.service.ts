import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  createForm(config: any): FormGroup {
    const group: Record<string, FormControl> = {};

    for (const section of config.sections) {
      for (const field of section.fields) {
        //const validators = this.getValidators(field.validators);
        const valid = this.getValid(field.required)
        switch (field.type) {
          case 'checkboxGroup':
            group[field.fieldKey] = this.fb.control([], valid);
            break;
          case 'checkbox':
            group[field.fieldKey] = this.fb.control(false, valid);
            break;
          default:
            group[field.fieldKey] = this.fb.control('', valid);
            break;
        }
      }
    }

    return this.fb.group(group);
  }


  private getValid(required:boolean):any{
    if(required){
        return Validators.required;
    }

  }
  private getValidators(validatorList: string[] = []): any[] {
    const validators = [];

    for (const validator of validatorList) {
      if (validator === 'required') {
        validators.push(Validators.required);
      }
      // Extend here for minlength, maxlength, pattern, etc.
    }

    return validators;
  }
}
