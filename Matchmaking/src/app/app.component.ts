import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Matchmaking';

  constructor(
    public userService: UserService,
    public router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem('password')) {
     this.userService.loginByPassword(JSON.parse( localStorage.getItem('password'))).subscribe(
       data=>{
          this.userService.currentUser = data;
          this.userService.logOut.next(true);
           if (data['isAdmin'] == true)
            this.router.navigate(['admin']);
          else this.router.navigate(['profile']);
       },err=>{
        this.userService.logOut.next(false);
        this.router.navigate(['login']);
       }
     )

    }
  }
}
