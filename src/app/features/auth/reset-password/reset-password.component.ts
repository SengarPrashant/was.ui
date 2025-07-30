import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';     
import {MatSelectModule} from '@angular/material/select';

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
  userType = 'default'
  color: ThemePalette = "primary";
  currentStep = 2;
  passwordForm: FormGroup;
  personalForm: FormGroup;
  businessForm: FormGroup;


  showErrors = false;

  rules = {
    minLength: false,
    uppercase: false,
    number: false,
    symbol: false,
  };

  states: any = [
    {
      full: "Great Britain",
      short: "GB"
    },
    {
      full: "United States",
      short: "US"
    },
    {
      full: "Canada",
      short: "CA"
    }
  ];
  selectedState: string = "GB";

  constructor(private fb: FormBuilder, private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if(params['userType']){
        this.userType =params['userType']
      }
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
    });

    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.businessForm = this.getBusinessForm(this.userType);
  }

  getBusinessForm(userType:string){
    switch(userType){
      case 'parking':
      return this.fb.group({
        businessName: ['', Validators.required],
        streetAddress: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required],
        country: ['USA', Validators.required],
      });
      case 'driving':
      return this.fb.group({
        businessName: ['', Validators.required],
      });
      default:
      return this.fb.group({});  
    }
    
  }

  ngOnInit(): void {
    
  }

  get password() {
    return this.passwordForm.get('password')?.value || '';
  }

  onPasswordChange() {
    const val = this.password;
    this.rules.minLength = val.length >= 8;
    this.rules.uppercase = /[A-Z]/.test(val);
    this.rules.number = /\d/.test(val);
    this.rules.symbol = /[!@#\$%\^\&*\)\(+=._-]/.test(val);
  }

  shouldShowRed(key: keyof typeof this.rules): boolean {
    return !this.rules[key] && this.showErrors;
  }

  goToStep2() {
    const val = this.password;
    const passControl = this.passwordForm.get('password')
    this.showErrors = true;
    const allRulesPassed = Object.values(this.rules).every(Boolean);

    // if(val.length > 0 && !allRulesPassed){
    //   passControl?.setErrors({passwordRules:true})
    // } else{
    //   passControl?.setErrors(null)
    // }
    if (this.passwordForm.valid && allRulesPassed) {
      this.currentStep = 2;
    }
  }

  onBackClick() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onNextClick() {
      this.currentStep++;
  }
}
