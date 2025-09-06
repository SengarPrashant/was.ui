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
import { of, switchMap } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-work-permit',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-work-permit.component.html',
  styleUrl: './add-work-permit.component.css'
})
export class AddWorkPermitComponent {
  router = inject(Router);
  dialog = inject(MatDialog);
  mainForm: FormGroup;
  lookupService = inject(LookupService);
  formConfig:any;
  dynamicForm: FormGroup | null = null;

  constructor(private fb: FormBuilder,
     private globalService: GlobalService,
     private loadingService:LoadingService,
    private toastService:ToastService
    ) {
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

  onWorkPermitChange(value: number) {
    this.globalService.preValidateWorkPermit('work_permit', value).pipe(
      switchMap((result:{allowed:boolean}) => {
        if (true) { // Check if the first API call returned true result.allowed === true
          return this.globalService.getFormConfig(); // If true, call the second API
        } else {
          return of(null); // If false, return an observable of null (or handle as needed)
        }
      })
    ).subscribe(config => {
      if (config) {
        this.formConfig = config;
      } else{
         this.toastService.showToast('Error', 'You can not create a new request' , 'error');
      }
    })
  }

  onSave() {
  if (this.mainForm.valid && this.dynamicForm?.valid) {
    this.loadingService.show();
    this.confirmSubmit();
  } else {
    this.mainForm.markAllAsTouched();
    this.dynamicForm?.markAllAsTouched();
    console.warn('Form invalid');
  }
}

onDynamicFormReady(form: FormGroup) {
  this.dynamicForm = form;
}


  callApiToSubmitData() {
    this.loadingService.show();
    const formDetails = this.dynamicForm?.valid? { ...this.dynamicForm.value }: {};
    delete formDetails.documents;
    const formValue = this.mainForm.value;
    const files = this.dynamicForm?.value?.documents || [];
    const formData = new FormData();
    formData.append('FormData', JSON.stringify({ formDetails }));
    formData.append('FacilityZoneLocation', formValue.facilityZoneLocation);
    formData.append('Zone', formValue.zone);
    formData.append('ZoneFacility', formValue.facility);
    formData.append('FormId', formValue.workPermit);
    formData.append('FormType', 'work_permit');
    formData.append('Files', files);
    // append each file as Files[]
    // files.forEach((file: File) => {
    //   formData.append('Files', file);
    // });
    this.globalService.workPermitFormSubmit(formData).subscribe({
      next: (data) => {
        this.loadingService.hide();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loadingService.hide();
      }
    });
  }


  confirmSubmit(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Almost Done!',
        message: `Would you like to submit data?`,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.callApiToSubmitData();
      } else{
        this.loadingService.hide()
      }
    });
  }


}
