import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/service/alert.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.css']
})
export class LoginCompanyComponent implements OnInit, OnDestroy {


  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    body.classList.add('off-canvas-sidebar');
    const card = document.getElementsByClassName('card')[0];
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove('card-hidden');
    }, 300);

    const ruc = this.activatedRoute.snapshot.queryParamMap.get('ruc') || '';
    this.loginForm = this.formBuilder.group({
      ruc: [ruc, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  onLoginSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.loginCompany(
      this.fval.ruc.value,
      this.fval.email.value,
      this.fval.password.value)
      .subscribe(user => {
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
  get fval() { return this.loginForm.controls; }

}
