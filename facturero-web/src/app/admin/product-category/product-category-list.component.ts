import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/model/product';
import { ProductCategoryDataSource } from 'src/app/core/service/product-category.datasource';
import { ProductCategoryService } from 'src/app/core/service/product-category.service';

@Component({
    selector: 'app-product-category-list',
    templateUrl: './product-category-list.component.html',
    styleUrls: ['./product-category-list.component.css']
})

export class ProductCategoryListComponent implements OnInit, AfterViewInit {


    dataSource: ProductCategoryDataSource;

    displayedColumns = ["name", "description", "actions"];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    @ViewChild('search', { static: false }) search: ElementRef;

    debounceTime: number = 500;


    constructor(private http: HttpClient, private productService: ProductCategoryService) {

    }

    ngOnInit() {

        this.dataSource = new ProductCategoryDataSource(this.http);

        this.dataSource.loadProductCategory('', 'name', 0, 5);

    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.search.nativeElement, 'keyup')
            .pipe(debounceTime(this.debounceTime), distinctUntilChanged(), tap(() => {
                this.paginator.pageIndex = 0;
                this.loadProductCategoryPage();
            })
            ).subscribe();


        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadProductCategoryPage())
            )
            .subscribe();

    }

    loadProductCategoryPage() {
        let sortDirection = this.sort.direction == 'desc' ? '-' : '';
        this.dataSource.loadProductCategory(
            this.search.nativeElement.value,
            sortDirection + this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }


    onDelete(index: number, e: Product) {
        this.productService.delete(e._id)
            .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

    }
}
