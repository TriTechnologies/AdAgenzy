import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor() {
    Auth.currentUserInfo().then((value) => {
      localStorage.setItem('UserID', JSON.stringify(value.attributes.sub))
      console.log(value)
    })
  }

  ngOnInit(): void {
    
  }

}
