import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Customer } from "../model/customer";

export class CustomerDataSource implements DataSource<Customer>{

    private customersSubject = new BehaviorSubject<Customer[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private totalRowSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    public totalRows$ = this.totalRowSubject.asObservable();

    constructor(private http: HttpClient) {

    }

    loadCustomers(
        filter: string,
        sort: string,
        page: number,
        perPage: number) {

        this.loadingSubject.next(true);


        this.http.get(`/api/customer?q=${filter}&sort=${sort}&page=${page}&per_page=${perPage}`, { observe: 'response' })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response: any) => {

                this.totalRowSubject.next(response.headers.get('x-total-count'))

                this.customersSubject.next(response.body);
            });



    }




    connect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): import("rxjs").Observable<any[] | readonly any[]> {
        console.log("Connecting data source");
        return this.customersSubject.asObservable();
    }



    disconnect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): void {
        this.customersSubject.complete();
        this.totalRowSubject.complete();
        this.loadingSubject.complete();
    }


    removeData(index: number) {
        const data = this.customersSubject.value;
        data.splice(index, 1);
        this.customersSubject.next(data);
    }





}