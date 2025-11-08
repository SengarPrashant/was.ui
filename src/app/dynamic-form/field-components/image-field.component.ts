import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from './field-base';

@Component({
  selector: 'app-image-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="form" class="image-field-container">
      <img
        *ngIf="imageSrc"
        [src]="imageSrc"
        [alt]="config.label || 'Image'"
        class="preview-image"
        [ngClass]="{'scrollto':config.type === 'scrollto'}"
      />
      <div *ngIf="!imageSrc" class="no-image">No image available</div>
    </div>
  `,
  styles: [
    `
      .image-field-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-bottom: 1rem;
      }

      .image-label {
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      .preview-image {
        width:90%;
        object-fit: contain;
        border-radius: 8px;
        border: 1px solid #ccc;
        padding: 4px;
        cursor:pointer;
        background-color: #f9f9f9;
        height:445px;
      }

      .no-image {
        font-style: italic;
        color: #999;
      }
    `,
  ],
})
export class ImageFieldComponent {
  @Input() config!: FieldConfig;
  @Input() form!: FormGroup;

  get imageSrc(): string | null {
    return this.config?.label ? `assets/images/${this.config.label}` : null;
  }
}
