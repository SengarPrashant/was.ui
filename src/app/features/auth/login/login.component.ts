import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../../shared/services/auth.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  errorMessage: string | null = null;
  emailMessage: string | null = null;
  passwordMessage: string | null = null;
  loginForm!: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(private titleService: Title,
     private loadingService: LoadingService,
     private auth: AuthService,
     private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    // Initialize the form with form controls, including "Remember Me"
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void {
    this.errorMessage = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loadingService.show();
    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.loadingService.hide();
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Incorrect email or password.';
          this.loadingService.hide();
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
          this.loadingService.hide();
        }
      }
    });

  }

    togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  onClickTerms() {
    const pdfUrl = 'assets/docs/Qubesafe_App_Terms_Conditions.pdf'
    window.open(pdfUrl, '_blank');
  }

}
