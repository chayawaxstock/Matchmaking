import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createValidatorText, createValidatorBirthday, createValidatorEmail, createValidatorNumber, createValidatorNumberNotRequired } from 'src/app/shared/validators/user-validators';
import { UserService } from 'src/app/shared/services/user.service';
import { Hassid } from 'src/app/shared/models/hassid';
import { Recommend } from 'src/app/shared/models/recommend';
import { User } from 'src/app/shared/models/user';
import { City } from 'src/app/shared/models/city';
import { Color } from 'src/app/shared/models/color';

@Component({
  selector: 'app-new-user-profile',
  templateUrl: './new-user-profile.component.html',
  styleUrls: ['./new-user-profile.component.scss']
})
export class NewUserProfileComponent implements OnInit {

  isLinear = false;
  user:User;
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
  recomends:Recommend[]=[new Recommend(),new Recommend(),new Recommend()];
  addUserNum: any;
  selected: number;

  constructor(private _formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
  
    this.userService.allHassids().subscribe(data => {
      debugger;
      this.hassidoots = data;
    },
      err => {
      this.hassidoots = []
      });

    this.user= JSON.parse(localStorage.getItem('user'));

    this.selected=1;

    this.userFormGroup = this._formBuilder.group({
      email: [this.user.email, createValidatorEmail("מייל", 2, 30, this.emailPattern)],
      tz: [this.user.tz, createValidatorText('תעודת זהות', 9, 9, /^[0-9]+$/)],
      phone: [this.user.phone, createValidatorText('פלאפון', 10, 10, /^[0-9]+$/)],
      tel: [this.user.tel, createValidatorText('טלפון', 7, 10, /^[0-9]+$/)],
      city: [this.user.city.id, Validators.required],
      firstName: [this.user.firstName, createValidatorText("שם פרטי", 2, 15)],
      lastName: [this.user.lastName, createValidatorText("שם משפחה", 2, 15)],
      address: [this.user.address, createValidatorText("כתובת", 2, 30)],
      brithday: [this.user.brithday, createValidatorBirthday('תאריך לידה')],
      age: [this.user.age],
      gender: [this.user.gender]
    });
    /*  
    bodyStructure:string;
    height:number;
    colorHair:Color;
    beard:number;//זקן
    colorSkin:Color;//עור
    healthCondition:boolean;//מצב בריאותי */

    this.bodyStructureFormGroup = this._formBuilder.group({
      bodyStructure: [this.user.bodyStructure.bodyStructure, createValidatorText("תאור מבנה גוף", 2, 200)],
      height: [this.user.bodyStructure.height, createValidatorNumber('גובה', 120, 210)],
      colorHair: [this.user.bodyStructure.colorHair.id, Validators.required],
      beard: [this.user.bodyStructure.beard],
      colorSkin: [this.user.bodyStructure.colorSkin.id],
      healthCondition: [this.user.bodyStructure.healthCondition.valueOf()],
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
      spiritualState: [this.user.spiritualState.spiritualState],
      isDrivingLicense: [this.user.spiritualState.isDrivingLicense],
      skullcap: [this.user.spiritualState.skullcap, Validators.required],
      isComputer: [this.user.spiritualState.isComputer],
      isInternet: [this.user.spiritualState.isInternet],
      isSmoking: [this.user.spiritualState.isSmoking],
      nameInstitution: [this.user.spiritualState.nameInstitution, createValidatorText('שם מסגרת תורנית', 2, 20)]
    });


    // statusWork:number;
    // nameWork:string;
    // experience:number;
    // economicSituation:number;//מצב כלכלי כוכביות

    this.workFormGroup = this._formBuilder.group({
      statusWork: [this.user.work.statusWork],
      nameWork: [this.user.work.nameWork, createValidatorText('מקום עבודה', 2, 20)],
      experience: [this.user.work.experience, createValidatorNumberNotRequired('שנות וותק', 0, 50)],
      economicSituation: [this.user.work.economicSituation, createValidatorNumberNotRequired('מצב כלכלי', 0, 5)]//מצב כלכלי כוכביות
    });
    

    // hassidoot:Hassid;
    // recomends:Recomends;//ממליצים
    this.moreDetailsFormGroup = this._formBuilder.group({
      numChildren: [this.user.numChildren, createValidatorNumberNotRequired('מספר ילדים ', -1, 22)],
      status: [this.user.numChildren, Validators.required],
      isChildrenInHisCare: [this.user.numChildren],
      community1: [this.user.community1, Validators.required],
      community2: [this.user.community2],
      hassidoot: [this.user.hassidoot],
   
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
  addUser1()
  {
    this.user.tz=this.userFormGroup.controls['tz'].value;
    this.user.email=this.userFormGroup.controls['email'].value;
    this.user.phone=this.userFormGroup.controls['phone'].value;
    this.user.tel=this.userFormGroup.controls['tel'].value;
    this.user.city=new City();
    this.user.city.id=this.userFormGroup.controls['city'].value;
    this.user.firstName=this.userFormGroup.controls['firstName'].value;
    this.user.lastName=this.userFormGroup.controls['lastName'].value;
    this.user.address=this.userFormGroup.controls['address'].value;
    this.user.brithday=this.userFormGroup.controls['brithday'].value;
    this.user.age=this.userFormGroup.controls['age'].value;
    this.user.gender=this.userFormGroup.controls['gender'].value;

    localStorage.removeItem('user');
    localStorage.setItem('user',JSON.stringify(this.user));
  }

  // addUser() {
  //   console.log(this.userFormGroup.controls);
  // }

  addUserDetails() {
    this.user.numChildren=this.moreDetailsFormGroup.controls['numChildren'].value;
    this.user.isChildrenInHisCare=this.moreDetailsFormGroup.controls['isChildrenInHisCare'].value;
    this.user.community1=this.moreDetailsFormGroup.controls['community1'].value;
    this.user.community2=this.moreDetailsFormGroup.controls['community2'].value;
    this.user.hassidoot=this.moreDetailsFormGroup.controls['hassidoot'].value;
   // this.user.recomends.push(this.moreDetailsFormGroup.controls['recomends1'].value);
   // this.user.recomends.push(this.moreDetailsFormGroup.controls['recomends2'].value);

   localStorage.removeItem('user');
   localStorage.setItem('user',JSON.stringify(this.user));
  }

  addRecomends()
  {
    this.user.recomends=this.recomends;
  }

  bodySAdd()
  {
   this.user.bodyStructure=this.bodyStructureFormGroup.value;
   this.user.bodyStructure.colorHair=new Color();
   debugger;
   this.user.bodyStructure.colorHair.id= Number(this.bodyStructureFormGroup.controls['colorHair'].value);
   this.user.bodyStructure.colorSkin.id=Number(this.bodyStructureFormGroup.controls['colorSkin'].value);
   localStorage.removeItem('user');
   localStorage.setItem('user',JSON.stringify(this.user));
  }

  spiritualStateAdd()
  {
    this.user.spiritualState=this.spiritualStateFormGroup.value;

    localStorage.removeItem('user');
    localStorage.setItem('user',JSON.stringify(this.user));
  }

  workAdd()
  {
   this.user.work=this.workFormGroup.value;

   localStorage.removeItem('user');
   localStorage.setItem('user',JSON.stringify(this.user));
  }

  changeAge() {
    this.age = new Date().getFullYear() - new Date(this.userFormGroup.controls['brithday'].value).getFullYear();
  }

  add()
  {
    this.userService.addToUserDetails(this.user).subscribe(d=>{
      alert("succ");
    })
  }

}
