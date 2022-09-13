import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-add-rules',
  templateUrl: './add-rules.component.html',
  styleUrls: ['./add-rules.component.css']
})
export class AddRulesComponent implements OnInit {

  userID: any;
  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.userID = JSON.parse(localStorage.getItem('UserID')!);


    this.form = this.fb.group({
      rule:[''],
      priority:[''],
      setting_flag: [''],
      strategy_selector: [''],
      restrictions: [''],
      stock:[''],
      rounddownprice:[''],
      filterproductrules:[''],
      matchingcriteria:[''],
      fvtcompetitors:[''],
      filterbrands:[''],
      filtercategory:[''],


      
    })

  }

  ngOnInit(): void {
  }

  SaveSettings(){
    // this.form = this.form.getRawValue();
     //@ts-ignore
     API.put('AdAgenzyCRUD', '/items/settings', {
      body: {
        ...this.form.getRawValue(),

        UserID: this.userID
      }
      
      
    }).then((value)=>{
      console.log(value)
      console.log();
    });
  }

}
