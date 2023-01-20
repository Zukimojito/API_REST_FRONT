import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
@Component({
  selector: 'app-all.product',
  templateUrl: './all.product.component.html',
  styleUrls: ['./all.product.component.css']
})
export class AllProductComponent implements OnInit {
  public products: Product[] = [];
  constructor(
    // private productsService: ProductsService
    private productsService: ProductService,
    private AuthService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public user$: Observable<string | null> = this.AuthService.userSubject.asObservable();
  public CheckUser: string | null = '';
  public NbProductToPanier = 0;

  productNb: any[] = [];


  ngOnInit(): void {
    this.productsService.getProduct().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });

    this.user$.subscribe((res) => {
      if (res) {
        this.CheckUser = res;
      } else {
        this.CheckUser = '';
      }
    });
  }

  ToRefProduct(productId: any) {
    if (this.CheckUser) {
      this.router.navigateByUrl('/product/' + productId);
    } else {
      this.dialog.open(ModalErrorComponent);
    }
  }

  AddToCard(productId: any) {
    if (this.CheckUser) {
      this.productsService.addProduct(productId);
    } else {
      this.dialog.open(ModalErrorComponent);
    }
  }


  // [routerLink]="['/product', product.id]"

}


