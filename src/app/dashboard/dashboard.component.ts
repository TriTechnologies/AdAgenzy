import { Component, OnInit } from '@angular/core';
import {  IProducts, IProductsData,ICompetitorData } from '../Interfaces/products';
import { API } from 'aws-amplify';
import { __values } from 'tslib';
import { NavigationExtras, TitleStrategy, Router } from '@angular/router';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Pitems: any;
  Citems:any;
  CompetitorData?: ICompetitorData[];
  listproducts?: IProducts[];
  userID: any;
  products! : IProducts;
  ProductData?: IProductsData[];


  constructor() { }

  ngOnInit(): void {
    this.userID = JSON.parse(localStorage.getItem('UserID')!) 
     //@ts-ignore
     API.get('AdAgenzyCRUD', '/items/listproducts/' + this.userID).then((value) =>{
      this.listproducts = value.Items as IProducts[];
      this.Pitems = this.listproducts.length
      localStorage.setItem("listproducts" , JSON.stringify(value))
      console.log(this.listproducts)
    });

    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listcompetitors/' + this.userID).then((value) =>{
      this.CompetitorData = value as ICompetitorData[];
      this.Citems = this.CompetitorData.length
    });
  }

}
