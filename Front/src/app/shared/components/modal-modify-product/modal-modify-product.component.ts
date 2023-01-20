import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal-modify-product',
  templateUrl: './modal-modify-product.component.html',
  styleUrls: ['./modal-modify-product.component.css'],
  entryComponents: [ModalModifyProductComponent]
})
export class ModalModifyProductComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalModifyProductComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private productsService: ProductService,
    private router: Router,
    private AuthService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  file: any;
  imageName = '';
  errorImage = '';

  ngOnInit() {
    this.productsService.getProductById(this.id).subscribe((res) => {
      this.form.patchValue(res);
    });

  }

  submit() {
    let formValues = {
      image: this.imageName,
    };
    this.form.patchValue(formValues);

    if (this.form.getRawValue().image) {
      this.productsService.updateProduct(this.id, this.form.getRawValue()).subscribe((res) => {
        console.log(res);
      });


      // update image
      if (this.file) {
        const dataForm = new FormData();
        dataForm.set("image", this.file)
        this.productsService.uploadImage(dataForm).subscribe((res) => {
          console.log(res);
        });
      }

      this.dialogRef.close();
    } else {
      this.errorImage = 'Please select an image';
    }
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
    this.imageName = this.file.name;
  }
}
