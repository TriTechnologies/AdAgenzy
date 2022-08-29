import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { API } from 'aws-amplify';


@Component({
  selector: 'app-price-min-max',
  templateUrl: './price-min-max.component.html',
  styleUrls: ['./price-min-max.component.css']
})
export class PriceMinMaxComponent implements OnInit {

  restrictions: FormControl;
  userID: any;

  constructor() { 
    this.userID = JSON.parse(localStorage.getItem('UserID')!);
    this.restrictions = new FormControl();
  }

  ngOnInit(): void {
  }


  Restrictions(){
    this.restrictions.value;
    //@ts-ignore
    API.put('AdAgenzyCRUD', '/items/restrictions', {
      body: {
        restrictions: this.restrictions.value,
        UserID: this.userID
      }
    }).then((value)=>{
      console.log(value)
    });
  }

}
