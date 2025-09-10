// src/app/pages/user/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { MatTableComponent } from '../../../shared/components/mat-table/mat-table.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserStatusUpdateDilogComponent } from '../user-status-update-dilog/user-status-update-dilog.component';
import { LoadingService } from '../../../shared/services/loading.service';
import { ToastService } from '../../../shared/services/toast.service';
import { actionMenuModel } from '../../../shared/models/global.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone:true,
  imports:[CommonModule, MatTableComponent, MatButtonModule]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  actionMenu:actionMenuModel[] = [
    {name:'edit', label:'Edit', icon:'edit', enable:true},
     {name:'status', label:'Update user status', icon:'update', enable:true},
  ]
  columns = [
    {key:'employeeId', label:'Employee Id'},
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'roleName', label: 'Role Name' },
    { key: 'mobile', label: 'Mobile'},
    { key: 'statusName', label: 'Status' },
  ];

  displayedColumns = ['employeeId', 'name', 'email', 'roleName', 'mobile', 'statusName', 'actions']
  constructor(private userService: UserService,
     private loadingService: LoadingService,
     private dialog: MatDialog,
    private toastService:ToastService,
    ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loadingService.show();
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = this.transformedUsers(data);
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loadingService.hide();
      }
    });
  }

  transformedUsers(data: User[]) {
    const updatedUsers = data.map(user => ({
      ...user,
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
    }));

    return updatedUsers;
  }

  openAddUserPopup(userData?: any) {
  this.toastService.showToast('Success', 'User staus updated' , 'success');
  const dialogRef = this.dialog.open(AddUserDialogComponent, {
    width: '600px',
    data: userData || null // ← null for create, userData for edit
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'refresh') {
      this.fetchUsers(); // Refresh table
       this.toastService.showToast('Success', 'User added successfully' , 'success');

    }
  });
}

 openStatusPopup(userData?: User) {
  const dialogRef = this.dialog.open(UserStatusUpdateDilogComponent, {
    width: '400px',
    data: userData || null // ← null for create, userData for edit
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'refresh') {
      this.fetchUsers(); // Refresh table
       this.toastService.showToast('Success', 'User staus updated' , 'success');

    }
  });
}

onAction(event: { type: string; row: User }) {
  switch (event.type) {
    case 'view':
      this.onView(event.row);
      break;
    case 'edit':
      this.onEdit(event.row);
      break;
       case 'status':
      this.updateStatus(event.row);
      break;
  }
}

onView(row: User) {
  console.log('View:', row);
}

onEdit(row: User) {
 this.openAddUserPopup(row);
}

updateStatus(row: User) {
 this.openStatusPopup(row);
}


}
