import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://meziflix-api-v1.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // Call User login endpoint API
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // Get all movies from API
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get a Movie by Title from API
  getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get genre of a movie by title
  getGenre(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/genres/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get Director of a movie by title
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get user
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }
  // Get favourite movies for a user
  getFavouriteMovies(username: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${user.Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  //   Add a movie to favourite Movies
  addFavouriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .post(`${apiUrl}users/${user.Username}/movies/${movie}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // Edit user
  editUser(username: any): Observable<any> {
    console.log(username);
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}users/${username}`, username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // Delete user and
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}users/${user.Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // Delete a movie from the favorite movies
  deleteFavouriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}users/${user.Username}/movies/${movie}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // helper method to handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return new Error('Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }
}
