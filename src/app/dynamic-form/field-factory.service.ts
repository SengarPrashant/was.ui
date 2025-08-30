import { Injectable, Type } from '@angular/core';
import { TextFieldComponent } from './field-components/text-field.component';
import { SelectFieldComponent } from './field-components/select-field.component';
import { DateTimeFieldComponent } from './field-components/datetime-field.component';
import { TextareaFieldComponent } from './field-components/textarea-field.component';
import { CheckboxGroupComponent } from './field-components/checkbox-group.component';
import { RadioGroupComponent } from './field-components/radio-group.component';
import { CheckboxComponent } from './field-components/checkbox.component';
import { TimeFieldComponent } from './field-components/time-field.component';
import { labelFieldComponent } from './field-components/only-label.component';
import { DocumentUploadFieldComponent } from './field-components/document-upload-field.component';

@Injectable({ providedIn: 'root' })
export class FieldFactoryService {
  getComponentType(type: string): Type<any> {
    switch (type) {
      case 'text': return TextFieldComponent;
      case 'number': return TextFieldComponent;
      case 'select': return SelectFieldComponent;
      case 'checkbox': return CheckboxComponent;
      case 'datetime': return DateTimeFieldComponent;
      case 'textarea': return TextareaFieldComponent;
      case 'checkboxGroup': return CheckboxGroupComponent;
      case 'radio': return RadioGroupComponent;
      case 'time' : return TimeFieldComponent;
      case 'note': return labelFieldComponent;
      case 'file': return DocumentUploadFieldComponent;
      default:  return labelFieldComponent;
    }
  }
}