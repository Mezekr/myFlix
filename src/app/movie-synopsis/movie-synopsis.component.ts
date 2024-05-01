import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrl: './movie-synopsis.component.scss',
})
export class MovieSynopsisComponent {
  movie: any;

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
