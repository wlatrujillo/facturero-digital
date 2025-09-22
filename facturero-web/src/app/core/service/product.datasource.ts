import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Product } from "../model/product";

export class ProductDataSource implements DataSource<Product>{

    private productsSubject = new BehaviorSubject<Product[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private totalRowSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    public totalRows$ = this.totalRowSubject.asObservable();


    constructor(private http: HttpClient) {

    }

    loadProducts(
        catetory: string,
        text: string,
        sort: string,
        page: number,
        perPage: number) {

        this.loadingSubject.next(true);

        let url = '/api/product'
        if (catetory) url = '/api/product-category/' + catetory + '/product'

        this.http.get(`${url}?q=${text}&sort=${sort}&page=${page}&per_page=${perPage}`, { observe: 'response' })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response: any) => {

                this.totalRowSubject.next(response.headers.get('x-total-count'))

                this.productsSubject.next(response.body);


            });

    }


    removeData(index: number) {
        const data = this.productsSubject.value;
        data.splice(index, 1);
        this.productsSubject.next(data);
    }




    connect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): import("rxjs").Observable<any[] | readonly any[]> {
        console.log("Connecting data source");
        return this.productsSubject.asObservable();
    }



    disconnect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): void {
        this.productsSubject.complete();
        this.totalRowSubject.complete();
        this.loadingSubject.complete();
    }






}