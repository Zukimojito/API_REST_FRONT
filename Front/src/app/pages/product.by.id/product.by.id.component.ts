import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product.by.id.component.html',
  styleUrls: ['./product.by.id.component.css']
})
export class ProductByIdComponent implements OnInit {
  public id: string | undefined;
  public products: Product = {} as Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.id = params.get('id')!;
    });

    this.productsService.getProductById(this.id!).subscribe(result => {
      this.products = result;
      console.log(this.products.id);
    }
    );
  }
}
