import { Component, Input, OnInit } from '@angular/core';

// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (response: any) => {
        console.log(response);

        // Store user and token in local Storage
        localStorage.setItem('user', response.user.Username);
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
