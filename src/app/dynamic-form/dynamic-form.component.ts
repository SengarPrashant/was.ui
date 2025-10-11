import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormBuilderService } from './form-builder.service';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { MatButtonModule } from '@angular/material/button';
import { formDataByIDModel } from '../shared/models/work-permit.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    DynamicFieldDirective,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'] 
})
export class DynamicFormComponent implements OnInit {
  @Input() config: any;
  @Input() formData!:formDataByIDModel
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() selectedAction:string = 'none'

  form!: FormGroup;

  @ViewChild(DynamicFieldDirective, { static: true }) dynamicField!: DynamicFieldDirective;

  constructor(private fb: FormBuilder, 
    private formBuilderService:FormBuilderService
  ) {}

  ngOnInit() {
      this.form = this.formBuilderService.createForm(this.config?.formDetails);
      if(this.formData){
        this.form.patchValue(this.formData?.formData?.formDetails);
      }
       this.formReady.emit(this.form); 

      this.form.get?.('inc_datetime')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedDate = new Date(value);
        const now = new Date();
        const diffInHours = (selectedDate.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (diffInHours > 24) {
          this.form.get('delay_justification')?.setValidators([Validators.required]);
        } else {
          this.form.get('delay_justification')?.clearValidators();
        }
        this.form.get('delay_justification')?.updateValueAndValidity();
      }
    });

  }



  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}