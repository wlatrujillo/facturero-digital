import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TaxValueService } from 'src/app/core/service/tax-value.service';
import { Observable } from 'rxjs';
import { Catalog } from 'src/app/core/model/catalog';
import { AdminService } from 'src/app/core/service/admin.service';

@Component({
  selector: 'app-tax-value',
  templateUrl: './tax-value.component.html',
  styleUrls: ['./tax-value.component.css']
})
export class TaxValueComponent implements OnInit {

  taxValueForm: FormGroup;
  taxType$: Observable<Catalog>;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taxValueService: TaxValueService,
    private catalogService: AdminService
  ) { }

  ngOnInit() {

    this.taxType$ = this.catalogService.getCatalogByName('tax_type');
    let taxValue = this.route.snapshot.data["taxValue"] || {};

    this.taxValueForm = this.fb.group({
      _id: [taxValue._id],
      tax: [taxValue.tax, [Validators.required]],
      percentage: [taxValue.percentage, [Validators.required]],
      description: [taxValue.description]
    })
  }


  onSubmit() {

    if (this.taxValueForm.invalid) {
      return;
    }

    let taxValue = this.route.snapshot.data["taxValue"];

    if (taxValue) {
      this.taxValueForm.value._id = taxValue._id;
      this.taxValueService.update(this.taxValueForm.value)
        .subscribe(this.onSuccess);
    } else {
      this.taxValueService.create(this.taxValueForm.value)
        .subscribe(this.onSuccess);
    }

  }

  handleError = (controlName: string, errorName: string) => {
    return this.taxValueForm.controls[controlName].hasError(errorName);
  }

  private onSuccess = () => {
    this.location.back()
  }
}
