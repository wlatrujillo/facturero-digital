
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Catalog } from 'src/app/core/model/catalog';
import { ProductService } from 'src/app/core/service/product.service';
import { AdminService } from 'src/app/core/service/admin.service';
import { ProductCategory } from 'src/app/core/model/product-category';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCategoryService } from 'src/app/core/service/product-category.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { switchMap } from 'rxjs/operators';
import { TaxValue } from 'src/app/core/model/tax-value';
import { Product } from 'src/app/core/model/product';
import { TaxValueListComponent } from '../tax-value/tax-value-list.component';


@Component({
    selector: 'app-product-update',
    templateUrl: './product-update.component.html',
    styleUrls: ['./product-update.component.css']

})

export class ProductUpdateComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    minPrice = 0;
    @ViewChild('chipList', { static: true }) chipList;
    @ViewChild('resetProductForm', { static: true }) myNgForm;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    productForm: FormGroup;
    SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];
    loading = false;
    productCategory$: Observable<ProductCategory[]>;
    refreshProductCategory$: BehaviorSubject<ProductCategory> = new BehaviorSubject<ProductCategory>(new ProductCategory());

    productTypes$: Observable<Catalog>;

    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    dataSource: TaxValue[] = [];

    displayedColumns = ["tax", "percentage", "actions"];


    constructor(
        private location: Location,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private productService: ProductService,
        private productCategoryService: ProductCategoryService,
        private catalogService: AdminService
    ) { }

    ngOnInit() {

        this.productCategory$ = this.refreshProductCategory$.pipe(switchMap(_ => this.productCategoryService.get('', '', 0, 50)));
        this.productTypes$ = this.catalogService.getCatalogByName('product_type');

        let product: Product = this.route.snapshot.data["product"] || {};

        this.dataSource = product.taxes;

        this.productForm = this.fb.group({
            category: [product.category, [Validators.required]],
            name: [product.name, [Validators.required]],
            code: [product.code, [Validators.required]],
            auxCode: [product.auxCode],
            description: [product.description],
            price: [product.price || 0, [Validators.required, Validators.min(this.minPrice)]],
            type: [product.type || 'B', [Validators.required]]
        })


    }


    onSubmit() {

        if (this.productForm.invalid) {
            return;
        }

        let product = this.route.snapshot.data["product"];


        let productValue = this.productForm.value;
        productValue.taxes = this.dataSource;


        if (product) {
            this.productForm.value._id = product._id;
            this.loading = true;
            this.productService.update(productValue)
                .subscribe(
                    product => {
                        this.loading = false;
                        this.location.back()
                    });
        } else {
            this.loading = true;
            this.productService.create(productValue)
                .subscribe(product => {
                    this.loading = false;
                    this.location.back()
                });
        }

    }


    handleError = (controlName: string, errorName: string) => {
        return this.productForm.controls[controlName].hasError(errorName);
    }
    addCategory() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {};

        const dialogRef = this.dialog.open(ProductCategoryComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            value => {
                if (value)
                    this.refreshProductCategory$.next(value);
            }
        );

    }

    addTaxValue() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {};

        const dialogRef = this.dialog.open(TaxValueListComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            value => {
                console.log("close modal", value);
                if (value && !this.dataSource.find(e => e._id == value._id)) {
                    this.dataSource.push(value);
                    this.table.renderRows();
                }
            }
        );

    }
    onDeleteTaxValue(index: number, row_obj: TaxValue) {
        this.dataSource = this.dataSource.filter((value, key) => {
            return value._id != row_obj._id;
        });

    }


}
