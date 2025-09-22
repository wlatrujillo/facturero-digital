import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ProductCategory } from '../model/product-category';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  serviceUrl: string = '/api/product-category';

  create(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.http.post(`${this.serviceUrl}`, productCategory)
      .pipe(tap((newProductCategory: ProductCategory) => this.log(`create ProductCategory w/ id=${newProductCategory._id}`)),
        catchError(this.handleError<ProductCategory>('create')));
  }

  update(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.http.put(`${this.serviceUrl}/${productCategory._id}`, productCategory)
      .pipe(tap((productCategory: ProductCategory) => this.log(`update ProductCategory w/ id=${productCategory._id}`)),
        catchError(this.handleError<ProductCategory>('update')));
  }

  delete(_id: string): Observable<any> {
    return this.http.delete<ProductCategory>(`${this.serviceUrl}/${_id}`)
      .pipe(catchError(this.handleError<any>('delete')));
  }

  get(filter: string, sort: string, page: number, perPage: number): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.serviceUrl}?q=${filter}&sort=${sort}&page=${page}&per_page=${perPage}`)
      .pipe(catchError(this.handleError<ProductCategory[]>('get')));
  }
  getAllProducts(category: string, filter: string, sort: string, page: number, perPage: number): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.serviceUrl}/${category}/product?q=${filter}&sort=${sort}&page=${page}&per_page=${perPage}`)
      .pipe(catchError(this.handleError<ProductCategory[]>('get')));
  }
  getById(_id: string): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`${this.serviceUrl}/${_id}`)
      .pipe(catchError(this.handleError<ProductCategory>('getById')));
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
