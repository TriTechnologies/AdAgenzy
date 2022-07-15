import { Component, OnInit } from '@angular/core';
import { IProductsData } from 'src/app/Interfaces/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  ProductData! : IProductsData;

  constructor() {
    this.ProductData = JSON.parse(localStorage.getItem('ProductDetails')!)
    console.log(localStorage.getItem('ProductDetails'))
   }

  ngOnInit(): void {
  }

}
