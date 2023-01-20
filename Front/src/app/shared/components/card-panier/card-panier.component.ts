import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-card-panier',
  templateUrl: './card-panier.component.html',
  styleUrls: ['./card-panier.component.css']
})
export class CardPanierComponent implements OnInit {
  @Input() item: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    userID: 0,
    image: '',
    create_at: '',
  }

  ImageURL: string = '../../'

  constructor() { }

  ngOnInit(): void {
  }

}

