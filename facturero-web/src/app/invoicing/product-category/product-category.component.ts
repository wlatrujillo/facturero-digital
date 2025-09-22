import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from 'src/app/core/service/product-category.service';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements OnInit {

  productCategoryForm: FormGroup;
  isModalWindow: boolean = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
    @Optional() private dialogRef: MatDialogRef<ProductCategoryComponent>
  ) { }

  ngOnInit() {
    if (this.dialogRef) this.isModalWindow = true;

    let productCategory = this.route.snapshot.data["productCategory"] || {};

    this.productCategoryForm = this.fb.group({
      _id: [productCategory._id],
      name: [productCategory.name || '', [Validators.required]],
      description: [productCategory.description || '']
    })
  }


  onSubmit() {

    if (this.productCategoryForm.invalid) {
      return;
    }

    let productCategory = this.route.snapshot.data["productCategory"];

    if (productCategory) {
      this.productCategoryForm.value._id = productCategory._id;
      this.productCategoryService.update(this.productCategoryForm.value)
        .subscribe(this.onSuccess);
    } else {
      this.productCategoryService.create(this.productCategoryForm.value)
        .subscribe(this.onSuccess);
    }

  }

  handleError = (controlName: string, errorName: string) => {
    return this.productCategoryForm.controls[controlName].hasError(errorName);
  }

  onCloseModalWindow() {
    if (this.dialogRef)
      this.dialogRef.close();
  }

  private onSuccess = (productCategory) => {
    if (this.isModalWindow) {
      this.dialogRef.close(productCategory);
    } else {
      this.location.back()
    }
  }



}
