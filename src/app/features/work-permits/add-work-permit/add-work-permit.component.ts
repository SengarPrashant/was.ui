import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Optional, Output } from '@angular/core';
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
import { actionMenuModel } from '../../../shared/models/global.model';
import { formDataByIDModel } from '../../../shared/models/work-permit.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-work-permit',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, ReactiveFormsModule, MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-work-permit.component.html',
  styleUrl: './add-work-permit.component.css'
})
export class AddWorkPermitComponent implements OnInit {
  router = inject(Router);
  dialog = inject(MatDialog);
  mainForm: FormGroup;
  lookupService = inject(LookupService);
  formConfig:any;
  dynamicForm: FormGroup | null = null;
  @Input() dataById!:formDataByIDModel;
  @Input() selectedAction:string = 'none';
  @Output() CloseEvent = new EventEmitter<boolean>(false);
  showProject = false;
  loading = false;

  constructor(private fb: FormBuilder,
     private globalService: GlobalService,
     private loadingService:LoadingService,
    private toastService:ToastService,
    ) {
    this.mainForm = this.fb.group({
      id: [0],
      facilityZoneLocation: ['', Validators.required],
      zone: ['', Validators.required],
      facility: ['', Validators.required],
      workPermit: ['', Validators.required],
      project:['']
    });
  }

  ngOnInit(): void {
    if(this.dataById){
      const data = this.dataById;
      const obj = {
        facilityZoneLocation:data?.facilityZoneLocation?.key,
        zone:data?.zone?.key,
        facility:data?.zoneFacility?.key,
        workPermit:data?.formTypeKey,
        id:data?.id
      }
     this.onWorkPermitChange(obj.workPermit);
     this.onZoneChange(obj.zone);
    this.mainForm.patchValue(obj);
    if(this.selectedAction === 'view'){
      this.mainForm.disable();
    }
    }
  }

  onZoneChange(selectedZoneKey: string) {
    this.lookupService.setSelectedZoneKey(selectedZoneKey);
    if(['10','11', '12', '13'].includes(selectedZoneKey)){
      this.showProject = true;
    } else{
      this.showProject = false;
    }
  }

onWorkPermitChange(value: string) {
  this.formConfig = null;

  let config$;

  if (this.selectedAction !== 'none') {
    // ✅ Edit/View → skip prevalidate, directly get form config
    config$ = this.globalService.getFormConfig(value);
  } else {
    // ✅ Create → run prevalidate first
    config$ = this.globalService.preValidateWorkPermit('work_permit', value).pipe(
      switchMap((result: { allowed: boolean }) => {
        if (result.allowed === true) {
          return this.globalService.getFormConfig(value); // allowed → get config
        } else {
          return of(null); // not allowed
        }
      })
    );
  }

  config$.subscribe(config => {
    if (config) {
      this.formConfig = config;
    } else {
      this.toastService.showToast('Error', 'You can not create a new request', 'error');
      this.formConfig = null;
    }
  });
}


  onSave() {
  if (this.mainForm.valid && this.dynamicForm?.valid) {
    this.loadingService.show();
    this.confirmSubmit();
  } else {
    this.mainForm.markAllAsTouched();
    this.dynamicForm?.markAllAsTouched();
    const invalidControls = this.getInvalidControls(this.dynamicForm!)
    console.warn('Form invalid', invalidControls);
    this.scrollToFirstInvalidControl();
  }
}

private scrollToFirstInvalidControl(): void {
  // Query the DOM for any control with Angular's ng-invalid + ng-touched classes
  const firstInvalid: HTMLElement | null =
    document.querySelector('.ng-invalid.ng-touched');

  if (firstInvalid) {
    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstInvalid.focus({ preventScroll: true }); // optional focus
  }
}


getInvalidControls(form: FormGroup): string[] {
  const invalid = [];
  const controls = form.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      invalid.push(name);
    }
  }
  return invalid;
}

onDynamicFormReady(form: FormGroup) {
  this.dynamicForm = form;
    if(this.selectedAction === 'view'){
    this.dynamicForm.disable();
    }
}


  callApiToSubmitData() {
    this.loading = true;
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
     formData.append('Project', formValue.project);
    //formData.append('Files', files);
    formData.append('Id', formValue.id);
   // append each file as Files[]
    files.forEach((file: File) => {
      formData.append('Files', file);
    });
    this.globalService.workPermitFormSubmit(formData, formValue.id).subscribe({
      next: (data) => {
        this.loadingService.hide();
        this.loading = false;
        this.toastService.showToast('Success', 'Request updated sucessfully' , 'success');
        this.CloseEvent.emit(true);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loadingService.hide();
        this.loading = false;
      }
    });
  }


  get id():number{
    return this.mainForm.get('id')?.value
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
