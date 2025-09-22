import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { TaxValue } from "../model/tax-value";

export class TaxValueDataSource implements DataSource<TaxValue>{

    private taxValueSubject = new BehaviorSubject<TaxValue[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private totalRowSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    public totalRows$ = this.totalRowSubject.asObservable();


    constructor(private http: HttpClient) {

    }

    loadTaxValue(
        filter: string,
        sort: string,
        page: number,
        perPage: number) {

        this.loadingSubject.next(true);

        this.http.get(`/api/tax-value?q=${filter}&sort=${sort}&page=${page}&per_page=${perPage}`, { observe: 'response' })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response: any) => {

                this.totalRowSubject.next(response.headers.get('x-total-count'))

                this.taxValueSubject.next(response.body);


            });

    }

    removeData(index: number) {
        const data = this.taxValueSubject.value;
        data.splice(index, 1);
        this.taxValueSubject.next(data);
    }

    connect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): import("rxjs").Observable<any[] | readonly any[]> {
        console.log("Connecting data source");
        return this.taxValueSubject.asObservable();
    }

    disconnect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): void {
        this.taxValueSubject.complete();
        this.totalRowSubject.complete();
        this.loadingSubject.complete();
    }

}