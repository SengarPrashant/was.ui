import { Validators } from '@angular/forms';

export function parseValidators(validators: string[] = []) {
  const validatorFns = [];
  for (const validator of validators) {
    if (validator === 'required') {
      validatorFns.push(Validators.required);
    } else if (validator.startsWith('minLength')) {
      const len = parseInt(validator.split(':')[1], 10);
      validatorFns.push(Validators.minLength(len));
    }
  }
  return validatorFns;
}