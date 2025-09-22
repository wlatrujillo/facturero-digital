import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private alertService: AlertService) { }


  create(customer: User): Observable<User> {
    return this.http.post(`/api/user`, customer)
      .pipe(tap((newProduct: User) => this.log(`create Product w/ id=${newProduct._id}`)),
        catchError(this.handleError<User>('create')));
  }

  delete(_id: string): Observable<any> {
    return this.http.delete<any>(`/api/user/${_id}`)
      .pipe(catchError(this.handleError<any>('delete')));
  }

  update(user: User): Observable<User> {
    return this.http.put(`/api/user/${user._id}`, user)
      .pipe(tap((newUser: User) => this.log(`update user w/ id=${newUser._id}`)),
        catchError(this.handleError<User>('update')));
  }
  updatePassword(password): Observable<void> {
    return this.http.put<void>('/api/user/password', { password })
      .pipe(catchError(this.handleError<void>('updatePassword')));
  }

  getById(_id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${_id}`)
      .pipe(catchError(this.handleError<any>('getById')));
  }

  getProfileInfo(): Observable<User> {
    return this.http.get<User>(`/api/user/profile-info`)
      .pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.error || "Server Error");
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      this.alertService.error(error.error || error.message);


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}