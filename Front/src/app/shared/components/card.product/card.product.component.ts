import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.interface';


@Component({
  selector: 'app-cardProduct',
  templateUrl: './card.product.component.html',
  styleUrls: ['./card.product.component.css']
})
export class CardProductComponent implements OnInit {
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
