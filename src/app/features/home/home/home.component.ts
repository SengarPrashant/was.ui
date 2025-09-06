import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { GlobalService } from '../../../shared/services/global.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableComponent } from '../../../shared/components/mat-table/mat-table.component';
import { TopCardComponent } from '../top-card/top-card.component';
import { metaDataModel, wpList } from '../../../shared/models/work-permit.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatTableComponent, MatButtonModule, TopCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    tableData:wpList[] = [];
    wpStatus:metaDataModel[] = [];
    inStatus:metaDataModel[] = [];
    columns = [
    {key:'requestId', label:'Id'},
    {key:'formTitle', label:'Work Permit Type'}, 
    {key:'facilityZoneLocation', label:'Location'},
    { key: 'zone', label: 'Zone' },
    { key: 'zoneFacility', label: 'Facility' },
    { key: 'submittedBy', label: 'Submitted by' },
    { key: 'submittedDate', label: 'Submitted date' },
    { key: 'pendingWith', label: 'Pending with' },
    { key: 'status', label: 'Status'},
  ];

  displayedColumns = ['requestId', 'formTitle', 'facilityZoneLocation', 'zone', 'zoneFacility', 'submittedBy', 'submittedDate', 'pendingWith', 'status',  'actions']

  constructor(private globalService: GlobalService){};


  ngOnInit(): void {

    const statusConfig: Record<string, { icon: string; kind: string }> = {
      'Pending':          { icon: 'hourglass_empty', kind: 'pending' },
      'Approved':         { icon: 'check_circle',    kind: 'approved' },
      'Rejected':         { icon: 'cancel',          kind: 'rejected' },
      'Work in progress': { icon: 'autorenew',       kind: 'inprogress' },
      'Closed':           { icon: 'done_all',        kind: 'closed' },
    };

    this.globalService.getAllWorkPermitAndIncident().subscribe(res => {
      if (res) {
        this.tableData = res.data.map((item: any) => ({
          ...item,
          facilityZoneLocation: item.facilityZoneLocation?.value,
          zone: item.zone?.value,
          zoneFacility: item.zoneFacility?.value,
          submittedBy: item.submittedBy?.value,
          pendingWith: item.pendingWith?.value,
          status: item.status?.value
        }));

        this.wpStatus = res.meta
          .filter(d => d.formType === 'work_permit')
          .map(d => ({
            ...d,
            icon: statusConfig[d.status].icon,
            kind: statusConfig[d.status].kind
          }));

        this.inStatus = res.meta
          .filter(d => d.formType === 'incident')
          .map(d => ({
            ...d,
            icon: statusConfig[d.status].icon,
            kind: statusConfig[d.status].kind
          }));

      }
    });

  }


  onStatusClick(name:string) {
  // e.g., filter table by status
}

}
