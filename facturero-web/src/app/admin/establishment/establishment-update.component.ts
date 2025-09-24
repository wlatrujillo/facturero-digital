
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { EstablishmentService } from 'src/app/core/service/establishment.service';
import { Establishment } from 'src/app/core/model';


@Component({
    selector: 'app-establishment-update',
    templateUrl: './establishment-update.component.html'

})

export class EstablishmentUpdateComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    minPrice = 0;
    @ViewChild('chipList', { static: true }) chipList;
    @ViewChild('resetEstablishmentForm', { static: true }) myNgForm;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    establishmentForm: FormGroup;
    SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

    constructor(
        private location: Location,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private establishmentService: EstablishmentService
    ) { }

    ngOnInit() {

        let establishment: Establishment = this.route.snapshot.data["establishment"] || {};

        this.establishmentForm = this.fb.group({
            name: [establishment.name || '', [Validators.required]],
            code: [establishment.code || '', [Validators.required, Validators.pattern('^[0-9]+$')]],
            phone: [establishment.phone || ''],
            address: [establishment.address || '']
        })

    }


    onSubmit() {

        if (this.establishmentForm.invalid) {
            return;
        }

        let establishment = this.route.snapshot.data["establishment"]

        if (establishment) {
            this.establishmentForm.value._id = establishment._id;
            this.establishmentService.update(this.establishmentForm.value)
                .subscribe(
                    establishment => { this.location.back() });
        } else {
            this.establishmentService.create(this.establishmentForm.value)
                .subscribe(establishment => { this.location.back() });
        }

    }


    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.establishmentForm.controls[controlName].hasError(errorName);
    }




}
