
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Role } from 'src/app/core/model/role';
import { UserService } from 'src/app/core/service/user.service';
import { AdminService } from 'src/app/core/service/admin.service';
import { Branch } from 'src/app/core/model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchBranchComponent } from '../search-branch/search-branch.component';
@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html'

})

export class UserUpdateComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    minPrice = 0;
    @ViewChild('chipList', { static: true }) chipList;
    @ViewChild('resetUserForm', { static: true }) myNgForm;
    userForm: FormGroup;
    branch: Branch;
    roles: Role[];



    constructor(
        private location: Location,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private userService: UserService,
        private adminSerice: AdminService
    ) {

    }

    ngOnInit() {

        let user = this.route.snapshot.data["user"] || {};
        this.branch = user.branch;
        this.userForm = this.fb.group({
            branch: [user.branch || '', [Validators.required]],
            role: [user.role || '', [Validators.required]],
            firstName: [user.firstName || '', [Validators.required]],
            lastName: [user.lastName || '', [Validators.required]],
            email: [user.email || '', [Validators.required, Validators.email]],
            phone: [user.phone || ''],
            address: [user.address || ''],
            password: ['', user._id ? [] : [Validators.required]]
        })

        this.adminSerice.getRoles().subscribe(roles => this.roles = roles);


    }


    onSubmit() {

        if (this.userForm.invalid) {
            return;
        }

        let user = this.route.snapshot.data["user"];


        if (user) {
            this.userForm.value._id = user._id;
            this.userService.update(this.userForm.value)
                .subscribe(
                    user => {
                        console.log("from location calling back");
                        this.location.back()
                    });
        } else {
            this.userService.create(this.userForm.value)
                .subscribe(user => { this.location.back() });
        }

    }
    searchBranch() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {};

        const dialogRef = this.dialog.open(SearchBranchComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            branch => {
                if (branch) {
                    this.branch = branch;
                    this.userForm.patchValue({ branch: branch._id })
                }
            }
        );
    }

    removeBranch(): void {
        this.branch = null;
        this.userForm.patchValue({ branch: null });
    }

    handleError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }




}
