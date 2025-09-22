import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../model/product';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient, private alertService: AlertService) { }

  create(product: Product): Observable<Product> {
    return this.http.post(`/api/product`, product)
      .pipe(tap((newProduct: Product) => this.log(`create Product w/ id=${newProduct._id}`)),
        catchError(this.handleError<Product>('create')));
  }

  update(product: Product): Observable<Product> {
    return this.http.put(`/api/product/${product._id}`, product)
      .pipe(tap((product: Product) => this.log(`update Product w/ id=${product._id}`)),
        catchError(this.handleError<Product>('update')));
  }

  delete(_id: string): Observable<any> {
    return this.http.delete<Product>(`/api/product/${_id}`)
      .pipe(catchError(this.handleError<any>('delete')));
  }

  get(filter: string, sort: string, page: number, perPage: number): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/product?q=${filter}&sort=${sort}&page=${page}&per_page=${perPage}`)
      .pipe(catchError(this.handleError<Product[]>('get')));
  }

  getById(_id: string): Observable<Product> {
    return this.http.get<Product>(`/api/product/${_id}`)
      .pipe(catchError(this.handleError<Product>('getById')));
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