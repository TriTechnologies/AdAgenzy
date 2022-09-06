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
  userID: any;
  mitems:any;
  searchText!: string;

  newPrice = new FormControl;

  constructor() {
    this.userID = JSON.parse(localStorage.getItem('UserID')!)
   }

  ngOnInit(): void {

    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listrepricing/' + this.userID).then((value) =>{
      console.log(value);
      this.listproducts = value as IProducts[];
      this.mitems = this.listproducts.length;
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

    this.newPrice.setValue(data.ProductData.Product_Price)
    this.CompetitorData = data.CompetitorData
  
     //@ts-ignore
    //  API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
    //   this.CompetitorData = value.Items[2].CompetitorData  as ICompetitorData[];
    //   });
  
    }

  updatePrice(ProductData: any) {
    ProductData.ProductData.Product_Price = this.newPrice.value.toString();
    console.log(ProductData)
    API.put('AdAgenzyCRUD', '/items/updateprice', {
      body: {
        ProductData: {...ProductData},
        UserID: this.userID
      }
    }).then((value) => {
      console.log(value)
    })
  }
}
