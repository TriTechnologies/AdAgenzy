import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import {  IProducts, IProductsData,ICompetitorData } from '../Interfaces/products';



@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.css']
})
export class CompetitorsComponent implements OnInit {

  CompetitorData?: ICompetitorData[];
  products! : IProducts;
  userID: any;

 

  constructor() {
    this.userID = JSON.parse(localStorage.getItem('UserID')!)
   }

  ngOnInit(): void {

     //@ts-ignore
     API.get('AdAgenzyCRUD', '/items/listcompetitors/' + this.userID).then((value) =>{
    this.CompetitorData = value as ICompetitorData[];
    });

  }

}
