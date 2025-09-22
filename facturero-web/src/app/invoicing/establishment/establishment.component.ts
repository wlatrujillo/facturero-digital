
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EstablishmentDataSource } from './establishment.datasource';
import { Establishment } from 'src/app/core/model/establishment';
import { EstablishmentService } from 'src/app/core/service/establishment.service';


declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})

export class EstablishmentComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable;

  dataSource: EstablishmentDataSource;

  displayedColumns = ["name", "code", "phone", "address", "actions"];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef;

  debounceTime: number = 500;

  readonly: boolean = false;

  constructor(private http: HttpClient, private establishmentService: EstablishmentService) {

  }

  ngOnInit() {

    this.dataSource = new EstablishmentDataSource(this.http);

    this.dataSource.load('', 'name', 0, 5);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);



    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadData();
      })
      ).subscribe();


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadData())
      )
      .subscribe();

  }

  loadData() {
    let sortDirection = this.sort.direction == 'desc' ? '-' : '';
    this.dataSource.load(
      this.search.nativeElement.value,
      sortDirection + this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onDelete(index: number, e: Establishment) {
    this.establishmentService.delete(e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }
}
