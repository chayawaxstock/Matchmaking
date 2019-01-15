import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { createValidatorText, createValidatorBirthday, createValidatorEmail, createValidatorNumber, createValidatorNumberNotRequired } from 'src/app/shared/validators/user-validators';
import { UserService } from 'src/app/shared/services/user.service';
import { Hassid } from 'src/app/shared/models/hassid';
import { Recommend } from 'src/app/shared/models/recommend';
import { User } from 'src/app/shared/models/user';
import { City } from 'src/app/shared/models/city';
import { Color } from 'src/app/shared/models/color';
import { Status } from 'src/app/shared/models/status';
import { Community } from 'src/app/shared/models/community';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new-user-profile',
  templateUrl: './new-user-profile.component.html',
  styleUrls: ['./new-user-profile.component.scss']
})
export class NewUserProfileComponent implements OnInit {

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
  constructor(private _formBuilder: FormBuilder, private userService: UserService,private toastr: ToastrService
    ,private router:Router) {
    this.recomend1 = new Recommend();
    this.recomend2 = new Recommend();
    this.recomend3 = new Recommend();
  }

  ngOnInit() {

    this.userService.allHassids().subscribe(data => {
      console.log(data);
      this.hassidoots = data;
    },
      err => {
        this.hassidoots = []
      });

    this.userService.allCities().subscribe(data => {
      this.cities = data;
    },
      err => {
        this.cities = []
      });


    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.community1.id == 4 || this.user.community2.id == 4)
      this.seeHassidoot = true;
    if (this.user.gender == 1)
      this.desplayMan = true;
    else this.desplayMan = false;
    this.selected = 1;

    if (this.user.recommends.length > 0)
      this.recomend1 = this.user.recommends[0];
    else this.user.recommends.push(new Recommend());
    if (this.user.recommends.length > 1)
      this.recomend2 = this.user.recommends[1];
    else this.user.recommends.push(new Recommend());
    if (this.user.recommends.length > 2)
      this.recomend3 = this.user.recommends[2];
    else this.user.recommends.push(new Recommend());


    this.userFormGroup = this._formBuilder.group({
      email: [this.user.email, createValidatorEmail("מייל", 2, 30, this.emailPattern)],
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
      bodyStructure: [this.user.bodyStructure.bodyStructureContent, createValidatorText("תאור מבנה גוף", 2, 200)],
      height: [this.user.bodyStructure.height, createValidatorNumber('גובה', 120, 210)],
      colorHair: [this.user.bodyStructure.colorHair.id, Validators.required],
      beard: [this.user.bodyStructure.beard],
      colorSkin: [this.user.bodyStructure.colorSkin.id],
      healthCondition: [this.user.bodyStructure.healthCondition],
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
      spiritualState: [this.user.spiritualState.spiritualStateInt],
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
      status: [this.user.status.id, Validators.required],
      isChildrenInHisCare: [this.user.isChildrenInHisCare],
      community1: [this.user.community1.id, Validators.required],
      community2: [this.user.community2.id],
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
  addUser1() {
    this.user.email = this.userFormGroup.controls['email'].value;
    this.user.phone = this.userFormGroup.controls['phone'].value;
    this.user.tel = this.userFormGroup.controls['tel'].value;
    this.user.city = new City();
    this.user.city.id = this.userFormGroup.controls['city'].value;
    this.user.firstName = this.userFormGroup.controls['firstName'].value;
    this.user.lastName = this.userFormGroup.controls['lastName'].value;
    this.user.address = this.userFormGroup.controls['address'].value;
    this.user.brithday = this.userFormGroup.controls['brithday'].value;
    this.user.age = this.userFormGroup.controls['age'].value;
    this.user.gender = this.userFormGroup.controls['gender'].value;

    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  // addUser() {
  //   console.log(this.userFormGroup.controls);
  // }

  addUserDetails() {

    this.user.status=new Status();
    this.user.status.id=Number(this.moreDetailsFormGroup.controls['status'].value);
    this.user.numChildren = this.moreDetailsFormGroup.controls['numChildren'].value;
    this.user.isChildrenInHisCare = this.moreDetailsFormGroup.controls['isChildrenInHisCare'].value;
    this.user.community1=new Community();
    this.user.community1.id = this.moreDetailsFormGroup.controls['community1'].value;
    this.user.community2=new Community();
    this.user.community2.id = this.moreDetailsFormGroup.controls['community2'].value;
    this.user.hassidoot = this.moreDetailsFormGroup.controls['hassidoot'].value;
    // this.user.recomends.push(this.moreDetailsFormGroup.controls['recomends1'].value);
    // this.user.recomends.push(this.moreDetailsFormGroup.controls['recomends2'].value);

    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(this.user));
  }


  bodySAdd() {
 
    this.user.bodyStructure = this.bodyStructureFormGroup.value;
    this.user.bodyStructure.bodyStructureContent=this.bodyStructureFormGroup.controls['bodyStructure'].value;
    this.user.bodyStructure.colorHair = new Color();
  
    this.user.bodyStructure.colorHair.id = Number(this.bodyStructureFormGroup.controls['colorHair'].value);
    this.user.bodyStructure.colorSkin=new Color();
    this.user.bodyStructure.colorSkin.id = Number(this.bodyStructureFormGroup.controls['colorSkin'].value);

    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  spiritualStateAdd() {
    this.user.spiritualState = this.spiritualStateFormGroup.value;
    this.user.spiritualState.spiritualStateInt=this.spiritualStateFormGroup.controls['spiritualState'].value;

    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  workAdd() {
    this.user.work = this.workFormGroup.value;

    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  changeAge() {
    this.age = new Date().getFullYear() - new Date(this.userFormGroup.controls['brithday'].value).getFullYear();
  }

  add() {
    this.userService.addToUserDetails(this.user).subscribe(d => {
      this.userService.user=this.user;
      this.toastr.success('הפרטים עדכנו בהצלחה', '', {
        timeOut: 2000
      });
      this.router.navigate(['/preferences'])
    },err=>{
      this.toastr.error('עדכון הפרטים נכשל', '', {
        timeOut: 2000
      });
    })
  }

  changeGender(num: number) {

    if (num == 2) {
      this.desplayMan = false;
      this.desplayFaman = true;
    }
    else {
      this.desplayFaman = false;
      this.desplayMan = true;
    }
  }

  changeStatus() {
  
    if (this.moreDetailsFormGroup.controls['status'].value != 1) {
      this.seenumChildren = true;
    }
    else this.seenumChildren = false;
  }

  selectCommunity() {
    if (this.moreDetailsFormGroup.controls['community1'].value == 4 || this.moreDetailsFormGroup.controls['community2'].value == 4) {
      this.seeHassidoot = true;
    }
    else this.seeHassidoot = false;
  }

  addRec() {
    this.user.recommends =[];
    this.user.recommends.push(this.recomend1);
    this.user.recommends.push(this.recomend2);
    this.user.recommends.push(this.recomend3);
  }

}
