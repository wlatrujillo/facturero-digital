import { DataSource } from "@angular/cdk/table";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Branch } from "src/app/core/model/branch";
import { BranchService } from "src/app/core/service/branch.service";

export class BranchDataSource implements DataSource<Branch>{

    private branchSubject = new BehaviorSubject<Branch[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);


    private totalRowSubject = new BehaviorSubject<number>(0);
    public totalRows$ = this.totalRowSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();

    constructor(private http: HttpClient) {

    }

    load(
        establishmentId: string,
        filter: string,
        sort: string,
        page: number,
        perPage: number) {

        this.loadingSubject.next(true);


        this.http.get(`/api/establishment/${establishmentId}/branch?q=${filter}&sort=${sort}&page=${page}&per_page=${perPage}`, { observe: 'response' })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response: any) => {

                this.totalRowSubject.next(response.headers.get('x-total-count'))

                this.branchSubject.next(response.body);


            });

    }

    connect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): import("rxjs").Observable<any[] | readonly any[]> {
        console.log("Connecting data source");
        return this.branchSubject.asObservable();
    }

    disconnect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): void {
        this.branchSubject.complete();
        this.loadingSubject.complete();
    }

    removeData(index: number) {
        const data = this.branchSubject.value;
        data.splice(index, 1);
        this.branchSubject.next(data);
    }


}
