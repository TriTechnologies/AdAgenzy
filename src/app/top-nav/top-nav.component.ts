import { Component, OnInit } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(public router: Router) {
    Auth.currentUserInfo().then((value) => {
      localStorage.setItem('UserID', JSON.stringify(value.id))
      console.log(value)
    })
  }

  ngOnInit(): void {
    
  }
  logOut() {
    Auth.signOut()
      .then((value) => console.log(value))
      .catch((e) => console.log(e))
      .finally(() => {
        let currentUrl = this.router.url;
        location.reload();
      });
  }

}
