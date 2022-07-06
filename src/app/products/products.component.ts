import { Component, OnInit } from '@angular/core';
import {  IProducts } from '../Interfaces/products';
// import { API } from 'aws-amplify';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listproducts?: IProducts[];

  constructor() { }

  ngOnInit(): void {

    //@ts-ignore
    API.get('AdAgenzyCRUD', '/items/listproducts').then((value) =>{
      console.log(value);
      this.listproducts = value.items;
    })
  }
}