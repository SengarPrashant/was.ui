import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../shared/services/user.service';
import { LookupService } from '../../../shared/services/lookup.service';
import { MatSelectModule } from '@angular/material/select';
import { LoadingService } from '../../../shared/services/loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {
  userForm: FormGroup;
  isEditMode: boolean = false;
  errorMsg:string = '';
  lookupService = inject(LookupService);
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userService:UserService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;
    this.userForm = this.fb.group({
      id:[data?.id || 0],
      employeeId: [data?.employeeId || '', Validators.required],
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      mobile: [data?.mobile || '', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      roleId: [data?.roleId || '', Validators.required],
      facilityZoneLocation:[data?.facilityZoneLocation || '', Validators.required],
      zone:[data?.facilityZoneLocation || '', Validators.required],
      facility:[data?.facilityZoneLocation || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    this.createAndUpdateUser();
  }

  createAndUpdateUser():void{
  this.loading = true;
   const formData = this.userForm.value;
   formData.password = `indiqube@${formData?.employeeId}`
   this.loadingService.show();
    this.userService.addAndUpdateUser(formData).subscribe({
      next: (data) => {
        this.loadingService.hide();
        this.dialogRef.close('refresh');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        if(err.status === 400){
          this.errorMsg = `User with same email/mobile already exists!`
        }
        this.loadingService.hide();
        this.loading = false;
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  allowOnlyNumbers(event: KeyboardEvent) {
  const char = event.key;
  if (!/[0-9]/.test(char)) {
    event.preventDefault(); // Blocks non-numeric input
  }
}

onZoneChange(selectedZoneKey: string) {
  this.lookupService.setSelectedZoneKey(selectedZoneKey);
}

}
