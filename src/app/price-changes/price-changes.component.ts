import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-price-changes',
  templateUrl: './price-changes.component.html',
  styleUrls: ['./price-changes.component.css']
})
export class PriceChangesComponent implements OnInit {


  setting_flag: FormControl;
  userID: any;
  constructor() { 
    this.userID = JSON.parse(localStorage.getItem('UserID')!);
    this.setting_flag = new FormControl();

  }

  ngOnInit(): void {
  }

   sendValue() {
    this.setting_flag.value;
    //@ts-ignore
       API.put('AdAgenzyCRUD', '/items/pricechangerule', {
      body: {
        setting_flag: this.setting_flag.value,
        UserID: this.userID
      }
    }).then((value)=>{
      console.log(value)
    });
  }
  }


