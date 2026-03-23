import { AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';

export class LocationValidator {

  static unique(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const formArray = control as FormArray;

      if (!formArray || !formArray.controls) return null;

      const seen = new Set<string>();

      for (let i = 0; i < formArray.length; i++) {
        const group = formArray.at(i).value;

        const key = `${group.locationId}-${group.zone}-${group.facility}`;

        if (seen.has(key)) {
          return { duplicate: true }; // ❌ duplicate found
        }

        seen.add(key);
      }

      return null; // ✅ valid
    };
  }
}