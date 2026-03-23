import { Component, inject, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { LocationValidator } from './location.validator';

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
  isEditMode = false;
  errorMsg = '';
  loading = false;

  lookupService = inject(LookupService);
  zoneOptions: any[][] = [];
 facilityOptions: any[][] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userService: UserService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.isEditMode = !!data;

    this.userForm = this.fb.group({
      id: [data?.id || 0],
      employeeId: [data?.employeeId || '', Validators.required],
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      mobile: [data?.mobile || '', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      roleId: [data?.roleId || '', Validators.required],
      locations: this.fb.array([], LocationValidator.unique())
    });


    // INIT
    if (this.isEditMode && data?.location?.length) {

      data.location.forEach((loc: any, index: number) => {

        // 1. Add form row
        this.locations.push(this.createLocationGroup(loc));

        // 2. Initialize arrays
        this.zoneOptions[index] = [];
        this.facilityOptions[index] = [];

        // 3. Load zones based on location
        this.lookupService.setSelectedLocationKey(loc.locationId);
        this.zoneOptions[index] = this.lookupService.zones();

        // 4. Load facilities based on zone
        this.lookupService.setSelectedZoneKey(loc.zoneId);
        this.facilityOptions[index] = this.lookupService.zoneFacility();
      });

    } else {
      this.addLocation();
    }
  }

  // FORM ARRAY
  get locations(): FormArray {
    return this.userForm.get('locations') as FormArray;
  }

  createLocationGroup(data?: any): FormGroup {
    return this.fb.group({
      id:[data?.id ||  0],
      isActive:[data?.isActive ?? true],
      locationId: [data?.locationId || '', Validators.required],
      zone: [data?.zoneId || '', Validators.required],
      facility: [data?.facilityId || '', Validators.required]
    });
  }

addLocation() {
  if (this.locations.invalid || this.locations.errors?.['duplicate']) return;

  this.locations.push(this.createLocationGroup());

  // 👇 create empty data for this row
  this.zoneOptions.push([]);
  this.facilityOptions.push([]);
}

get activeLocationsCount() {
  return this.locations.controls.filter(c => c.value.isActive).length;
}

 removeLocation(index: number) {
  const row = this.locations.at(index);
  const value = row.value;

  // ✅ Existing record → soft delete
  if (value.id && value.id > 0) {
    row.patchValue({ isActive: false });
  } 
  // ✅ New row → remove completely
  else {
    this.locations.removeAt(index);

    // also remove dropdown data
    this.zoneOptions.splice(index, 1);
    this.facilityOptions.splice(index, 1);
  }
}

 onLocationChange(value: any, index: number) {
    const row = this.locations.at(index);
    row.patchValue({ zone: null, facility: null });
    // ✅ fetch zones ONLY for this row
    this.lookupService.setSelectedLocationKey(value);
    this.zoneOptions[index] = this.lookupService.zones()
    // reset facility
    this.facilityOptions[index] = [];
  }

  onZoneChange(value: any, index: number) {
    const row = this.locations.at(index);
    row.patchValue({ facility: null });
    this.lookupService.setSelectedZoneKey(value);
    this.facilityOptions[index] = this.lookupService.zoneFacility();
    // ✅ fetch facility ONLY for this row
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const formData = this.userForm.value;

    const payload = {
      ...formData,
      password: `indiqube@${formData.employeeId}`,
      location: formData.locations.map((l: any) => ({
        id:l.id,
        isActive:l.isActive,
        locationId: l.locationId,
        zoneId: l.zone,
        facilityId: l.facility
      }))
    };

    delete payload.locations;

    this.loading = true;
    this.loadingService.show();

    this.userService.addAndUpdateUser(payload).subscribe({
      next: () => {
        this.loading = false;
        this.loadingService.hide();
        this.dialogRef.close('refresh');
      },
      error: (err) => {
        this.loading = false;
        this.loadingService.hide();

        if (err.status === 400) {
          this.errorMsg = 'User already exists!';
        }
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }


}
