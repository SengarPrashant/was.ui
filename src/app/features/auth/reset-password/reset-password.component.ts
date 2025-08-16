import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';     
import {MatSelectModule} from '@angular/material/select';
import { AuthService } from '../../../shared/services/auth.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatRadioModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
   router = inject(Router);
  userType = 'default'
  color: ThemePalette = "primary";
  passwordForm: FormGroup;
  selectedState: string = "GB";
  otpRequested = false;

  constructor(private fb: FormBuilder, private route:ActivatedRoute,
     private auth: AuthService, private loadingService: LoadingService,
     private toastService:ToastService
    ) {

    this.passwordForm = this.fb.group({
      email:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: [''],
      otp:['']
    });

  }


  ngOnInit(): void {
    
  }

  get email() {
    return this.passwordForm.get('email')!;
  }

   get otp() {
    return this.passwordForm.get('otp')!;
  }

  get newPassword() {
    return this.passwordForm.get('password')!;
  }

  
  getOtp() {
    if (this.email.invalid) return;
    this.loadingService.show();
    this.auth.getOtp(this.email.value).subscribe({
      next: () => {
       this.toastService.showToast('Success', 'The otp sent on your email' , 'success'); 
       //this.email.disable();  
      this.otp.setValidators([Validators.required]);
      this.newPassword.setValidators([Validators.required, Validators.minLength(6)]);
      this.otp.updateValueAndValidity();
      this.newPassword.updateValueAndValidity();
      this.otpRequested = true;
        this.loadingService.hide();
      },
      error: (error) => {
          this.loadingService.hide();
        }
      });
  }

    onSubmit() {
    if (this.passwordForm.valid) {
      this.loadingService.show();
      this.auth.resetPassword(this.passwordForm.value).subscribe({
        next: () => {
          this.loadingService.hide();
          this.toastService.showToast('Success', 'Password reset successfully' , 'success');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (error) => {
          this.loadingService.hide();
        }
      });
      console.log('Reset request:', this.passwordForm.value);
      
       
      // Call API to reset password here
    }
  }


}
