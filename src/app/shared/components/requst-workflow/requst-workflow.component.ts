import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { workflowModel } from '../../models/work-permit.model';

@Component({
  selector: 'app-requst-workflow',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './requst-workflow.component.html',
  styleUrl: './requst-workflow.component.css'
})
export class RequstWorkflowComponent {

  @Input() workflow:workflowModel[] = [];


}
