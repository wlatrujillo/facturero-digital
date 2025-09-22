import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Indicator } from '../model/indicator';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  dailyIndicator(year: number, month: number, day: number): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(`/api/invoice/indicator/daily?year=${year}&month=${month}&day=${day}`)
    .pipe(catchError(this.errorHandler));
  }
  monthlyIndicator(year: number): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(`/api/invoice/indicator/monthly?year=${year}`)
    .pipe(catchError(this.errorHandler));
  }
  topProductIndicator(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(`/api/invoice/indicator/topProduct`)
    .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || "Server Error");
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
