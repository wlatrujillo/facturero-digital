import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InvoiceDataSource } from 'src/app/core/service/invoice.datasource';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchCustomerComponent } from '../searchcustomer/search-customer.component';
import { Customer } from 'src/app/core/model/customer';
import { Branch } from 'src/app/core/model';
import { SearchBranchComponent } from '../search-branch/search-branch.component';
import { User } from 'src/app/core/model/user';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { BranchService } from 'src/app/core/service/branch.service';


@Component({
  selector: 'query-invoicing',
  templateUrl: './queryinvoicing.component.html',
  styleUrls: ['./queryinvoicing.component.css']
})
export class QueryInvoicingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  dataSource: InvoiceDataSource;
  displayedColumns = ["createdAt", "secuence", "totalWithoutTax", "total", "actions"];
  formGroup: FormGroup;
  customer: Customer;
  branch: Branch;
  startDate: null;
  endDate: null;
  user: User;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private branchService: BranchService
  ) { }

  ngOnInit() {

    this.user = this.authenticationService.currentUserValue;

    this.dataSource = new InvoiceDataSource(this.http);

    this.loadInvoicePage();

    this.formGroup = this.formBuilder.group({
      startDate: [],
      endData: [],
      customer: [],
      product: [],
      establishment: []
    });

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadInvoicePage())
      )
      .subscribe();

  }

  loadInvoicePage() {

    let sort = '-createdAt';

    if (this.sort)
      sort = (this.sort.direction == 'desc' ? '-' : '') + this.sort.active;

    let page = this.paginator ? this.paginator.pageIndex : 0;
    let pageSize = this.paginator ? this.paginator.pageSize : 5;

    let searchFilter = {};

    if (this.startDate && this.endDate) {
      searchFilter['createdAt'] = { '$gte': this.startDate, '$lte': this.endDate }
    } else if (this.startDate) {
      searchFilter['createdAt'] = { '$gte': this.startDate }
    } else if (this.endDate) {
      searchFilter['createdAt'] = { '$lte': this.endDate }
    }

    if (this.customer)
      searchFilter['customer'] = this.customer._id;

    if (this.branch)
      searchFilter['branch'] = this.branch._id;

    this.dataSource.loadData(
      searchFilter,
      sort,
      page,
      pageSize);
  }

  onPrintClick(invoiceId: string) {

    let host = `${environment.apiBaseUrl}/api/report/${invoiceId}`;
    console.log(host);
    window.open(host, "_blank");

  }

  searchCustomer() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(SearchCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      customer => {
        if (customer) {
          this.customer = customer;
        }
      }
    );
  }

  searchBranch() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(SearchBranchComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      branch => {
        if (branch) {
          this.branch = branch;
        }
      }
    );
  }

  removeBranch(): void {
    this.branch = null;
  }

  removeCustomer(): void {
    this.customer = null;
  }

  /* Get errors */
  handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

}
