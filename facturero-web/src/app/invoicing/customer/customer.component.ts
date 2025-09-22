
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Optional } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CustomerDataSource } from 'src/app/core/service/customer.datasource';
import { Customer } from 'src/app/core/model/customer';
import { CustomerService } from 'src/app/core/service/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {


  dataSource: CustomerDataSource;

  displayedColumns = ["firstName", "lastName", "taxId", "email", "actions"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef;

  debounceTime: number = 500;
  isModalWindow: boolean = false;
  readonly: boolean = false;

  constructor(
    private customerService: CustomerService,
    private http: HttpClient) { }


  ngOnInit() {

    this.dataSource = new CustomerDataSource(this.http);

    this.dataSource.loadCustomers('', 'firstName', 0, 5);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadCustomersPage();
      })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadCustomersPage())
      )
      .subscribe();

  }

  loadCustomersPage() {
    let sortDirection = this.sort.direction == 'desc' ? '-' : '';
    this.dataSource.loadCustomers(
      this.search.nativeElement.value,
      sortDirection + this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


  onDelete(index: number, e: Customer) {
    this.customerService.delete(e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }

}
