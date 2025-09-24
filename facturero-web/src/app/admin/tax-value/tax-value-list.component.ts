import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaxValueDataSource } from 'src/app/core/service/tax.value.datasource';
import { tap } from 'rxjs/operators';
import { TaxValue } from 'src/app/core/model/tax-value';

@Component({
    selector: 'app-tax-value-list',
    templateUrl: './tax-value-list.component.html',
    styleUrls: ['./tax-value-list.component.css']
})

export class TaxValueListComponent implements OnInit, AfterViewInit {


    dataSource: TaxValueDataSource;

    displayedColumns = ["tax", "percentage", "description", "actions"];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    isModalWindow: boolean = false;
    readonly: boolean = false;


    constructor(
        private http: HttpClient,
        @Optional() private dialogRef: MatDialogRef<TaxValueListComponent>) {

    }

    ngOnInit() {
        if (this.dialogRef) this.isModalWindow = true;
        if (this.dialogRef) this.readonly = true;

        this.dataSource = new TaxValueDataSource(this.http);

        this.dataSource.loadTaxValue('', '', 0, 5);

    }

    ngAfterViewInit() {


        merge(this.paginator.page)
            .pipe(
                tap(() => this.loadTaxValuePage())
            )
            .subscribe();

    }

    loadTaxValuePage() {
        this.dataSource.loadTaxValue(
            '',
            '',
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }


    onCloseModalWindow(element: TaxValue) {
        if (this.dialogRef)
            this.dialogRef.close(element);
    }

}
