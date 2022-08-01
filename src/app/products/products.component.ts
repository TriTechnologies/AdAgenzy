import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData, ICompetitorData } from '../Interfaces/products';
import { API } from 'aws-amplify';
import { __values } from 'tslib';
import { NavigationExtras, TitleStrategy, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  
  listproducts?: IProducts[];
  products? : IProducts;
  CompetitorData!: ICompetitorData[];

  constructor(private router: Router) { 
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
    const nav: NavigationExtras = {
      state: {
        data: data
      }
    };
    this.router.navigate(["home", "productdetails"], nav)
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