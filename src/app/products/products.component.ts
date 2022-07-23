import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData } from '../Interfaces/products';


import { API } from 'aws-amplify';
import { __values } from 'tslib';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  listproducts?: IProducts[];
  products! : IProducts;

  
  constructor() { 
  
  }

  ngOnInit(): void {

 
    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
      this.listproducts = value.Items as IProducts[];
      localStorage.setItem("listproducts" , JSON.stringify(value))
      console.log(this.listproducts);
    });
    
  }

  ProductDetails(data:any) {
    this.products = data
  }
  
}