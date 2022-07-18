import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData } from '../Interfaces/products';

import { API } from 'aws-amplify';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  listproducts?: IProductsData[];
  constructor() { }

  ngOnInit(): void {

    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
      console.log(value);
      this.listproducts = value.Items[0].ProductData;
    })
  }

  ProductDetails(data:any) {
    localStorage.setItem('ProductDetails', JSON.stringify(data))
  }

  eventCheckBox() {
    let checkboxs = document.getElementsByTagName("input");
    for(let i = 1; i < checkboxs.length ; i++) {
      checkboxs[i].checked = !checkboxs[i].checked;
    }
  }

}