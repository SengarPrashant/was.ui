import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { metaDataModel } from '../../../shared/models/work-permit.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-top-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
   templateUrl: './top-card.component.html',
   styleUrl: './top-card.component.css'
})
export class TopCardComponent {
  @Input() topStatus: metaDataModel[] = [];
  @Input() loading = false
  @Output() clickedStatus = new EventEmitter<string>();
  @Input() activeTabIndex = 0;

  onClickStatus(status:string){
    this.clickedStatus.emit(status);
  }

  getClassName(val:string){
    if(val === 'Work in progress'){
      return 'inprogress'
    } else{
 return val.toLowerCase();
    }

  }

  // for accessibility ids
  //idFor(s: TopStat, i: number) { return `${s.name}-card-${i}`; }
}

