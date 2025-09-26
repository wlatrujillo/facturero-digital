
import { Component, OnInit, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Catalog } from 'src/app/core/model/catalog';
import { AdminService } from 'src/app/core/service/admin.service';
import { MatDialogRef } from '@angular/material/dialog';


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
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    catalogForm: FormGroup;
    identificationTypes: Catalog;
    customerTypes: Catalog;
    isModalWindow: boolean = false;

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



    /* Get errors */
    handleError = (controlName: string, errorName: string) => {
        return this.catalogForm.controls[controlName].hasError(errorName);
    }


}
