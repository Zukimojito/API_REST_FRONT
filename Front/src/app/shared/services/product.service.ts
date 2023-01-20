import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONNEMENT } from '../environnement/environnement';
import { Product } from '../models/product.interface';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = ENVIRONNEMENT.API_URL;

  //produit dans le panier
  public productPanier = new Subject<Product[]>();
  product$ = this.productPanier.asObservable();

  //vider le panier
  public productPanierVide = new Subject<boolean>();
  productVide$ = this.productPanierVide.asObservable();

  // Data product
  private productNb: any[] = [];


  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get<Product[]>(this.API_URL + '/products');
  }
  getProductById(id: string) {
    return this.http.get<Product>(this.API_URL + '/product/' + id);
  }

  getProductsByUserId(id: string) {
    return this.http.get<Product[]>(this.API_URL + '/products/' + id);
  }

  createProduct(product: Product) {
    return this.http.post(this.API_URL + '/product/create', product);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put(this.API_URL + '/product/' + id, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.API_URL + '/product/' + id);
  }

  uploadImage(image: any) {
    return this.http.post(this.API_URL + '/product/uploadImage', image);
  }

  // Panier
  addProduct(productId: any) {
    this.productPanier.next(productId);
  }

  clearProductPanier() {
    this.productPanierVide.next(true);
  }


  setProductNb(productNb: any[]) {
    this.productNb = productNb;
  }

  getProductNb() {
    return this.productNb;
  }
}
