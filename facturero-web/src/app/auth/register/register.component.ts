import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, PatternValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Company } from 'src/app/core/model/company';
import { User } from 'src/app/core/model/user';
import { AlertService } from 'src/app/core/service/alert.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
@Component({
  selector: 'app-register-cmp',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy, AfterContentInit {
  test: Date = new Date();

  loading = false;
  submitted = false;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
    console.log('Entro al constructor');
  }
  ngAfterContentInit(): void {
    const card = document.getElementsByClassName('card card-signup')[0];
    if (card) {
      setTimeout(() => {
        card.classList.remove('card-hidden');
      }, 400);
    }
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');
    this.registerForm = this.formBuilder.group({
      ruc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([
        Validators.required,
        // 2. check whether the entered password has a number
        RegisterComponent.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        RegisterComponent.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        RegisterComponent.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)
      ])],
      confirmPassword: [null, Validators.required]
    },
      {
        // check whether our password and confirm password match
        validator: RegisterComponent.passwordMatchValidator
      });
    console.log('ngOnInit del register')
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
    console.log("Entro al ngDestroy del register");
  }

  // for accessing to form fields
  get fval() { return this.registerForm.controls; }


  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;

    let company: Company = {
      ruc: this.registerForm.value.ruc,
      name: '',
      address: '',
      email: '',
      phone: ''
    }
    let user: User = new User()

    user.firstName = this.registerForm.value.firstName;
    user.lastName = this.registerForm.value.lastName;
    user.email = this.registerForm.value.email;
    user.password = this.registerForm.value.password;

    this.authenticationService
      .register(company, user)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe({
        next: (user) => {
          if (user && user.active) {
            this.alertService.info("Revisa tu correo electrónico para activar tu cuenta");
          }
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          //this.toastr.error(error.error.message, 'Error');
          this.alertService.error(error);
        }
      });

  }

  /* Get errors */
  handleError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }


  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPasswordMatch: true });
    }
  }

}

