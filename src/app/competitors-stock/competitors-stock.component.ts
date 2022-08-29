import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-competitors-stock',
  templateUrl: './competitors-stock.component.html',
  styleUrls: ['./competitors-stock.component.css']
})
export class CompetitorsStockComponent implements OnInit {

  stock: FormControl;
  userID: any;

  constructor() { 
    this.userID = JSON.parse(localStorage.getItem('UserID')!);
    this.stock = new FormControl();
  }

  ngOnInit(): void {
  }

  StockValue(){
    this.stock.value;
    //@ts-ignore
    API.put('AdAgenzyCRUD', '/items/competitorstock', {
      body: {
        stock: this.stock.value,
        UserID: this.userID
      }
    }).then((value)=>{
      console.log(value)
    });
  }

}
