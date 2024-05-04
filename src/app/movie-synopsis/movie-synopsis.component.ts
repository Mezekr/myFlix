import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * @description Component representing the movie synopsis dialog.
 * @selector 'app-movie-synopsis'
 * @templateUrl './movie-synopsis.component.html'
 * @styleUrls ['./movie-synopsis.component.scss']
 */
@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrl: './movie-synopsis.component.scss',
})
export class MovieSynopsisComponent {
  movie: any;

  /**
   * @constructor - Constructor for MovieSynopsisComponent.
   * @param data - Javascript object of the film description.
   */
  constructor(
    public dialogRef: MatDialogRef<MovieSynopsisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
