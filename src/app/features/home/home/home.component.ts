import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { GlobalService } from '../../../shared/services/global.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableComponent } from '../../../shared/components/mat-table/mat-table.component';
import { TopCardComponent } from '../top-card/top-card.component';
import { firstValueFrom, Subscription } from 'rxjs';
import { actionMenuModel } from '../../../shared/models/global.model';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { roleTypeEnum, wpStatusEnum } from '../../../shared/enums/global.enum';
import { MatDialog } from '@angular/material/dialog';
import { WpApproveRejectModalComponent } from '../../../shared/components/wp-approve-reject-modal/wp-approve-reject-modal.component';
import { ToastService } from '../../../shared/services/toast.service';
import { WpProgressModalComponent } from '../../../shared/components/wp-move-to-progress/wp-move-to-progress-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { RequstWorkflowComponent } from '../../../shared/components/requst-workflow/requst-workflow.component';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CreateRequestComponent } from '../../../shared/components/create-request/create-request.component';
import { formDataByIDModel, metaDataModel, wpList } from '../../../shared/models/work-permit.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatTabsModule, 
    MatTableComponent, 
    MatButtonModule, 
    TopCardComponent,
    CreateRequestComponent,
    MatIconModule,
    RequstWorkflowComponent,
    MatFormFieldModule,
     MatDatepickerModule, 
     FormsModule, 
     ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[DatePipe, provideNativeDateAdapter()]
})
export class HomeComponent implements OnInit {
subscriptions: Subscription[] = [];
  dialog = inject(MatDialog);
  openDilog = false;
  dataById!:formDataByIDModel;
  selectedAction:string = '';
  activeTabIndex = 0;
  user:User | null = null;
    tableData:wpList[] = [];
    wpStatus:metaDataModel[] = [];
    inStatus:metaDataModel[] = [];
    startDate:Date | null = null;
    endDate:Date | null = null;
    actionMenu:actionMenuModel[] = [];
    actionMenuIncident:actionMenuModel[] = []
    columns = [
    {key:'requestId', label:'Id', colWidth:"160px"},
    {key:'formTitle', label:'Work Permit Type', colWidth:"160px"}, 
    {key:'facilityZoneLocation', label:'Location', colWidth:"160px"},
    { key: 'zone', label: 'Zone', colWidth:"160px"},
    { key: 'zoneFacility', label: 'Facility', colWidth:"160px" },
    { key: 'submittedBy', label: 'Submitted by', colWidth:"160px" },
    { key: 'submittedDate', label: 'Submitted date', colWidth:"160px"},
    { key: 'pendingWith', label: 'Pending with', colWidth:"160px"},
    { key: 'statusName', label: 'Status', colWidth:"160px" },
  ];

  displayedColumns = ['requestId', 'formTitle', 'facilityZoneLocation', 'zone', 'zoneFacility', 'submittedBy', 'submittedDate', 'pendingWith', 'statusName',  'actions']

  statusConfig: Record<string, { icon: string; kind: string }> = {
    'Pending':          { icon: 'hourglass_empty', kind: 'pending' },
    'Approved':         { icon: 'check_circle',    kind: 'approved' },
    'Rejected':         { icon: 'cancel',          kind: 'rejected' },
    'Work in progress': { icon: 'autorenew',       kind: 'inprogress' },
    'Closed':           { icon: 'done_all',        kind: 'closed' },
  };

  clickedTopStatus:string = '';
   range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private globalService: GlobalService,
     private authService:AuthService,
      private toastService: ToastService,
      private datePipe:DatePipe
    ){
    this.user = this.authService.getUser();
     // Subscribe to changes
    this.range.valueChanges.subscribe(val => {
      this.onDateRangeChange(val);
    });
  };


  ngOnInit(): void {
    if(this.user?.roleId){
      this.setActionByRole(this.user.roleId);
      this.setActionByRoleIncident(this.user.roleId);
    }
    this.fetchListData();
  }

    onDateRangeChange(val: { start?: Date | null; end?: Date | null }) {
    this.startDate = val.start ? val.start : null;
    this.endDate = val.end ? val.end : null;
    this.fetchListData()
  }

// Helper: Convert a Date to IST Date object with custom time
 toIST(date: Date, hours = 0, minutes = 0, seconds = 0): Date {
  const d = new Date(date);
  d.setHours(hours, minutes, seconds, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000); // Adjust for local offset
}

  fetchListData(){
    const payload = {
      formType:this.activeTabIndex === 0 ? 'work_permit' : 'incident',
      fromDate: this.startDate? this.toIST(this.startDate!, 0, 0, 0): null,
      toDate: this.endDate? this.toIST(this.endDate!, 23, 59, 59):null,
    }
     const sub1 = this.globalService.getAllWorkPermitAndIncident(payload).subscribe(res => {
      if (res) {
        this.tableData = res.data.map((item: any) => ({
          ...item,
          facilityZoneLocation: item.facilityZoneLocation?.value,
          zone: item.zone?.value,
          zoneFacility: item.zoneFacility?.value,
          submittedBy: item.submittedBy?.value,
          pendingWith: item.pendingWith?.value,
          statusName: this.activeTabIndex === 0 ? item.status?.value : 'Submitted',
          statusId:item.status?.key,
          submittedDate:this.datePipe.transform(item.submittedDate, 'dd/MM/yyy, hh:mm a'),
          statusClass:this.getClassName(item.status?.key),
          pendingWithId:item.pendingWith?.key,
        }));

        this.wpStatus = res.meta
          .filter(d => d.formType === 'work_permit')
          .map(d => ({
            ...d,
            icon: this.statusConfig[d.status].icon,
            kind: this.statusConfig[d.status].kind
          }));

        this.inStatus = res.meta
          .filter(d => d.formType === 'incident')
          .map(d => ({
            ...d,
            icon: '',
            kind: ''
          }));

      }
    });

    this.subscriptions.push(sub1);
  }


  onStatusClick(status:any) {
    this.clickedTopStatus = status;
}

