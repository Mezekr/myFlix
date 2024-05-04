import { Component, Input, OnInit } from '@angular/core';

// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

/**
 * @description Component representing the login form.
 * @selector 'app-user-login-form'
 * @templateUrl './user-login-form.component.html'
 * @styleUrls ['./user-login-form.component.scss']
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  /**
   * User data input.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Material dialog service for opening user login dialog.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   * @param {Router} router - Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Function responsible for sending the form inputs to the backend.
   * @returns Message "User login successful" / "User login failed"
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (response: any) => {
        console.log(response);

        // Store user and token in local Storage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        // closes the modal on success
        this.dialogRef.close();

        this.snackBar.open('User registerd succesfully', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
        });
        this.router.navigate(['movies']);
      },
      error: (response: any) => {
        this.snackBar.open('User registerd not succesfully', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
        });
      },
    });
  }
}
