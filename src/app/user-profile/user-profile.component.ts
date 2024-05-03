import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
// Components
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Email: '',
    Birthday: '',
  };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getFavMovies();
  }

  //Gets user Profile information
  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    // this.userData.FavoriteMovies = this.user.FavouriteMovies;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) =>
        this.user.FavouriteMovies?.includes(movie._id)
      );
    });
  }

  // Updats user information
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (response) => {
        console.log('from updateUser' + this.userData);

        console.log('User updated successfully');
        localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open('User update successful', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.snackBar.open('Failed to update user', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  // Deletes user profile
  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('User successfully deleted.', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
      });
    });
    this.fetchApiData.deleteUser().subscribe((response) => {
      console.log(response);
    });
  }

  // Gets all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Gets favorites Movie list
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    // this.userData.FavoriteMovies = this.user.FavouriteMovies;
    this.FavoriteMovies = this.user.FavouriteMovies;
    console.log('Fav Movies in getFavMovie', this.FavoriteMovies);
  }

  // check if movie is a favorite movie.
  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies?.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  // Deletes movie from favMovie list.
  deleteFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavouriteMovies(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.getProfile();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }

  // opens the dialog when director button is clicked
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      width: '500px',
    });
  }

  // opens the dialog when genre button is clicked.
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  // opens the dialog when synopsis button is clicked
  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { movie },
      maxWidth: '460px',
    });
  }
}
