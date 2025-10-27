import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormBuilderService } from './form-builder.service';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { MatButtonModule } from '@angular/material/button';
import { formDataByIDModel } from '../shared/models/work-permit.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    DynamicFieldDirective,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'] 
})
export class DynamicFormComponent implements OnInit {
  dialog = inject(MatDialog);
  @Input() config: any;
  @Input() formData!:formDataByIDModel
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() selectedAction:string = 'none'

  form!: FormGroup;
  lastValidStartDate: any = null;
  lastValidEndDate: any = null;

  @ViewChild(DynamicFieldDirective, { static: true }) dynamicField!: DynamicFieldDirective;

  constructor(private fb: FormBuilder, private el:ElementRef,
    private formBuilderService:FormBuilderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    document.addEventListener('click', this.onClickScrollTo)
      this.form = this.formBuilderService.createForm(this.config?.formDetails);
      if(this.formData){
        this.form.patchValue(this.formData?.formData?.formDetails);
      }
       this.formReady.emit(this.form); 
        this.lastValidStartDate = this.form.get('datetime_of_work_from')?.value;
    this.lastValidEndDate = this.form.get('datetime_of_work_to')?.value;

      this.form.get?.('inc_datetime')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedDate = new Date(value);
        const now = new Date();
        const diffInHours = (now.getTime() - selectedDate.getTime()) / (1000 * 60 * 60);

        if (diffInHours > 24) {
          this.form.get('delay_justification')?.setValidators([Validators.required]);
        } else {
          this.form.get('delay_justification')?.clearValidators();
        }
        this.form.get('delay_justification')?.updateValueAndValidity();
      }
    });

    this.form.get('datetime_of_work_from')?.valueChanges.subscribe(() => this.checkDateDifference(1));
    this.form.get('datetime_of_work_to')?.valueChanges.subscribe(() => this.checkDateDifference(2));

  }

  private onClickScrollTo = (event:MouseEvent) =>{
    const target = event.target as HTMLElement;
    if(target && target.classList.contains('scrollto')){
      this.scrollToControl('root_cause')
    }
  }



  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

    scrollToControl(controlName: string) {
    const element = this.el.nativeElement.querySelector(
      `[data-scroll="${controlName}"]`
    );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }


   private checkDateDifference(dateType:number) {
    const start = this.form.get('datetime_of_work_from')?.value;
    const end = this.form.get('datetime_of_work_to')?.value;

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays > 7) {
        this.showToastMessage();
        if(dateType === 1){
          this.form.get('datetime_of_work_from')?.setValue(this.lastValidStartDate, { emitEvent: false });
        }

        if(dateType === 2){
          this.form.get('datetime_of_work_to')?.setValue(this.lastValidEndDate, { emitEvent: false });
        }
        // this.snackBar.open('⚠️ Date range cannot exceed 7 days.', 'Close', {
        //   duration: 4000,
        //   panelClass: ['warning-snackbar']
        // });
      }
    }
  }


  showToastMessage(): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Work permit',
          message: `Work permit date can not be allowed more than 7 days`,
          confirmText: 'Ok',
          cancelText: 'Cancel',
        },
      });
  
      dialogRef.afterClosed().subscribe((confirmed) => {

      });
    }

}