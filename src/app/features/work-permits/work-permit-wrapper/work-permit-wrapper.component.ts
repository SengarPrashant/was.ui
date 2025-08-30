import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableComponent } from '../../../shared/components/mat-table/mat-table.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-work-permit-wrapper',
  standalone: true,
  imports: [CommonModule, MatTableComponent, MatButtonModule],
  templateUrl: './work-permit-wrapper.component.html',
  styleUrl: './work-permit-wrapper.component.css'
})
export class WorkPermitWrapperComponent {

constructor(private router: Router) {}

onClickCreateWorkPermit(){
  this.router.navigate(['/add-work-permit'])
}
}
