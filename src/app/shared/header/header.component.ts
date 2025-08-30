import {  Component, EventEmitter, Output, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  isMobile = false;
  user:User | null = this.auth.getUser();
  greetingMessage: string = '';
  constructor(private auth:AuthService, private router:Router){

  }

  @HostListener('window:resize', [])
  onWindowResize(){
    this.onResize();
    
  }
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.onResize();
     this.setGreeting();
  }

  logout(){
    this.auth.logout();
  }

    userProfile(){
    this.router.navigate(['/my-profile'])
  }

    setGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      this.greetingMessage = 'Good Morning!!';
    } else if (hour >= 12 && hour < 17) {
      this.greetingMessage = 'Good Afternoon!!';
    } else {
      this.greetingMessage = 'Good Evening!!';
    }
  }

  openPdfInNewTab(type:number): void {
    const pdfUrl = type === 1 ? 'assets/docs/Work_Permit_Procedure.pdf':
    'assets/docs/Incident_Report_Procedure.pdf'
    window.open(pdfUrl, '_blank');
  }

}