onTabChange(event: MatTabChangeEvent): void {
    // Get the index of the newly selected tab
    this.activeTabIndex = event.index;
    this.tableData = [];
    this.updateColumnLabel(event.index);
    this.fetchListData();
  }

  updateColumnLabel(tabId:number){
    const targetColumn = this.columns.find(col => col.key === 'pendingWith');
    const permitTypeColumn = this.columns.find(col => col.key === 'formTitle');
    if(targetColumn && permitTypeColumn){
      if(tabId === 0){
        targetColumn.label = 'Pending with'
        permitTypeColumn.label = 'Work Permit Type'
      } else if(tabId === 1){
        permitTypeColumn.label = 'Incidennt Type'
      }
    }
  }

  getClassName(key: string):string {
    let className = ''
    switch (key) {
      case wpStatusEnum.Pending:
        className = 'pending'
        break;
      case wpStatusEnum.Approved:
        className = 'approved'
        break;
      case wpStatusEnum.Work_in_progress:
        className = 'inprogress'
        break;
      case wpStatusEnum.Closed:
        className = 'closed'
        break;
      case wpStatusEnum.Rejected:
        className = 'rejected'
        break;
      default:
        className = 'pending'
        break;
    }
    return className;
  }

  setActionByRoleIncident(roleId: number) {
    this.actionMenuIncident = [];
    if (roleId === roleTypeEnum.PM_FM) {
      this.actionMenuIncident.push(
        { name: 'view', label: 'View', icon: 'visibility', enable: true },
      )
    }
    if (roleId === roleTypeEnum.Admin || roleId === roleTypeEnum.EHS_Manager) {
      this.actionMenuIncident.push(
        { name: 'view', label: 'View', icon: 'visibility', enable: true },
        { name: 'edit', label: 'Edit', icon: 'edit', enable: true },
      )
    }
  }

setActionByRole(roleId:number){
  this.actionMenu = []
  if(roleId === roleTypeEnum.PM_FM){
     this.actionMenu.push(
        {name:'view', label:'View', icon:'visibility', enable:true},
         {name:'edit', label:'Edit', icon:'edit', enable:true},
        {name:'move', label:'Move', icon:'edit', enable:true}
      )
  }

   if(roleId === roleTypeEnum.Admin || roleId === roleTypeEnum.EHS_Manager){
     this.actionMenu.push(
       {name:'view', label:'View', icon:'visibility', enable:true},
        {name:'edit', label:'Edit', icon:'edit', enable:true},
        {name:'approveAndReject', label:'Approve/Reject', icon:'check_circle', enable:true}
      )
  }

  if(roleId === roleTypeEnum.Area_Manager){
    this.actionMenu.push(
       {name:'view', label:'View', icon:'visibility', enable:true},
        {name:'approveAndReject', label:'Approve/Reject', icon:'check_circle', enable:true}
      )
  }
}

getMargin():string{
    if(this.activeTabIndex === 0){
      return '110px'
    } else{
      return '110px'
    }
}

onAction(event: { type: string; row: wpList }) {
  this.selectedAction = event.type;
  switch (event.type) {
    case 'view':
       this.onEditAndView(event.row);
      break;
    case 'edit':
      this.onEditAndView(event.row);
      break;
       case 'approveAndReject':
      this.openARModal(event.row);
      break;
      case 'move':
      this.moveToProgress(event.row);
      break;
  }
}

// clearDates() {
//   this.range.patchValue({ start: null, end: null });
// }
 clearDateRange(event: Event) {
    event.stopPropagation(); // prevent datepicker from opening
    this.range.patchValue({ start: null, end: null });
  }

  async onEditAndView(row: wpList) {
    try {
    this.dataById = await firstValueFrom(this.globalService.getFormDataById(row.id));
      if (this.dataById) {
       this.openDilog = true;
      }
    } catch (error) {
      console.error('Error fetching data by Id:', error)
    }
  }

  openARModal(row: wpList) {
    const dialogRef = this.dialog.open(WpApproveRejectModalComponent, {
      width: '580px',
      data: {
        id: row.id
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.toastService.showToast('Success', 'Status updated successfully', 'success');
        this.fetchListData();
      } else {
        //this.loadingService.hide()
      }
    });
  }


   moveToProgress(row: wpList) {
    const dialogRef = this.dialog.open(WpProgressModalComponent, {
      width: '580px',
      data: {
        id: row.id
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.toastService.showToast('Success', 'Status updated successfully', 'success');
        this.fetchListData();
      } else {
        //this.loadingService.hide()
      }
    });
  }


  onClose(clicked:boolean){
    if(clicked){
      this.openDilog = false;
    }
  }


  ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}
  

}
