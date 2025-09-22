import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { City } from '../core/model/city';
import { Country } from '../core/model/country';
import { State } from '../core/model/state';
import { User } from '../core/model/user';
import { AdminService } from '../core/service/admin.service';
import { AlertService } from '../core/service/alert.service';
import { UserService } from '../core/service/user.service';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    user: User = new User();
    loading = false;
    userForm: FormGroup;
    countries$: Observable<Country[]>;
    states: State[];
    cities: City[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private userService: UserService,
        private adminService: AdminService
    ) { }

    ngOnInit() {

        this.countries$ = this.adminService.getCountries();

        let user: User = this.route.snapshot.data['user'] || new User();

        this.userForm = this.formBuilder.group({
            _id: [user._id],
            firstName: [user.firstName, Validators.required],
            lastName: [user.lastName, Validators.required],
            email: [user.email, [Validators.required, Validators.email]],
            phone: [user.phone],
            address: [user.address],
            country: [user.country],
            state: [user.state],
            city: [user.city],
            postal: [user.postal],
            about: [user.about],
        });

        this.getStates(this.country);
        this.getCities(this.country, this.state);


    }

    onFormSubmit() {
        if (this.userForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.update(this.userForm.value).subscribe(this.onSuccess, this.onError);
    }

    /* Get errors */
    handleError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    getStates = (country: string) => {
        if (!country) return;
        return this.adminService.getStates(country).subscribe(states => this.states = states);
    }

    getCities = (country: string, state: string) => {
        console.log("Country %s State %s", country, state);
        if (!state) return;
        return this.adminService.getCities(country, state).subscribe(cities => this.cities = cities);
    }

    get country() { return this.userForm.get('country').value; }
    get state() { return this.userForm.get('state').value; }

    private onSuccess = () => {
        this.loading = false;
        this.alertService.success("Guardado exitosamente", 1000);
    }

    private onError = (error) => {
        this.loading = false;
    }

}
