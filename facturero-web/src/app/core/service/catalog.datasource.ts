import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Product } from "../model/product";
import { Catalog } from "../model/catalog";

export class CatalogDataSource implements DataSource<Product>{

    private catalogSubject = new BehaviorSubject<Catalog[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private totalRowSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    public totalRows$ = this.totalRowSubject.asObservable();


    constructor(private http: HttpClient) {

    }

    load(
        text: string,
        sort: string,
        page: number,
        perPage: number) {

        this.loadingSubject.next(true);

        let url = '/api/admin/catalog'

        this.http.get(`${url}?q=${text}&sort=${sort}&page=${page}&per_page=${perPage}`, { observe: 'response' })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response: any) => {

                this.totalRowSubject.next(response.headers.get('x-total-count'))

                this.catalogSubject.next(response.body);


            });

    }


    removeData(index: number) {
        const data = this.catalogSubject.value;
        data.splice(index, 1);
        this.catalogSubject.next(data);
    }




    connect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): import("rxjs").Observable<any[] | readonly any[]> {
        console.log("Connecting data source");
        return this.catalogSubject.asObservable();
    }



    disconnect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): void {
        this.catalogSubject.complete();
        this.totalRowSubject.complete();
        this.loadingSubject.complete();
    }






}