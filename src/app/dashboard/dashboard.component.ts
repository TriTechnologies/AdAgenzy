import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  IProducts, IProductsData,ICompetitorData } from '../Interfaces/products';
import { API } from 'aws-amplify';
import { __values } from 'tslib';
import { NavigationExtras, TitleStrategy, Router } from '@angular/router';

import Chart from 'chart.js/auto';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  Pitems: any;
  Citems:any;
  Litems: any;
  Titems:any;
  CompetitorData?: ICompetitorData[];
  listproducts?: IProducts[];
  manualrepricing?: IProducts[];
  userID: any;
  products! : IProducts;
  ProductData?: IProductsData[];


  
  @ViewChild('barCanvas') barCanvas!: ElementRef ;
  barChart: any;

  constructor() {
  
   }
   ngAfterViewInit(): void {
    this.ngOnInit();
  }



  ngOnInit(): void {
     //@ts-ignore
     API.get('AdAgenzyCRUD', '/items/listrepricing/' + this.userID).then((value) =>{
      console.log(value);
      this.manualrepricing = value as IProducts[];
      this.Litems = this.manualrepricing.length
      this.Titems = this.listproducts!.length - this.manualrepricing!.length
    });
    this.userID = JSON.parse(localStorage.getItem('UserID')!) 
     //@ts-ignore
     API.get('AdAgenzyCRUD', '/items/listproducts/' + this.userID).then((value) =>{
      this.listproducts = value.Items as IProducts[];
      this.Pitems = this.listproducts.length
      localStorage.setItem("listproducts" , JSON.stringify(value))
      console.log(this.listproducts);
      
      this.barChart = new Chart(this.barCanvas!.nativeElement, {

        type: 'bar',
        data: {
          labels: ['Total Products', 'Total Competitors', 'Products Monitored', 'Products Unobserved'],
          datasets: [
            {
              barPercentage: 0.5,
              barThickness: 500,
              maxBarThickness: 100,
              minBarLength: 2,

              label: '',
              data:[this.Pitems,this.Citems,this.Litems,(this.listproducts!.length - this.manualrepricing!.length)],
              backgroundColor: [
                'fc107',
                'fc107',
                'fc107',
                'fc107',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
               
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listcompetitors/' + this.userID).then((value) =>{
      this.CompetitorData = value as ICompetitorData[];
      this.Citems = this.CompetitorData.length
    });

    
  }
  

}
