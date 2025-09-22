
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UserDataSource } from './user.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/core/model/role';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';
import { AdminService } from 'src/app/core/service/admin.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {


  dataSource: UserDataSource;

  displayedColumns = ["firstName", "lastName", "email", "role", "actions"];

  roles: Role[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef;

  debounceTime: number = 500;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private http: HttpClient) {
  }


  ngOnInit() {

    this.dataSource = new UserDataSource(this.http);

    this.dataSource.load('', 'firstName', 0, 5);

    this.adminService.getRoles().subscribe(roles => this.roles = roles);

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


  onDelete(index: number, e: User) {
    this.userService.delete(e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }

}
