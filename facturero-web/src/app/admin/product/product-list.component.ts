
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/model/product';
import { ProductDataSource } from 'src/app/core/service/product.datasource';
import { ProductService } from 'src/app/core/service/product.service';
import { ProductCategory } from 'src/app/core/model/product-category';
import { ProductCategoryService } from 'src/app/core/service/product-category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, AfterViewInit {


  dataSource: ProductDataSource;

  displayedColumns = ["code", "name", "description", "price", "actions"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef;

  debounceTime: number = 500;

  productCategory$: Observable<ProductCategory[]>;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService) { }

  ngOnInit() {


    this.productCategory$ = this.productCategoryService.get('', '', 0, 100);

    this.dataSource = new ProductDataSource(this.http);

    this.loadProductsPage('');

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadProductsPage('');
      })
      ).subscribe();


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadProductsPage(''))
      )
      .subscribe();

  }

  loadProductsPage(category: string) {

    let sort = 'name';
    if (this.sort)
      sort = (this.sort.direction == 'desc' ? '-' : '') + this.sort.active;

    let page = this.paginator ? this.paginator.pageIndex : 0;
    let pageSize = this.paginator ? this.paginator.pageSize : 5;

    this.dataSource.loadProducts(
      category,
      this.search ? this.search.nativeElement.value : '',
      sort,
      page,
      pageSize);
  }


  onDelete(index: number, e: Product) {
    this.productService.delete(e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }

  onCategoryChange(category: string) {
    console.log(category);
    this.loadProductsPage(category);

  }

}
