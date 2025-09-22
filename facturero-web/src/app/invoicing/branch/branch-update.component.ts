
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { BranchService } from 'src/app/core/service/branch.service';


@Component({
    selector: 'app-branch-update',
    templateUrl: './branch-update.component.html'

})

export class BranchUpdateComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    minPrice = 0;
    @ViewChild('chipList', { static: true }) chipList;
    @ViewChild('resetBranchForm', { static: true }) myNgForm;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    branchForm: FormGroup;
    SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];




    constructor(
        private location: Location,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private actRoute: ActivatedRoute,
        private branchService: BranchService
    ) { }

    ngOnInit() {

        let branch = this.route.snapshot.data["branch"] || {};

        this.branchForm = this.fb.group({
            name: [branch.name || '', [Validators.required]],
            code: [branch.code || '', [Validators.required, Validators.pattern('^[0-9]+$')]],
            next: [branch.next || 0, [Validators.required, Validators.min(0)]]
        })

    }

    onSubmit() {

        if (this.branchForm.invalid) {
            return;
        }
        let branch = this.route.snapshot.data["branch"]
        let establishmentId = this.actRoute.snapshot.paramMap.get('establishmentId');

        if (branch) {
            this.branchForm.value._id = branch._id;
            this.branchService.update(establishmentId, this.branchForm.value)
                .subscribe(
                    branch => { this.location.back() });
        } else {
            this.branchService.create(establishmentId, this.branchForm.value)
                .subscribe(branch => { this.location.back() });
        }

    }


    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.branchForm.controls[controlName].hasError(errorName);
    }




}
