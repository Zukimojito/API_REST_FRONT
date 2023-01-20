import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css'],
  entryComponents: [ModalProductComponent]
})
export class ModalProductComponent implements OnInit {

  constructor(
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

  ngOnInit(): void {
  }

  submit() {
    let formValues = {
      image: this.imageName,
    };
    this.form.patchValue(formValues);

    // update image
    const dataForm = new FormData();
    dataForm.set("image", this.file)

    this.productsService.uploadImage(dataForm).subscribe((res) => {
      console.log(res);
    }
    );


    this.productsService.createProduct(this.form.value).subscribe((res) => {
      this.router.navigate(['/products']);
    }
    );

    this.dialog.closeAll();
  }
  uploadFile(event: any) {
    this.file = event.target.files[0];
    this.imageName = this.file.name;
  }
}

