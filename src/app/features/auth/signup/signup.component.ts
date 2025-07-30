import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../../shared/services/loading.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, RouterModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm: FormGroup;
  loading = false;
  isFormSubmitted = false;
  errorMessage = '';
  constructor(
     private fb: FormBuilder,
     private router:Router,
     private loadingService: LoadingService
    ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
    });
  }

  backToSignup(){
    this.isFormSubmitted = false;
    this.router.navigate(['/signup']);
  }

  onSubmit(){
    
  }
  

}
