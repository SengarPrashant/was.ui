import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuInterface } from '../../user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatListModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
filteredMenuItems:MenuInterface[] = []
  menu:MenuInterface[] = [
    {
      label: 'Home',
      icon: 'home',
      route: '/home',
      type: 'item'
    },

     {
      label: 'Work permit',
      icon: 'create',
      route: '/work-permit',
      type: 'item',
      roles:['pm_fm']
    },

     {
      label: 'Incident',
      icon: 'create',
      route: '/work-permitt',
      type: 'item',
      roles:['pm_fm']
    },

    {
    label: 'Users',
    icon: 'admin',
    route: '/users',
    type: 'item',
    roles: ['admin']
    },
  ];
  

  constructor(
    private router: Router,
    private eRef: ElementRef,
    private authService:AuthService
  ) { 
     const user = this.authService.getUser();
    const userRole = user?.roleName || ''
    this.filteredMenuItems = this.menu.filter(item =>
      !item.roles || item.roles.includes(userRole)
    );
  }
  selectedLink: string = '';
  isSidebarOpen: boolean = true; // Controls sidebar collapse/uncollapse state

  isSelected: boolean = false;

  toggleSelection(): void {
    this.isSelected = !this.isSelected;
  }

  dropdownOpen = false;

  // Toggle dropdown visibility
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Close dropdown when clicking outside or pressing the Esc key
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: KeyboardEvent) {
    this.closeDropdown();
  }

  // Close dropdown
  closeDropdown() {
    this.dropdownOpen = false;
  }

  // Methods for dropdown options
  viewProfile() {
    console.log('Navigating to profile');
    this.closeDropdown();
  }

  selectLink(link: string) {
    this.selectedLink = link;
  }
}
