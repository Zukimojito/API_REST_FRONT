import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  productAll: any[] = [];
  PrixTotal: number = 0;
  montant: any = { id: 0, montant: 0, userID: 0, created_at: '', updated_at: '' };
  UserId: any = 0;

  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private AuthService: AuthService
  ) { }


  ngOnInit(): void {

    this.AuthService.getUser().subscribe((res) => {
      this.AuthService.readMoney(res.id).subscribe((res) => {
        this.montant = res;
      });
    });

    this.productAll = this.productsService.getProductNb();
    this.productAll.forEach((product: any) => {
      this.PrixTotal += product.price;
    })

    this.AuthService.getUser().subscribe((res) => {
      this.UserId = res.id;
    })
  }

  Buy() {
    this.montant.money = this.montant.money + this.PrixTotal;
    this.AuthService.updateMoney(this.UserId, this.montant.money).subscribe((res) => {
      this.productAll = [];
      this.PrixTotal = 0;
      this.productsService.clearProductPanier();
    });
  }
}
