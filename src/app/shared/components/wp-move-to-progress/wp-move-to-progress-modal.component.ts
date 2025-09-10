import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-wp-progress-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './wp-move-to-progress-modal.component.html',
  styleUrl: './wp-move-to-progress-modal.component.css'
})
export class WpProgressModalComponent {
   actionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private globalService:GlobalService,
    public dialogRef: MatDialogRef<WpProgressModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { id: number },

  ){

    this.actionForm = this.fb.group({
    id: [this.data?.id || 0],
    status: ['', Validators.required],
    remarks:['']
    });
  }


   get actionLabel(): string {
    return this.actionForm.get('status')?.value === '4' ? 'Reject' : 'Approve';
  }

  onSubmit() {
    if (this.actionForm.valid) {
       this.globalService.postWPUpdateStatus(this.actionForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        
      }
    });
    }
  }


}
