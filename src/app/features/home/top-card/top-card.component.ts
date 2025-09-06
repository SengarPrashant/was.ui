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
  @Input() loading = false;
  @Output() cardClick = new EventEmitter<string>();

  onClick(name: string) {
    this.cardClick.emit(name);
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

