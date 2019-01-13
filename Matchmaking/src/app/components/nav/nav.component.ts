import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  logOut: boolean = false;
  constructor(private userService: UserService,
    public router: Router) {

  }

  ngOnInit() {

    this.userService.logOut.subscribe(b => {
      this.logOut = b;
    });

    if (localStorage.getItem('user')) {
      this.logOut = true;
    }

  }

  logOutFunc()
  {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }


}
