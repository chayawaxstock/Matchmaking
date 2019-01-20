import { Component, OnInit } from '@angular/core';
//import { TableData } from './table-data';

import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { filter } from 'rxjs/operators';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { UserService } from 'src/app/shared/services/user.service';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  status: string;
  community1: string;
}

const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];


@Component({
  selector: 'app-table-girl',
  templateUrl: './table-girl.component.html',
  styleUrls: ['./table-girl.component.scss']
})
export class TableGirlComponent implements OnInit {

  deleteNameDialogRef: MatDialogRef<DialogDeleteComponent>;
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'status', 'community1', 'preference', 'details', 'update', 'delete','match'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: any[];
  DialogDetailComponent: MatDialogRef<DialogDetailComponent, any>;
  dialogEditUserComponent: MatDialogRef<DialogEditUserComponent, any>;

  constructor(private dialog: MatDialog,private userService:UserService) {
    // Create 100 users
    this.userService.getFeman()
    .subscribe(p=>{
      this.users=p;
    });
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public redirectToDetails = (id: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: id,
        title: 'Angular For Beginners'
    };

    
    this.DialogDetailComponent = this.dialog.open(DialogDetailComponent,dialogConfig);

    this.DialogDetailComponent
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {

        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log({ name, content: '' })
      });
  }

  public redirectTomatch = (id: string) => {
    console.log(id);
  }


  public redirectToUpdate = (id: string) => {  

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: id,
        title: 'Angular For Beginners'
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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    firstName: name,
    lastName: Math.round(Math.random() * 100).toString(),
    age: 29,
    status: 'רווק',
    community1: 'לטאי'
  };



}