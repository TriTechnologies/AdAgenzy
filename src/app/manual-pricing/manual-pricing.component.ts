import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData } from '../Interfaces/products';

import { API } from 'aws-amplify';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-manual-pricing',
  templateUrl: './manual-pricing.component.html',
  styleUrls: ['./manual-pricing.component.css']
})
export class ManualPricingComponent implements OnInit {

  listproducts?: IProductsData[];
  ProductData! : IProductsData;

  newPrice = new FormControl;

  constructor() {
   }

  ngOnInit(): void {

    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
      console.log(value);
      this.listproducts = value.Items[0].ProductData;
    })
  }

  // GetLocalProductData(){
  //   this.ProductData = JSON.parse(localStorage.getItem('ProductDetails')!)
  //   console.log(localStorage.getItem('ProductDetails'))
  // }

  ProductDetails(data:any) {
    console.log(data)
    this.ProductData = data
    // localStorage.setItem('ProductDetails', JSON.stringify(data))

    // this.ProductData = JSON.parse(localStorage.getItem('ProductDetails')!)
  }
}
