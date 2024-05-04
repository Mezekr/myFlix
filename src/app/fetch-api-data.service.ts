import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://meziflix-api-v1.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * @constructor
   * @param {HttpClient} http - For making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Making the api call for the user registration endpoint.
   * @param {any} userDetails - User details for registration.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Making the api call for the user login endpoint
   * @param {any} userDetails - User details for login.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Making the api call for the Get All Movies endpoint
   * @returns {Observable<any>} - Observable for the API response.
   */
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

  /**
   * Making the api call for the Get One Movie endpoint.
   * @param {string} title - One movie title.
   * @returns {Observable<any>} - Observable for the API response.
   */
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

  /**
   * Making the api call for the Get Genre endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
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

  /**
   * Making the api call for the Get Director endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
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

  /**
   * Making the api call for the Get User endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  /**
   * Making the api call for the Get Favourite Movies for a user endpoint
   * @param {string} username - Users username for getting favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getFavouriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the Add a Movie to Favourite Movies endpoint.
   * @param {any} movie - Movie for adding to favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
  addFavouriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie);
    console.log('in fetch api service_id: ', movie._id);
    console.log('from localStorage' + user.UserName);

    return this.http
      .put(`${apiUrl}users/${user.Username}/movies/${movie._id}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the Delete a Movie to Favourite Movies endpoint
   * @param {any} movie - Movie for deleting from favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
  deleteFavouriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie._id);
    return this.http
      .delete(`${apiUrl}users/${user.Username}/movies/${movie._id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the Edit User endpoint.
   * @param {any} userDetails - User details for updating user information.
   * @returns {Observable<any>} - Observable for the API response.
   */
  editUser(userDetails: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('from Api' + JSON.stringify(userDetails));

    return this.http
      .put(`${apiUrl}users/${user.Username}`, JSON.stringify(userDetails), {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the Delete User endpoint
   * @returns {Observable<any>} - Observable for the API response.
   */
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

  /**
   * Handling of HTTP errors.
   * @param {HttpErrorResponse} error - HTTP error response.
   * @returns {any} - Error details.
   */
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

  /**
   * Non-typed response extraction.
   * @param {Object} res - API response.
   * @returns {any} - Extracted response data.
   */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }
}
