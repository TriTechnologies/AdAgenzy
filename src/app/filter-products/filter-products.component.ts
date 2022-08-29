import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.css']
})
export class FilterProductsComponent implements OnInit {

  filterproductrules: FormControl;
  matchingcriteria: FormControl;
  fvtcompetitors: FormControl;
  // form: FormGroup;
  filterbrands: FormControl;
  filtercategory: FormControl;
  userID: any;

  constructor(private fb: FormBuilder) { 

    this.userID = JSON.parse(localStorage.getItem('UserID')!);
    this.filterproductrules = new FormControl();
    this.matchingcriteria = new FormControl();
    this.fvtcompetitors = new FormControl();
    this.filterbrands = new FormControl();
    this.filtercategory = new FormControl();
    // this.form = this.fb.group({
    //   filterbrands: [''],
    //   filtercategory: [''],
    // });
    





  }

  ngOnInit(): void {
  }

  FilterProducts(){
    this.filterproductrules.value;
    this.matchingcriteria.value;
    this.fvtcompetitors.value;
    // this.form.getRawValue();
    this.filterbrands.value,
    this.filtercategory.value,
    //@ts-ignore
       API.put('AdAgenzyCRUD', '/items/filterproducts', {
      body: {
        filterproductrules: this.filterproductrules.value,
        matchingcriteria: this.matchingcriteria.value,
        fvtcompetitors: this.fvtcompetitors.value,
        filterbrands: this.filterbrands.value,
        filtercategory: this.filtercategory.value,

        UserID: this.userID
      }
      
      
    }).then((value)=>{
      console.log(value)
      console.log();
    });
  }

}
