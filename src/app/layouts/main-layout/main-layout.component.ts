import { Component, HostListener, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LookupService } from '../../shared/services/lookup.service';
import { LoadingSpinnerComponent } from '../../shared/components/loader/loading-spinner.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, SidebarComponent, HeaderComponent, LoadingSpinnerComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
 isMobile = false;
 constructor(private lookupService: LookupService){}

  @HostListener('window:resize', [])
  onWindowResize(){
    this.onResize();
    
  }
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.onResize();
    this.loadAllLookup();
  }


  loadAllLookup(){
    this.lookupService.loadRoles();
    this.lookupService.loadZone();
  }
}
