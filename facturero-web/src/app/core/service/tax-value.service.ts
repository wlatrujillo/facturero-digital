import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TaxValue } from '../model/tax-value';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class TaxValueService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  serviceUrl: string = '/api/tax-value';

  create(taxValue: TaxValue): Observable<TaxValue> {
    return this.http.post(`${this.serviceUrl}`, taxValue)
      .pipe(tap((newTaxValue: TaxValue) => this.log(`create ProductCategory w/ id=${newTaxValue._id}`)),
        catchError(this.handleError<TaxValue>('create')));
  }

  update(taxValue: TaxValue): Observable<TaxValue> {
    return this.http.put(`${this.serviceUrl}/${taxValue._id}`, taxValue)
      .pipe(tap((taxValue: TaxValue) => this.log(`update TaxValue w/ id=${taxValue._id}`)),
        catchError(this.handleError<TaxValue>('update')));
  }

  delete(_id: string): Observable<any> {
    return this.http.delete<TaxValue>(`${this.serviceUrl}/${_id}`)
      .pipe(catchError(this.handleError<any>('delete')));
  }

  get(filter: string, sort: string, page: number, perPage: number): Observable<TaxValue[]> {
    return this.http.get<TaxValue[]>(`${this.serviceUrl}?q=${filter}&sort=${sort}&page=${page}&per_page=${perPage}`)
      .pipe(catchError(this.handleError<TaxValue[]>('get')));
  }

  getById(_id: string): Observable<TaxValue> {
    return this.http.get<TaxValue>(`${this.serviceUrl}/${_id}`)
      .pipe(catchError(this.handleError<TaxValue>('getById')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for Product consumption
      this.alertService.error(error.error || error.message);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return throwError(() => error.error || "Server Error");
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
