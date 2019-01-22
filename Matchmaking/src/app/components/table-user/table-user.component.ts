import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';

import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { UserData } from '../table-girl/table-girl.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { filter } from 'rxjs/operators';
import { Preference } from 'src/app/shared/models/preference';
import { DialogPreferenceComponent } from '../dialog-preference/dialog-preference.component';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {
  deleteNameDialogRef: MatDialogRef<DialogDeleteComponent>;
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'status', 'community1', 'preference', 'update', 'delete','match'];
  dataSource: MatTableDataSource<UserData>;
  @Input() dataGirl
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: any[];
  dialogEditUserComponent: MatDialogRef<DialogEditUserComponent, any>;
  dialogPreperenceComponent: MatDialogRef<{}, any>;
  usersMatch:User[]=[];
  nameUser:string;

  constructor(private dialog: MatDialog,private userService:UserService) {
    // Create 100 users
    this.userService.getUsers()
    .subscribe(p=>{
      this.users=p;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       
    });
  }

  ngOnInit() {
   this.userService.matchSubject.subscribe(data=>{
    this.users=data;
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   })
  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  public redirectTomatch = (user: User) => {
    this.userService.getMatch(user).subscribe(
      data=>{
        debugger;
        this.nameUser=user.firstName+" "+user.lastName;
      this.usersMatch=data
     // this.userService.matchSubject.next(data);
    })
  }

  public redirectToUpdate = (user: User) => {  

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        user: user,
    };

    
    this.dialogEditUserComponent = this.dialog.open(DialogEditUserComponent,dialogConfig);

    this.dialogEditUserComponent
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {

        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log({ name, content: '' })
      });
  }

  public redirectToPreperence=(preference: Preference)=>{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        preference: preference,
        title: 'Angular For Beginners'
    };

    
    this.dialogPreperenceComponent = this.dialog.open(DialogPreferenceComponent,dialogConfig);

    this.dialogPreperenceComponent
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {

        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log({ name, content: '' })
      });
  }


  public redirectToDelete = (id: number) => {


    this.deleteNameDialogRef = this.dialog.open(DialogDeleteComponent);

    this.deleteNameDialogRef
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {

        let index = 0;
        let degel = false;
        this.users.forEach(p => {
          if (p['id'] == id && degel == false) {
            id = index;
            degel = true;
          }
          index++;
        }
        );
        this.users.splice(id, 1);
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log({ name, content: '' })
      });
  }
}


