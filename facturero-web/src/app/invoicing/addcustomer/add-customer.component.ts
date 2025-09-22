
import { Component, OnInit, AfterViewInit, ViewChild, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Catalog } from 'src/app/core/model/catalog';
import { CustomerService } from 'src/app/core/service/customer.service';
import { AdminService } from 'src/app/core/service/admin.service';


@Component({
    selector: 'add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
    customerForm: any;
    customerTypes: Catalog;
    identificationTypes: Catalog;


    constructor(
        @Optional() private dialogRef: MatDialogRef<AddCustomerComponent>,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private catalogService: AdminService
    ) {

    }

    ngOnInit() {

        let customer = this.route.snapshot.data["customer"] || {};

        this.customerForm = this.fb.group({
            firstName: [customer.firstName || '', [Validators.required]],
            lastName: [customer.lastName || '', [Validators.required]],
            email: [customer.email || '', [Validators.required, Validators.email]],
            taxIdType: [customer.taxIdType || 'C', [Validators.required]],
            taxId: [customer.taxId || '', [Validators.required, Validators.minLength(10)]],
            type: [customer.type || 'C', [Validators.required]],
            phone: [customer.phone || ''],
            address: [customer.address || '']
        });


        this.catalogService.getCatalogByName("customer_type").subscribe(response => this.customerTypes = response);

        this.catalogService.getCatalogByName("identification_type").subscribe(response => this.identificationTypes = response);


    }


    onSubmit() {

        if (this.customerForm.invalid) {
            return;
        }

        let customer = this.route.snapshot.data["customer"];

        if (customer) {
            this.customerForm.value._id = customer._id;
            this.customerService.update(this.customerForm.value)
                .subscribe(
                    customer => { this.dialogRef.close(customer); });
        } else {
            this.customerService.create(this.customerForm.value)
                .subscribe(customer => { this.dialogRef.close(customer); });
        }

    }



    close() {
        this.dialogRef.close(undefined);
    }




    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.customerForm.controls[controlName].hasError(errorName);
    }
}
