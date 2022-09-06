import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import {  IProducts, IProductsData,ICompetitorData } from '../Interfaces/products';
import { ngxCsv } from "ngx-csv/ngx-csv";


@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.css']
})

export class CompetitorsComponent implements OnInit {

  CompetitorData?: ICompetitorData[];
  products! : IProducts;
  userID: any;
  items:any;
  searchText!: string;

  constructor() {
    this.userID = JSON.parse(localStorage.getItem('UserID')!)
   }

  ngOnInit(): void {
    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listcompetitors/' + this.userID).then((value) =>{
      this.CompetitorData = value as ICompetitorData[];
      this.items = this.CompetitorData.length
      console.log(this.CompetitorData)
    });
  }

  results(){
    var options={
     
                showLabels: false,
                useBom: true,
      headers:["Competitors"," Store Links",]
    }

      new ngxCsv(this.CompetitorData, 'Competitors Report', options)   
    
  }

}
