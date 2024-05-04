import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

/**
 * @description Component representing the welcome page.
 * @selector 'app-welcome-page'
 * @templateUrl './welcome-page.component.html'
 * @styleUrls ['./welcome-page.component.scss']
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  /**
   * @constructor
   * @param {MatDialog} dialog - Material dialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Function that will open the dialog when the signup button is clicked.
   * @returns Dialog with the UserRegistrationFormComponent.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      maxWidth: '320px',
    });
  }

  /**
   * Function that will open the dialog when the login button is clicked.
   * @returns Dialog with the UserLoginFormComponent.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      maxWidth: '320px',
    });
  }
}
