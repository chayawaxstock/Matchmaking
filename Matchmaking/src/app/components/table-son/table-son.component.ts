import { Component, OnInit, Input } from '@angular/core';
//import { TableData } from './table-data';

import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { filter } from 'rxjs/operators';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { UserService } from 'src/app/shared/services/user.service';
import { Status } from 'src/app/shared/models/status';
import { Community } from 'src/app/shared/models/community';
import { DialogPreferenceComponent } from '../dialog-preference/dialog-preference.component';
import { Preference } from 'src/app/shared/models/preference';
import { User } from 'src/app/shared/models/user';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  status: Status;
  community1: Community;
}

const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];


@Component({
  selector: 'app-table-son',
  templateUrl: './table-son.component.html',
  styleUrls: ['./table-son.component.scss']
})
export class TableSonComponent implements OnInit {

  deleteNameDialogRef: MatDialogRef<DialogDeleteComponent>;
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'status', 'community1', 'preference',  'update', 'delete','match'];
  dataSource: MatTableDataSource<UserData>;
  @Input() dataSon=[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: any[];
  dialogEditUserComponent: MatDialogRef<DialogEditUserComponent, any>;
  DialogDetailComponent: MatDialogRef<{}, any>;
  dialogPreperenceComponent: MatDialogRef<DialogPreferenceComponent, any>;

  constructor(private dialog: MatDialog,private userService:UserService) {
    // Create 100 users
   
    // Assign the data to the data source for the table to render
    this.userService.getMan().subscribe(p=>{
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
      this.userService.matchSubject.next(data);
    })
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

