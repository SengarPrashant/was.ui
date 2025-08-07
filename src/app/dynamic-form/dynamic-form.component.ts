import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FormBuilderService } from './form-builder.service';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { MatButtonModule } from '@angular/material/button';

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

  form!: FormGroup;

  @ViewChild(DynamicFieldDirective, { static: true }) dynamicField!: DynamicFieldDirective;

  constructor(private fb: FormBuilder, 
    private formBuilderService:FormBuilderService
  ) {}

  ngOnInit() {
      this.form = this.formBuilderService.createForm(this.config?.formDetails);
  }



  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}