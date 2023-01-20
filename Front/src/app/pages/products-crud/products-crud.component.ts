import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalProductComponent } from 'src/app/shared/components/modal-product/modal-product.component';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { ModalModifyProductComponent } from 'src/app/shared/components/modal-modify-product/modal-modify-product.component';

@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.css']
})
export class ProductsCrudComponent implements OnInit {
  public products: Product[] = [];
  // public user$: Observable<User | null> = this.AuthService.user$.asObservable();


  constructor(
    private productsService: ProductService,
    private router: Router,
    private AuthService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  editing: number = -1;
  saving: boolean = false;
  error: string = '';
  updateInfo: any = '';

  public form: FormGroup = this.fb.group({
    // id: [{ value: '', disabled: true }, [Validators.required]],
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: [''],
    userID: [{ value: '', disabled: true }],
    create_at: [{ value: '', disabled: true }],
    update_at: [{ value: '', disabled: true }]
  });

  ngOnInit(): void {
    this.AuthService.getUser().subscribe((res) => {
      console.log(res?.id);
      if (res?.id) {
        this.productsService.getProductsByUserId(res?.id.toString()).subscribe(result => {
          console.log("hmmm", result);
          this.products = result;
        });
      }
    });
  }

  openModal() {
    this.dialog.open(ModalProductComponent);
  }

  modifyModal(id: any) {
    const modifyModal = this.dialog.open(ModalModifyProductComponent, { data: id });
    modifyModal.afterClosed().subscribe((result) => {
      console.log("close");
      this.ngOnInit();
    });
  }

  deleteProduct(product: any) {
    this.productsService.deleteProduct(product).subscribe((res) => {
      // this.products = this.products.filter((item) => item.id !== product.id);
      console.log(res);
      this.ngOnInit();
    });
  }

}

