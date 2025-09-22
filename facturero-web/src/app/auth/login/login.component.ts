import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/service/alert.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    loginForm: FormGroup;
    loading = false;
    step: number;
    submitted = false;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    constructor(
        private element: ElementRef,
        private router: Router,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private alertService: AlertService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.step = 1;
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 300);

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
        console.log("Entro al ngOnInit del login");
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
        console.log("Entro al ngDestroy del login");
    }

    // for accessing to form fields
    get fval() { return this.loginForm.controls; }

    onLoginSubmit() {

        if (this.loginForm.invalid) {
            return;
        }


        this.login();


    }

    login() {

        this.submitted = true;

        this.loading = true;
        this.authenticationService.login(this.fval.email.value, this.fval.password.value)
            .subscribe(
                user => {
                    this.loading = false;
                    let nextRoute = '/dashboard';
                    if (user.hasToUpdatePassword) nextRoute = '/auth/update-password';
                    this.router.navigate([nextRoute]);
                },
                error => {
                    //this.toastr.error(error.error.message, 'Error');
                    this.loading = false;
                    this.alertService.error(error);
                });

    }

}
