import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Invoice } from '../model/invoice';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpClient) { }

  create(branchId: string, invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`/api/invoice/branch/${branchId}`, invoice)
      .pipe(catchError(this.errorHandler));
  }

  update(invoice: Invoice) {
    this.http.put(`/api/invoice`, invoice)
      .pipe(tap((newInvoice: Invoice) => this.log(`update Invoice w/ id=${newInvoice._id}`)),
        catchError(this.handleError<Invoice>('update')));
  }

  delete(_id: string): Observable<Invoice> {
    return this.http.delete<Invoice>(`/api/invoice/${_id}`)
    .pipe(catchError(this.errorHandler));
  }

  get(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`/api/invoice`)
    .pipe(catchError(this.errorHandler));
  }

  getById(_id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`/api/invoice/${_id}`)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.error || "Server Error");
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for Invoice consumption
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