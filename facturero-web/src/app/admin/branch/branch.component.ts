
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BranchDataSource } from './branch.datasource';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/core/model/branch';
import { BranchService } from 'src/app/core/service/branch.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})

export class BranchComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable;

  dataSource: BranchDataSource;

  displayedColumns = ["name", "code", "next", "actions"];

  establishmentId: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef;

  debounceTime: number = 500;

  readonly: boolean = false;

  constructor(private http: HttpClient, private actRoute: ActivatedRoute, private branchService: BranchService) {
    this.establishmentId = this.actRoute.snapshot.paramMap.get('establishmentId');
  }

  ngOnInit() {

    this.dataSource = new BranchDataSource(this.http);

    this.dataSource.load(this.establishmentId, '', 'name', 0, 5);

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
      this.establishmentId,
      this.search.nativeElement.value,
      sortDirection + this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onDelete(index: number, e: Branch) {
    this.branchService.delete(this.establishmentId, e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }
}
