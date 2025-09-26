import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from 'src/app/core/service/admin.service';
import { CatalogDataSource } from 'src/app/core/service/catalog.datasource';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  displayedColumns = ["name", "active", "description", "actions"];
  dataSource: CatalogDataSource;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef;

  debounceTime: number = 500;
  isModalWindow: boolean = false;
  readonly: boolean = false;
  constructor(
    private http: HttpClient,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.dataSource = new CatalogDataSource(this.http);

    this.dataSource.load('', 'name', 0, 5);
  }
}
