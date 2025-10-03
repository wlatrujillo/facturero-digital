
import { Component, OnInit, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Catalog } from 'src/app/core/model/catalog';
import { AdminService } from 'src/app/core/service/admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogDataSource } from 'src/app/core/service/catalog.datasource';


@Component({
    selector: 'app-catalog-item',
    templateUrl: './catalog-item.component.html',
    styleUrls: ['./catalog-item.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CatalogItemComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    minPrice = 0;
    maxlength = 10;
    @ViewChild('chipList', { static: true }) chipList;
    @ViewChild('resetCatalogForm', { static: true }) myNgForm;
    readonly: boolean = false;
    VOForm: FormGroup;
    isEditableNew: boolean = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    catalogForm: FormGroup;
    identificationTypes: Catalog;
    customerTypes: Catalog;
    isModalWindow: boolean = false;
    displayedColumns = ["name", "active", "description", "actions"];
    dataSource: CatalogDataSource;
    dataSourceForm: MatTableDataSource<any>;

    constructor(
        private location: Location,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private catalogService: AdminService
    ) {

    }

    ngOnInit() {



    }


    onSubmit() {



    }

    onCloseModalWindow() {
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

    /* Get errors */
    handleError = (controlName: string, errorName: string) => {
        return this.catalogForm.controls[controlName].hasError(errorName);
    }


}
