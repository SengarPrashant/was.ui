import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { basicLookupModel } from '../../../shared/models/looup.model';
import { UserService } from '../../../shared/services/user.service';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-user-status-update-dilog',
  standalone: true,
 imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule
  ],
  templateUrl: './user-status-update-dilog.component.html',
  styleUrl: './user-status-update-dilog.component.css'
})
export class UserStatusUpdateDilogComponent implements OnInit {
   status = new FormControl('');

  statusLookup:basicLookupModel[] = [
    {id:0, name: 'Deactivated'},
    {id:1, name: 'Active'},
    {id:2, name: 'Blocked'}
  ]
  constructor(
    public dialogRef: MatDialogRef<UserStatusUpdateDilogComponent>,
    private userService:UserService,
    private loadingService:LoadingService,
     @Inject(MAT_DIALOG_DATA) public data: any

  ){
  }

  ngOnInit(): void {
    this.status.setValue(this.data?.activeStatus);
  }

  onClickUpdate(){
    const payload = {
      id:this.data?.id,
      status:Number(this.status.value)
    }
     this.loadingService.show();
    this.userService.updateUserStatus(payload).subscribe({
      next: (data) => {
        this.loadingService.hide();
        this.dialogRef.close('refresh');
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loadingService.hide();
        this.dialogRef.close('refresh');
      }
    });
  }

    onCancel() {
    this.dialogRef.close();
  }
}
