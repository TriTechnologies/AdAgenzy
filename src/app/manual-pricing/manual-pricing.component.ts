import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData, ICompetitorData } from '../Interfaces/products';

import { API } from 'aws-amplify';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-manual-pricing',
  templateUrl: './manual-pricing.component.html',
  styleUrls: ['./manual-pricing.component.css']
})
export class ManualPricingComponent implements OnInit {

  listproducts?: IProducts[];
  products! : IProducts;
  CompetitorData!: ICompetitorData[];

  newPrice = new FormControl;

  constructor() {
   }

  ngOnInit(): void {

    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/repricing').then((value) =>{
      console.log(value);
      this.listproducts = value as IProducts[];
    })
  }

  // GetLocalProductData(){
  //   this.ProductData = JSON.parse(localStorage.getItem('ProductDetails')!)
  //   console.log(localStorage.getItem('ProductDetails'))
  // }

  ProductDetails(data:any) {
    console.log(data)
    this.products = data
    // localStorage.setItem('ProductDetails', JSON.stringify(data))

    // this.ProductData = JSON.parse(localStorage.getItem('ProductDetails')!)
  }

  CompDetail(data:any){
    this.products = data;
    console.log(data)
  
    this.CompetitorData = data.CompetitorData
  
     //@ts-ignore
    //  API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
    //   this.CompetitorData = value.Items[2].CompetitorData  as ICompetitorData[];
    //   });
  
    }
}
