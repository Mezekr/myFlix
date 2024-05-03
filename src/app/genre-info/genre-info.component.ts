import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrl: './genre-info.component.scss',
})
export class GenreInfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GenreInfoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
