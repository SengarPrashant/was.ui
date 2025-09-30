import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from '../../services/global.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-preview-modal',
  standalone: true,
  imports: [SafeUrlPipe, CommonModule],
  templateUrl: './document-preview-modal.component.html',
  styleUrl: './document-preview-modal.component.css'
})
export class DocumentPreviewModalComponent implements OnInit {
  pdfUrl:string = '';
  imageUrl:string = '';

  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<DocumentPreviewModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data: { id: number },
  ){

  }

  ngOnInit(): void {
    this.getDocumentBlob();
  }

  getDocumentBlob() {
    this.globalService.getDocumentById(this.data.id).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      this.previewFile(url, blob.type)
    })
  }

  previewFile(fileURL: string, mimeType: string) {
    if (mimeType === 'application/pdf') {
      this.pdfUrl = fileURL;   // bind to iframe
    } else if (mimeType.startsWith('image/')) {
      this.imageUrl = fileURL; // bind to <img>
    }
  }

}
