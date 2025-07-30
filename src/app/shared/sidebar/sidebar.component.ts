import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuInterface } from '../../user.interface';

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
      label: 'Dashboard',
      icon: 'home',
      route: '/dashboard',
      type: 'item'
    }
    // {
    //   label: 'Vehicles',
    //   icon: 'message',
    //   type: 'submenu',
    //   children: [
    //     { label: 'Manage vehicles', route: '/vehicles/manage' }
    //   ]
    // },
  ];
  

  constructor(
    private router: Router,
    private eRef: ElementRef,
  ) { 

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
