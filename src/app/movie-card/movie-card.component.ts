import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (response: any) => {
        this.movies = response;
        console.log(this.movies);
        return this.movies;
      },
      error: (error) => {
        this.snackBar.open(error.message, 'OK', {
          duration: 2000,
          verticalPosition: 'top',
        });
      },
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { movie },
      maxWidth: '460px',
    });
  }
}
