import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef } from '@angular/material/dialog';
import { Branch, Establishment } from 'src/app/core/model';
import { BranchDataSource } from '../branch/branch.datasource';
import { EstablishmentDataSource } from '../establishment/establishment.datasource';

@Component({
  selector: 'app-search-branch',
  templateUrl: './search-branch.component.html',
  styleUrls: ['./search-branch.component.css']
})
export class SearchBranchComponent implements OnInit {
  establishmentDataSource: EstablishmentDataSource;
  branchDataSource: BranchDataSource;
  displayedColumns = ["name", "code", "actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  step: number = 1;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<SearchBranchComponent>) { }

  ngOnInit() {
    this.establishmentDataSource = new EstablishmentDataSource(this.http);
    this.branchDataSource = new BranchDataSource(this.http);
    this.establishmentDataSource.load('', 'name', 0, 5);
  }
  ngAfterViewInit() {


  }

  loadEstablishmentData() {
    this.establishmentDataSource.load(
      '',
      'name',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  closeDialogRef(branchSelected: Branch) {
    this.dialogRef.close(branchSelected);
  }

  selectEstablishment(establishment: Establishment): void {

    this.step = 2;
    this.branchDataSource.load(establishment._id, '', 'name', 0, 5);
  }

}
