import {
  Directive,
  Input,
  ViewContainerRef,
  ComponentRef,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from './field-components/field-base';
import { FieldFactoryService } from './field-factory.service';
import { formDataByIDModel } from '../shared/models/work-permit.model';

@Directive({
  standalone:true,
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field!: FieldConfig;
  @Input() form!: FormGroup;
  @Input() selectedAction:string = 'none';
  @Input() formData!:formDataByIDModel;

  constructor(
    private vcRef: ViewContainerRef,
    private fieldFactory: FieldFactoryService
  ) {}

  ngOnInit(): void {
    const componentType = this.fieldFactory.getComponentType(this.field.type);
    const componentRef: ComponentRef<any> = this.vcRef.createComponent(componentType);
    if(['checkboxlist', 'checkboxlist-h', 'file', 'datetime'].includes(this.field.type)) {
      componentRef.instance.viewType = this.selectedAction;
    }
    if(this.field.type === 'file'){
      componentRef.instance.documents = this.formData?.documents
    }

     if(this.field.type === 'checkboxlist-i'){
      componentRef.instance.formData = this.formData
    }
    componentRef.instance.config = this.field;
    componentRef.instance.form = this.form;
  }
}
