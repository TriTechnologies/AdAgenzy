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

 

  constructor() {
    
   }

  ngOnInit(): void {

     //@ts-ignore
     API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
    this.CompetitorData = value.Items[2].CompetitorData as ICompetitorData[];
    });

  }

}
