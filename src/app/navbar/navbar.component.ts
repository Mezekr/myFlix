import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(public snackBar: MatSnackBar, public router: Router) {}

  ngOnInit(): void {}

  public navigateToMovies(): void {
    this.router.navigate(['movies']);
  }
  public navigateToProfile(): void {
    this.router.navigate(['profile']);
  }
  navigateToWelcome(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  public logoutUser(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.snackBar.open('You have been logged out', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}
