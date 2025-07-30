import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to perform this action?';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() selectedAction: 'block' | 'delete' = 'block'; // New input for action type
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    this.dialogRef = dialogRef;
  }

  ngOnInit() {
    // Dynamically change content based on selected action
    if (this.selectedAction === 'block') {
      this.title = 'Block User';
      this.message = `Are you sure you want to block this user? They won’t know you blocked them and you can undo this later in settings.`;
      this.confirmText = 'Block';
    } else if (this.selectedAction === 'delete') {
      this.title = 'Delete Conversation';
      this.message = `Are you sure you want to delete this conversation? This action cannot be undone.`;
      this.confirmText = 'Delete';
    }
  }

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.dialogRef.close();
  }
}
