import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-round-price',
  templateUrl: './round-price.component.html',
  styleUrls: ['./round-price.component.css']
})
export class RoundPriceComponent implements OnInit {

  rounddownprice: FormControl;
  userID: any;

  constructor() { 
    this.userID = JSON.parse(localStorage.getItem('UserID')!);
    this.rounddownprice = new FormControl();
  }

  ngOnInit(): void {
  }

  Rounddownprice(){
    this.rounddownprice.value;
    //@ts-ignore
    API.put('AdAgenzyCRUD', '/items/rounddownprice', {
      body: {
        rounddownprice: this.rounddownprice.value,
        UserID: this.userID
      }
    }).then((value)=>{
      console.log(value)
    });
  }

}
