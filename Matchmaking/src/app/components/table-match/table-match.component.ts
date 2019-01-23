import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Community } from 'src/app/shared/models/community';
import { Hassid } from 'src/app/shared/models/hassid';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  status: string;
  community1:Community;
  phone:string;
  address:string;
  personaStar:number;//אשיות בכוכבים
  hassidoot:Hassid;
}

@Component({
  selector: 'app-table-match',
  templateUrl: './table-match.component.html',
  styleUrls: ['./table-match.component.scss']
})
export class TableMatchComponent implements OnInit,OnChanges {

  @ViewChild(MatSort) sort: MatSort;
  @Input() usersMatch:UserData[]=[];
  @Input() nameUser:User;
  displayedColumns: string[] = ['firstName', 'lastName', 'age','phone','address','personaStar','status','CommunityName','HassidootName'];
  dataSource: MatTableDataSource<UserData>;
  
  constructor() { }

  ngOnInit() {
  
    this.dataSource = new MatTableDataSource(this.usersMatch);
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    debugger;
    this.dataSource = new MatTableDataSource(this.usersMatch);
    this.dataSource.sort = this.sort;
  }
  

}
