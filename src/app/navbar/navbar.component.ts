import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @description Component representing the navbar.
 * @selector 'app-navbar'
 * @templateUrl './navbar.component.html'
 * @styleUrls ['./navbar.component.scss']
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  /**
   * @constructor - Constructor for NavbarComponent.
   * @param {Router} router - Router service for navigation.
   * @param {MatSnackBar} snackBar - Material snack bar service
   * for displaying notifications.
   */
  constructor(public snackBar: MatSnackBar, public router: Router) {}

  ngOnInit(): void {}

  /**
   * Function to navigate to movies page.
   */
  public navigateToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Function to navigate to profile page.
   */
  public navigateToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Function to navigate to welcome page.
   */
  navigateToWelcome(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  /**
   * Function to logout user.
   * @returns Message "User logout successful".
   */
  public logoutUser(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.snackBar.open('You have been logged out', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}
