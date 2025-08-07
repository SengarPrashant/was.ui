import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DynamicFormComponent } from '../../../dynamic-form/dynamic-form.component';
import { LookupService } from '../../../shared/services/lookup.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GlobalService } from '../../../shared/services/global.service';

@Component({
  selector: 'app-add-work-permit',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './add-work-permit.component.html',
  styleUrl: './add-work-permit.component.css'
})
export class AddWorkPermitComponent {
  userForm: FormGroup;
  lookupService = inject(LookupService);
  formConfig:any;

  constructor(private fb: FormBuilder, private globalService: GlobalService) {
    this.userForm = this.fb.group({
      id: [0],
      facilityZoneLocation: ['', Validators.required],
      zone: ['', Validators.required],
      facility: ['', Validators.required],
      workPermit: ['', Validators.required]
    });
  }

  onZoneChange(selectedZoneKey: string) {
    this.lookupService.setSelectedZoneKey(selectedZoneKey);
  }

  onWorkPermitChange(value:number){
    this.globalService.getFormConfig().subscribe(config =>{
      if(config){
       this.formConfig = config;
      }
    })
  }

}
