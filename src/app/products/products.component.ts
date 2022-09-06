import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData, ICompetitorData } from '../Interfaces/products';
import { API } from 'aws-amplify';
import { __values } from 'tslib';
import { NavigationExtras, TitleStrategy, Router } from '@angular/router';
import { ProductsService } from "src/app/products.service";
import { ngxCsv } from "ngx-csv/ngx-csv";
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger("load", [
      // ...
      state(
        "load",
        style({
          opacity: 1
        })
      ),
      state(
        "done",
        style({
          opacity: 0.1
        })
      ),
      transition("load => done", [animate(0)]),
      transition(":enter", [
        animate(
          "20s",
          keyframes([
            style({ transform: "rotate(0deg)", offset: 0 }),
            style({ transform: "rotate(9999deg)", offset: 1 })
          ])
        )
      ])
    ])
  ]
})

export class ProductsComponent implements OnInit {


  myPrice: boolean = true ;
  IdSku: boolean = true;
  stock:boolean = true;
  searchText!: string;
  listproducts?: IProducts[];
  products? : IProducts;
  CompetitorData!: ICompetitorData[];
  userID: any;
  ProductData?: IProductsData[];
  items:any



  constructor(private router: Router, private productsService: ProductsService) { 
  }


  ngOnInit(): void {
    this.userID = JSON.parse(localStorage.getItem('UserID')!)   
    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listproducts/' + this.userID).then((value) =>{
      this.listproducts = value.Items as IProducts[];
      this.items = this.listproducts.length
      localStorage.setItem("listproducts" , JSON.stringify(value))
      console.log(this.listproducts);
    });

        //@ts-ignore
        API.get('AdAgenzyCRUD', '/items/excelproducts/' + this.userID).then((value) =>{
          this.ProductData = value as IProductsData[];
          console.log(this.ProductData);
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

  // download(){
  //   this.productsService.downloadFile(this.listproducts, 'jsontocsv');
  // }

  results(){
    var options={
     
                showLabels: false,
                useBom: true,
      headers:["Brands"," Categories", "Product Name", "Product Barcode", "Product ID", "Prodcut Image Link", "Product Link", "Product Price", "Product SKU", "Product Stock"]
    }

      new ngxCsv(this.ProductData, 'Products Report', options)   
    
  }

  MyPrice() {

    this.myPrice = ! this.myPrice;
    
    }
    IDSku() {

      this.IdSku  = ! this.IdSku;
      
      }
    Stock() {

      this.stock  = ! this.stock;
        
        }

}