import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Import your standalone component
import { AppComponent } from './app.component'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import {routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    // Import the standalone component here
    AppComponent,
    MatProgressSpinnerModule,
    RouterModule, 
    MatSnackBarModule,
    RouterModule.forRoot(routes) 
 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // Set global snack bar options
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 200, verticalPosition: 'bottom' } }

  ]
})
export class AppModule { }
