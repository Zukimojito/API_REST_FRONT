import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() public user!: string | null;
  @Output() public logout: EventEmitter<true> = new EventEmitter();
  productNb: any[] = [];

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private productsService: ProductService,
  ) { }
  public roles: string = '';

  ngOnInit(): void {

    this.productsService.product$.subscribe((data) => {
      this.productNb.push(data);
    })

    this.productsService.productVide$.subscribe((data) => {
      this.productNb = [];
    });
  }

  SendToPanier() {
    this.productsService.setProductNb(this.productNb);
    this.router.navigate(['/panier']);
  }


}

