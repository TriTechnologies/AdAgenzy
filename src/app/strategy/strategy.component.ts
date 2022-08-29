import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {

  strategy_selector: FormControl;
  userID: any;

  constructor() {

    this.userID = JSON.parse(localStorage.getItem('UserID')!);
    this.strategy_selector = new FormControl();
   }

  ngOnInit(): void {
  }

  strategyValue(){
    this.strategy_selector.value;
    //@ts-ignore
    API.put('AdAgenzyCRUD', '/items/strategy', {
      body: {
        strategy_selector: this.strategy_selector.value,
        UserID: this.userID
      }
    }).then((value)=>{
      console.log(value)
    });
  }

}
