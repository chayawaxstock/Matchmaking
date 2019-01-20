import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  dataGirl:User[]=[];
  dataSon:User[]=[];
  constructor(private userService:UserService) { }

  ngOnInit() {
    // this.userService.getMan().subscribe(p=>{
    //   this.dataSon=p; 
    // });
  }

}
