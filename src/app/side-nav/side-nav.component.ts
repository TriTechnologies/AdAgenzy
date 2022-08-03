import { Component, OnInit } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(public router: Router,) { }

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
