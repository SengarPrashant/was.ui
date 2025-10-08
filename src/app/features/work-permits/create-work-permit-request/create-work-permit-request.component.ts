import { Component } from '@angular/core';
import { CreateRequestComponent } from '../../../shared/components/create-request/create-request.component';

@Component({
  selector: 'app-create-work-permit-request',
  standalone: true,
  imports: [CreateRequestComponent],
  templateUrl: './create-work-permit-request.component.html',
  styleUrl: './create-work-permit-request.component.css'
})
export class CreateWorkPermitRequestComponent {

}
