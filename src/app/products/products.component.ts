import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData } from '../Interfaces/products';

import { API } from 'aws-amplify';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  listproducts?: IProducts[];
  constructor() { }

  ngOnInit(): void {

    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
      this.listproducts = value.Items as IProducts[];
      console.log(this.listproducts);
    })
  }

  ProductDetails(data:any) {
    localStorage.setItem('ProductDetails', JSON.stringify(data))
  }
  
}