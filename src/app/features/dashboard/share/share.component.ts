import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent {
  isDialogOpen = false;

  businessShareLink: string = 'pl8chat.com';
  individualShareLink: string = 'pl8chat.com/app';

  businessCopied: boolean = false;
  individualCopied: boolean = false;

  constructor(private dialogRef: MatDialogRef<ShareComponent>) {}

  // Copy the link to the clipboard
  copyToClipboard(link: string, type: 'business' | 'individual') {
    const input = document.createElement('input');
    input.value = link;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    if (type === 'business') {
      this.businessCopied = true;
      setTimeout(() => (this.businessCopied = false), 2000);
    } else if (type === 'individual') {
      this.individualCopied = true;
      setTimeout(() => (this.individualCopied = false), 2000);
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
