import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Invoice } from "../model/invoice";

export class InvoiceDataSource implements DataSource<Invoice> {

    private InvoicesSubject = new BehaviorSubject<Invoice[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private totalRowSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    public totalRows$ = this.totalRowSubject.asObservable();


    constructor(private http: HttpClient) {

    }

    loadData(
        filter: any,
        sort: string,
        page: number,
        perPage: number) {

        this.loadingSubject.next(true);


        this.http.put(`/api/invoice/query?sort=${sort}&page=${page}&per_page=${perPage}`, filter, { observe: 'response' })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response: any) => {
                console.log(response);

                this.totalRowSubject.next(response.headers.get('x-total-count'))

                this.InvoicesSubject.next(response.body);


            });

        /*this.InvoiceService.get(filter, sort, page, perPage).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(Invoices => this.InvoicesSubject.next(Invoices));*/

    }


    removeData(index: number) {
        const data = this.InvoicesSubject.value;
        data.splice(index, 1);
        this.InvoicesSubject.next(data);
    }




    connect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): import("rxjs").Observable<any[] | readonly any[]> {
        console.log("Connecting data source");
        return this.InvoicesSubject.asObservable();
    }



    disconnect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): void {
        this.InvoicesSubject.complete();
        this.totalRowSubject.complete();
        this.loadingSubject.complete();
    }






}