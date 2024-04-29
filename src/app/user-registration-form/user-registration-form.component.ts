import { Component, Input, OnInit } from '@angular/core';

// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

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
