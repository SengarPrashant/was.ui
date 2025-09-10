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

@Directive({
  standalone:true,
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field!: FieldConfig;
  @Input() form!: FormGroup;
  @Input() selectedAction:string = 'none';

  constructor(
    private vcRef: ViewContainerRef,
    private fieldFactory: FieldFactoryService
  ) {}

  ngOnInit(): void {
    const componentType = this.fieldFactory.getComponentType(this.field.type);
    const componentRef: ComponentRef<any> = this.vcRef.createComponent(componentType);
    if(this.field.type === 'datetime'){
      componentRef.instance.viewType = this.selectedAction;
    }
    componentRef.instance.config = this.field;
    componentRef.instance.form = this.form;
  }
}
