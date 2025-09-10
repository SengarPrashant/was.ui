import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { actionMenuModel } from '../../models/global.model';

@Component({
  selector: 'app-mat-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIcon
  ],
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columns: { key: string; label: string }[] = [];
  @Input() pageSize = 10;
  @Input() filterKey?: string;
  @Output() action = new EventEmitter<{ type: string, row: any }>();
  @Input() title:string = '';
  @Input() requiredRightSpace = false;
  @Input() marginRightSpace = '124px'
  @Input() actionMenu:actionMenuModel[] = [];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // if (this.filterKey) {
      //   this.dataSource.filterPredicate = (data, filter: string) =>
      //     (data[this.filterKey!] ?? '').toString().toLowerCase().includes(filter.toLowerCase());
      // }
    }
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusClass(status: string): string {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-500';
    case 'inactive':
      return 'bg-gray-500';
    case 'pending':
      return 'bg-yellow-500 text-black';
    case 'suspended':
      return 'bg-red-500';
    default:
      return 'bg-blue-500';
  }
}

onClickMatMenu(action:string, row:any){
  this.action.emit({type:action, row})
}

isDisable(action:string, row:any){
  if(action === 'move' && row?.statusId !== '1'){
    return true;
  } else{
    return false;
  }
}

}
