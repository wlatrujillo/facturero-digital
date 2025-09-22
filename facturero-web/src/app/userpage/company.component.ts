import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../core/model/company';
import { AdminService } from '../core/service/admin.service';
import { AlertService } from '../core/service/alert.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  loading: boolean = false;
  companyForm: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private adminService: AdminService,
    private alertService: AlertService) { }

  ngOnInit() {
    let company: Company = this.router.snapshot.data['company'] || new Company();
    this.companyForm = this.formBuilder.group({
      name: [company.name, Validators.required],
      ruc: [company.ruc, Validators.required],
      email: [company.email, [Validators.required, Validators.email]],
      phone: [company.phone],
      address: [company.address],
    });

  }

  onFormSubmit() {
    if (this.companyForm.invalid) return;
    this.loading = true;
    this.adminService.updateCompany(this.companyForm.value)
      .subscribe(this.onSuccess, this.onError);
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.companyForm.controls[controlName].hasError(errorName);
  }

  private onSuccess = () => {
    this.loading = false;
    //Notifica de exito
    this.alertService.success("Guardado exitosamente", 1000);
  }

  private onError = (error) => {
    this.loading = false;
    this.alertService.error(error);
  }

}
