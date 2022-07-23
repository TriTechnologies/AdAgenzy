import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData } from '../Interfaces/products';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  ProductData! : IProductsData;
  listproducts?: IProducts[];


  constructor() {
    // this.ProductData = JSON.parse(localStorage.getItem('ProductDetails')!)
    // console.log(localStorage.getItem('ProductDetails'))
   }

  ngOnInit(): void {
     //@ts-ignore
     API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
      console.log(value);
      this.listproducts = value.Items as IProducts[];
    })
  }

}


