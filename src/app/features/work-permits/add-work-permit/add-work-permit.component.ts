import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DynamicFormComponent } from '../../../dynamic-form/dynamic-form.component';
import { LookupService } from '../../../shared/services/lookup.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GlobalService } from '../../../shared/services/global.service';
import { MatButtonModule } from '@angular/material/button';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-add-work-permit',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-work-permit.component.html',
  styleUrl: './add-work-permit.component.css'
})
export class AddWorkPermitComponent {
  mainForm: FormGroup;
  lookupService = inject(LookupService);
  formConfig:any;
  dynamicForm: FormGroup | null = null;

  constructor(private fb: FormBuilder, private globalService: GlobalService, private loadingService:LoadingService) {
    this.mainForm = this.fb.group({
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

  onSave() {
    console.log('hi', this.dynamicForm?.value)
  if (this.mainForm.valid && this.dynamicForm?.valid) {
    const fullPayload = {
      ...this.dynamicForm.value
    };
     this.loadingService.show();
     const formData = new FormData();
     formData.append('FormData', JSON.stringify({fullPayload}));
         // ⿣ Add other text fields
    formData.append('FacilityZoneLocation', '1');
    formData.append('Zone', '1');
    formData.append('ZoneFacility', '1');
    formData.append('FormId', '1');
    
    this.globalService.workPermitFormSubmit(formData).subscribe({
      next: (data) => {
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loadingService.hide();
      }
    });

    console.log('Save Data:', fullPayload);

    // Call API to save
    // this.api.save(fullPayload).subscribe(...)
  } else {
    this.mainForm.markAllAsTouched();
    this.dynamicForm?.markAllAsTouched();
    console.warn('Form invalid');
  }
}

onDynamicFormReady(form: FormGroup) {
  this.dynamicForm = form;
}


}
