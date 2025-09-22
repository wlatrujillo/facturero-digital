import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from '../model/customer';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  create(customer: Customer): Observable<Customer> {
    return this.http.post(`/api/customer`, customer)
      .pipe(tap((newProduct: Customer) => this.log(`create Product w/ id=${newProduct._id}`)),
        catchError(this.handleError<Customer>('create')));
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.put(`/api/customer/${customer._id}`, customer)
      .pipe(tap((customer: Customer) => this.log(`update Product w/ id=${customer._id}`)),
        catchError(this.handleError<Customer>('update')));
  }

  delete(_id: string): Observable<any> {
    return this.http.delete<any>(`/api/customer/${_id}`)
      .pipe(catchError(this.handleError<any>('delete')));
  }

  get(filter: String, sort: string, page: number, sizePage: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`/api/customer?q=${filter}&sort=${sort}&page=${page}&per_page=${sizePage}`)
      .pipe(catchError(this.handleError<Customer[]>('get')));
  }

  getById(_id: string): Observable<Customer> {
    return this.http.get<Customer>(`/api/customer/${_id}`)
      .pipe(catchError(this.handleError<any>('getById')));
  }

  findByTaxId(taxId: string) {
    return this.http.get<Customer>(`/api/customer/taxId/${taxId}`)
      .pipe(catchError(this.handleError<any>('findByTaxId')));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for Product consumption
      this.log(`${operation} failed: ${error.message}`);

      this.alertService.error(error.error || error.message);

      // Let the app keep running by returning an empty result.
      return throwError(() => error.error || error.message);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}