import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { Hassid } from 'src/app/shared/models/hassid';
import { Recommend } from 'src/app/shared/models/recommend';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  myControl = new FormControl();
  isLinear = false;
  user: User;
  age: number = 0;
  userFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  bodyStructureFormGroup: FormGroup;
  spiritualStateFormGroup: FormGroup;
  workFormGroup: FormGroup;
  moreDetailsFormGroup: FormGroup;
  hassidoots: Hassid[];
  // name:string;
  //   phone1:string;
  //   phone2:string;

  addUserNum: any;
  selected: number;
  cities: any;
  desplayMan: boolean = true;
  desplayFaman: boolean = true;
  seenumChildren: boolean = false;
  seeHassidoot: boolean = false;
  recomend1: Recommend = new Recommend();
  recomend2: Recommend = new Recommend();
  recomend3: Recommend = new Recommend();
  form: FormGroup;
  description: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogEditUserComponent>,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
    , private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.recomend1 = new Recommend();
    this.recomend2 = new Recommend();
    this.recomend3 = new Recommend();
    this.description = data.id;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
    })
  }

  submit(form) {
    this.dialogRef.close(`ok`);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
