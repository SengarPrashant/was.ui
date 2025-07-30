import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ShareComponent } from './share/share.component';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user: any | null = null;
  communityName: string | null = null;
  
  vehicleMessagingCard = {
    title: 'Stay connected to your parking customers',
    description: 'Start a chat conversation with vehicles in your community by entering their license plate info.',
    linkText: 'Send a PL8CHAT'
  };

  cards = [
    {
      title: 'Need help?',
      description: 'Choose a few options to connect with us today',
      buttonText: 'Contact support'
    },
    {
      title: 'Provide feedback',
      description: 'Tell us what you think about your experience to help make it better',
      buttonText: 'Send feedback'
    },
    {
      title: 'Spread the word',
      description: 'Share with a friend or business and help us grow our community',
      buttonText: 'Share now'
    },
    {
      title: 'Have an idea?',
      description: 'We’re always looking for new ways to make PL8CHAT even better',
      buttonText: 'Share your idea'
    }
  ];
  

  constructor(
    private loadingService: LoadingService,
    private titleServices: Title
  ) {}

  async ngOnInit(): Promise<void> {
  }

  // Property to manage the modal state
  isModalOpen: boolean = false;
  // Property to hold the name of the group chat
  groupChatName: string = '';

  // Inject the MatDialog service
  dialog = inject(MatDialog);

  // Method to open the Create New Grou9p Chat dialog
  openModal(): void {
    const dialogRef = this.dialog.open(ShareComponent, {
      width: '500px',
      height: '320px',
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit(); // Refresh the grid after the popup is closed
    });
  }

  isDialogOpen = false; // Controls whether the dialog is visible

  // Close the dialog
  closeDialog() {
    this.isDialogOpen = false;
  }
}
