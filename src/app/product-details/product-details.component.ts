import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData } from '../Interfaces/products';
import { API } from 'aws-amplify';
import { NavigationExtras, TitleStrategy, Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  products?: IProducts;
  listproducts?: IProducts[];
  data?: IProducts;
  productsData: any;


  constructor(private router: Router) {
    this.products = this.router.getCurrentNavigation()?.extras!.state!["data"];
    if (this.router.getCurrentNavigation()?.extras!.state) {

      this.products = this.router.getCurrentNavigation()?.extras!.state!["data"];
      localStorage.setItem("data", JSON.stringify(this.products));
      }
      else{
      this.products = JSON.parse(localStorage.getItem("data")!);
      }
   }

  ngOnInit(): void {
    //@ts-ignore
    // API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
    //   console.log(value);
    //   this.listproducts = value.Items as IProducts[];
    //   localStorage.setItem("listproducts" , JSON.stringify(value))
    //   console.log(this.listproducts);
    // })
  }

  ngOnDestroy(): void{
    localStorage.removeItem("data");
  }

}