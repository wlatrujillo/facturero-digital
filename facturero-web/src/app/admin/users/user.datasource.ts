import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { User } from "src/app/core/model/user";

export class UserDataSource implements DataSource<User>{

    private subject = new BehaviorSubject<User[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private totalRowSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    public totalRows$ = this.totalRowSubject.asObservable();


    constructor(private http: HttpClient) {

    }

    load(
        filter: string,
        sort: string,
        page: number,
        perPage: number) {

        this.loadingSubject.next(true);

        this.http.get(`/api/user?q=${filter}&sort=${sort}&page=${page}&per_page=${perPage}`, { observe: 'response' })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response: any) => {

                this.totalRowSubject.next(response.headers.get('x-total-count'))

                this.subject.next(response.body);


            });

        /*this.productService.get(filter, sort, page, perPage).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(products => this.productsSubject.next(products));*/

    }


    removeData(index: number) {
        const data = this.subject.value;
        data.splice(index, 1);
        this.subject.next(data);
    }

    connect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): import("rxjs").Observable<any[] | readonly any[]> {
        console.log("Connecting data source");
        return this.subject.asObservable();
    }



    disconnect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): void {
        this.subject.complete();
        this.totalRowSubject.complete();
        this.loadingSubject.complete();
    }

}