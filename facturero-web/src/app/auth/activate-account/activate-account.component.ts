import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/service/alert.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { PasswordValidation } from 'src/app/_helpers/password.validator';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  test: Date = new Date();
  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  constructor(private element: ElementRef,
    private router: Router,
    private authenticationService: AuthenticationService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService) { }

  ngOnInit() {
    

   
  }
 
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const userId = this.activateRoute.snapshot.paramMap.get('userId');
    this.authenticationService
      .activateAccount(userId).subscribe(
        data => {
          this.loading = false;
          this.router.navigate(['/auth/login']);
        },
        error => {
          //this.toastr.error(error.error.message, 'Error');
          this.loading = false;
          this.alertService.error(error);
        });;

  }
}
