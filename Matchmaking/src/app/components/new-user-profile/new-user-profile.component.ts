import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createValidatorText, createValidatorBirthday, createValidatorEmail, createValidatorNumber } from 'src/app/shared/validators/user-validators';
import { UserService } from 'src/app/shared/services/user.service';
import { Hassid } from 'src/app/shared/models/hassid';
import { Recommend } from 'src/app/shared/models/recommend';

@Component({
  selector: 'app-new-user-profile',
  templateUrl: './new-user-profile.component.html',
  styleUrls: ['./new-user-profile.component.scss']
})
export class NewUserProfileComponent implements OnInit {

  isLinear = false;
  age: number = 0;
  userFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  bodyStructureFormGroup: FormGroup;
  spiritualStateFormGroup: FormGroup;
  workFormGroup: FormGroup;
  moreDetailsFormGroup: FormGroup;
  hassidoots: Hassid[]=[];
  // name:string;
  //   phone1:string;
  //   phone2:string;
  recomends:Recommend[]=[new Recommend(),new Recommend(),new Recommend()];

  constructor(private _formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    debugger;
    this.userService.allHassids().subscribe(data => {
      this.hassidoots = data;
    },
      err => {
      this.hassidoots = []
      });


    this.userFormGroup = this._formBuilder.group({
      email: ['', createValidatorEmail("מייל", 2, 30, this.emailPattern)],
      tz: ['', createValidatorText('תעודת זהות', 9, 9, /^[0-9]+$/)],
      phone: ['', createValidatorText('פלאפון', 10, 10, /^[0-9]+$/)],
      tel: ['', createValidatorText('טלפון', 7, 10, /^[0-9]+$/)],
      city: ['', Validators.required],
      firstName: ['', createValidatorText("שם פרטי", 2, 15)],
      lastName: ['', createValidatorText("שם משפחה", 2, 15)],
      address: ['', createValidatorText("כתובת", 2, 30)],
      brithday: ['', createValidatorBirthday('תאריך לידה')],
      age: [''],
      gender: ['']
    });
    /*  
    bodyStructure:string;
    height:number;
    colorHair:Color;
    beard:number;//זקן
    colorSkin:Color;//עור
    healthCondition:boolean;//מצב בריאותי */

    this.bodyStructureFormGroup = this._formBuilder.group({
      bodyStructure: ['', createValidatorText("תאור מבנה גוף", 2, 200)],
      height: ['', createValidatorNumber('גובה', 120, 210)],
      colorHair: ['', Validators.required],
      beard: [''],
      colorSkin: [''],
      healthCondition: [''],
    });

    // spiritualState:number;
    // isDrivingLicense:boolean;//רשיון נהיגה
    // skullcap:number;//כיפה
    // isComputer:boolean;
    // isInternet:boolean;
    // isSmoking:boolean;
    // torahInstitution:number;//מסגרת תורנית
    // nameInstitution:string;

    this.spiritualStateFormGroup = this._formBuilder.group({
      spiritualState: [''],
      isDrivingLicense: [''],
      skullcap: ['', Validators.required],
      isComputer: [''],
      isInternet: [''],
      isSmoking: [''],
      nameInstitution: ['', createValidatorText('שם מסגרת תורנית', 2, 20)]
    });


    // statusWork:number;
    // nameWork:string;
    // experience:number;
    // economicSituation:number;//מצב כלכלי כוכביות

    this.workFormGroup = this._formBuilder.group({
      statusWork: [''],
      nameWork: ['', createValidatorText('מקום עבודה', 2, 20)],
      experience: ['', createValidatorNumber('שנות וותק', 0, 50)],
      economicSituation: ['', createValidatorNumber('מצב כלכלי', 0, 5)]//מצב כלכלי כוכביות
    });


    // numChildren:number;
    // status:Status;//מצב משפחתי
    // isChildrenInHisCare:boolean;//ילדים בהחזקתו
    // community1:Community;//עדה
    // community2:Community;
    // hassidoot:Hassid;
    // recomends:Recomends;//ממליצים
    this.moreDetailsFormGroup = this._formBuilder.group({
      numChildren: ['', createValidatorNumber('מספר ילדים ', 0, 22)],
      status: ['', Validators.required],
      isChildrenInHisCare: [''],
      community1: ['', Validators.required],
      community2: [''],
      hassidoot: [''],
      recomends1: [''],
      recomends2: ['']
    });

    

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.userFormGroup.controls[controlName].hasError(errorName);
  }

  public hasError2 = (controlName: string, errorName: string) => {
    return this.bodyStructureFormGroup.controls[controlName].hasError(errorName);
  }

  public hasError3 = (controlName: string, errorName: string) => {
    return this.spiritualStateFormGroup.controls[controlName].hasError(errorName);
  }

  public hasError4 = (controlName: string, errorName: string) => {
    return this.workFormGroup.controls[controlName].hasError(errorName);
  }

  public hasError5 = (controlName: string, errorName: string) => {
    return this.moreDetailsFormGroup.controls[controlName].hasError(errorName);
  }


  addUser() {
    console.log(this.userFormGroup.controls);
  }

  addUserDetails() {
    this.userService.addUserDetails++;
  }
  changeAge() {
    this.age = new Date().getFullYear() - new Date(this.userFormGroup.controls['brithday'].value).getFullYear();
  }

}
