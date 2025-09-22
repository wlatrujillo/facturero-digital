import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Establishment } from '../model/establishment';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class EstablishmentService {
  constructor(private http: HttpClient, private alertService: AlertService) { }

  create(establishment: Establishment): Observable<Establishment> {
    return this.http.post(`/api/establishment`, establishment)
      .pipe(tap((newEstablishment: Establishment) => this.log(`create Establishment w/ id=${newEstablishment._id}`)),
        catchError(this.handleError<Establishment>('create')));
  }

  update(establishment: Establishment): Observable<Establishment> {
    return this.http.put(`/api/establishment/${establishment._id}`, establishment)
      .pipe(tap((establishment: Establishment) => this.log(`update Establishment w/ id=${establishment._id}`)),
        catchError(this.handleError<Establishment>('update')));
  }

  delete(_id: string): Observable<any> {
    return this.http.delete<Establishment>(`/api/establishment/${_id}`)
    .pipe(catchError(this.handleError<any>('delete')));
  }

  get(filter: String, sort: string, page: number, sizePage: number): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(`/api/establishment?q=${filter}&sort=${sort}&page=${page}&per_page=${sizePage}`)
    .pipe(catchError(this.errorHandler));
  }

  getById(_id: string): Observable<Establishment> {
    return this.http.get<Establishment>(`/api/establishment/${_id}`)
    .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.error || "Server Error");
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for Establishment consumption
      this.alertService.error( error.error || error.message);
      this.log(`${operation} failed: ${error.message}`);
      

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}
