import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomerDataSource } from 'src/app/core/service/customer.datasource';
import { Customer } from 'src/app/core/model/customer';

@Component({
  selector: 'search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchCustomerComponent implements OnInit, AfterViewInit {

  dataSource: CustomerDataSource;
  displayedColumns = ["firstName", "lastName", "taxId", "email", "actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef

  title: string;
  constructor(
    private dialogRef: MatDialogRef<SearchCustomerComponent>,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.title = "Buscar Cliente ";

    this.dataSource = new CustomerDataSource(this.http);

    this.dataSource.loadCustomers('', 'firstName', 0, 3);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(500), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadCustomerPage();
      })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadCustomerPage())
      )
      .subscribe();

  }

  loadCustomerPage() {
    let sortDirection = this.sort.direction == 'desc' ? '-' : '';
    this.dataSource.loadCustomers(
      this.search.nativeElement.value,
      sortDirection + this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


  close(customer: Customer) {
    this.dialogRef.close(customer);
  }
}
