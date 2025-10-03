import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { merge, tap } from 'rxjs';
import { Catalog } from 'src/app/core/model/catalog';
import { AdminService } from 'src/app/core/service/admin.service';
import { CatalogDataSource } from 'src/app/core/service/catalog.datasource';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, AfterViewInit {

  displayedColumns = ["name", "active", "description", "actions"];
  dataSource: CatalogDataSource;
  dataSourceForm: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef;

  debounceTime: number = 500;
  isModalWindow: boolean = false;
  readonly: boolean = false;
  VOForm: FormGroup;
  isEditableNew: boolean = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private adminService: AdminService) { }


  ngAfterViewInit(): void {

    merge(this.paginator.page)
      .pipe(
        tap(() => this.dataSource.load('', 'name', this.paginator.pageIndex, this.paginator.pageSize))
      )
      .subscribe();
  }

  ngOnInit(): void {

    this.dataSource = new CatalogDataSource(this.http);

    this.dataSourceForm = new MatTableDataSource();

    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

    this.dataSource.load('', 'name', 0, 3);
    this.dataSource.data$.subscribe(data => {
      this.VOForm = this.fb.group({
        VORows: this.fb.array(data.map(val => this.fb.group({
          name: new FormControl(val.name),
          description: new FormControl(val.description),
          active: new FormControl(val.active),
          isEditable: new FormControl(false),
          isNewRow: new FormControl(false),
        })
        )) //end of fb array
      }); // end of form group cretation
      this.dataSourceForm = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
    });
  }

  // this function will enabled the select field for editd
  editSVO(i, VOFormElement) {

    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    // this.isEditableNew = true;

  }
  // On click of correct button in table (after click on edit) this method will call
  SaveVO(i, VOFormElement) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(i, VOFormElement) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

}
