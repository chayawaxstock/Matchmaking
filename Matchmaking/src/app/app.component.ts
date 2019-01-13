import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'Matchmaking';

  constructor(
    public userService: UserService,
    public router: Router) { }

 ngOnInit(): void {
  if(localStorage.getItem('user'))
      {
        let data= JSON.parse(localStorage.getItem('user'));
        if (data['isAdmin'] == true)
        this.router.navigate(['admin']);
      else this.router.navigate(['profile']);
    }
  }
}
