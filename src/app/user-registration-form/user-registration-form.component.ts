import { Component, Input, OnInit } from '@angular/core';

// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';

/**
 * @description Component representing the signup form.
 * @selector 'app-user-registration-form'
 * @templateUrl './user-registration-form.component.html'
 * @styleUrls ['./user-registration-form.component.scss']
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * User data input.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @constructor - Constructor for UserRegistrationFormComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Material dialog service for opening dialogs.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Function to sending the form inputs to the backend.
   * @returns Message "User registration successful".
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (response: any) => {
        console.log(response);
        // closes the modal on success
        this.dialogRef.close();

        this.snackBar.open('User registerd succesfully', 'OK', {
          duration: 2000,
        });
      },
      error: (response: any) => {
        this.snackBar.open('User registerd not succesfully', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
