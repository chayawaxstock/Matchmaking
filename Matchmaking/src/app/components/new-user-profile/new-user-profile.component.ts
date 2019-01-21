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
  constructor(private _formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService
    , private router: Router) {
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

      this.user = this.userService.currentUser;
    if (this.userService.currentUser.isAdmin == true) {
      this.userService.currentUser = this.userService.helperUser;
    }


    if (this.userService.currentUser.community1.id == 4 || this.userService.currentUser.community2.id == 4)
      this.seeHassidoot = true;
    if (this.userService.currentUser.gender == 1)
      this.desplayMan = true;
    else this.desplayMan = false;
    this.selected = 1;

    if (this.userService.currentUser.recommends.length > 0)
      this.recomend1 = this.userService.currentUser.recommends[0];
    else this.userService.currentUser.recommends.push(new Recommend());
    if (this.userService.currentUser.recommends.length > 1)
      this.recomend2 = this.userService.currentUser.recommends[1];
    else this.userService.currentUser.recommends.push(new Recommend());
    if (this.userService.currentUser.recommends.length > 2)
      this.recomend3 = this.userService.currentUser.recommends[2];
    else this.userService.currentUser.recommends.push(new Recommend());


    this.userFormGroup = this._formBuilder.group({
      email: [this.userService.currentUser.email, createValidatorEmail("מייל", 2, 30, this.emailPattern)],
      phone: [this.userService.currentUser.phone, createValidatorText('פלאפון', 10, 10, /^[0-9]+$/)],
      tel: [this.userService.currentUser.tel, createValidatorText('טלפון', 7, 10, /^[0-9]+$/)],
      city: [this.userService.currentUser.city.id, Validators.required],
      firstName: [this.userService.currentUser.firstName, createValidatorText("שם פרטי", 2, 15)],
      lastName: [this.userService.currentUser.lastName, createValidatorText("שם משפחה", 2, 15)],
      address: [this.userService.currentUser.address, createValidatorText("כתובת", 2, 30)],
      brithday: [this.userService.currentUser.brithday, createValidatorBirthday('תאריך לידה')],
      age: [this.userService.currentUser.age],
      gender: [this.userService.currentUser.gender]
    });


    /*  
    bodyStructure:string;
    height:number;
    colorHair:Color;
    beard:number;//זקן
    colorSkin:Color;//עור
    healthCondition:boolean;//מצב בריאותי */

    this.bodyStructureFormGroup = this._formBuilder.group({
      bodyStructure: [this.userService.currentUser.bodyStructure.bodyStructureContent, createValidatorText("תאור מבנה גוף", 2, 200)],
      height: [this.userService.currentUser.bodyStructure.height, createValidatorNumber('גובה', 120, 210)],
      colorHair: [this.userService.currentUser.bodyStructure.colorHair.id, Validators.required],
      beard: [this.userService.currentUser.bodyStructure.beard],
      colorSkin: [this.userService.currentUser.bodyStructure.colorSkin.id],
      healthCondition: [this.userService.currentUser.bodyStructure.healthCondition],
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
      spiritualState: [this.userService.currentUser.spiritualState.spiritualStateInt],
      isDrivingLicense: [this.userService.currentUser.spiritualState.isDrivingLicense],
      skullcap: [this.userService.currentUser.spiritualState.skullcap, Validators.required],
      isComputer: [this.userService.currentUser.spiritualState.isComputer],
      isInternet: [this.userService.currentUser.spiritualState.isInternet],
      isSmoking: [this.userService.currentUser.spiritualState.isSmoking],
      nameInstitution: [this.userService.currentUser.spiritualState.nameInstitution, createValidatorText('שם מסגרת תורנית', 2, 20)]
    });


    // statusWork:number;
    // nameWork:string;
    // experience:number;
    // economicSituation:number;//מצב כלכלי כוכביות

    this.workFormGroup = this._formBuilder.group({
      statusWork: [this.userService.currentUser.work.statusWork],
      nameWork: [this.userService.currentUser.work.nameWork, createValidatorText('מקום עבודה', 2, 20)],
      experience: [this.userService.currentUser.work.experience, createValidatorNumberNotRequired('שנות וותק', 0, 50)],
      economicSituation: [this.userService.currentUser.work.economicSituation, createValidatorNumberNotRequired('מצב כלכלי', 0, 5)]//מצב כלכלי כוכביות
    });


    // hassidoot:Hassid;
    // recomends:Recomends;//ממליצים
    this.moreDetailsFormGroup = this._formBuilder.group({
      numChildren: [this.userService.currentUser.numChildren, createValidatorNumberNotRequired('מספר ילדים ', -1, 22)],
      status: [this.userService.currentUser.status.id, Validators.required],
      isChildrenInHisCare: [this.userService.currentUser.isChildrenInHisCare],
      community1: [this.userService.currentUser.community1.id, Validators.required],
      community2: [this.userService.currentUser.community2.id],
      hassidoot: [this.userService.currentUser.hassidoot],

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
    this.userService.currentUser.email = this.userFormGroup.controls['email'].value;
    this.userService.currentUser.phone = this.userFormGroup.controls['phone'].value;
    this.userService.currentUser.tel = this.userFormGroup.controls['tel'].value;
    this.userService.currentUser.city = new City();
    this.userService.currentUser.city.id = this.userFormGroup.controls['city'].value;
    this.userService.currentUser.firstName = this.userFormGroup.controls['firstName'].value;
    this.userService.currentUser.lastName = this.userFormGroup.controls['lastName'].value;
    this.userService.currentUser.address = this.userFormGroup.controls['address'].value;
    this.userService.currentUser.brithday = this.userFormGroup.controls['brithday'].value;
    this.userService.currentUser.age = this.userFormGroup.controls['age'].value;
    this.userService.currentUser.gender = this.userFormGroup.controls['gender'].value;
  }


  addUserDetails() {

    this.userService.currentUser.status = new Status();
    this.userService.currentUser.status.id = Number(this.moreDetailsFormGroup.controls['status'].value);
    this.userService.currentUser.numChildren = this.moreDetailsFormGroup.controls['numChildren'].value;
    this.userService.currentUser.isChildrenInHisCare = this.moreDetailsFormGroup.controls['isChildrenInHisCare'].value;
    this.userService.currentUser.community1 = new Community();
    this.userService.currentUser.community1.id = this.moreDetailsFormGroup.controls['community1'].value;
    this.userService.currentUser.community2 = new Community();
    this.userService.currentUser.community2.id = this.moreDetailsFormGroup.controls['community2'].value;
    this.userService.currentUser.hassidoot = this.moreDetailsFormGroup.controls['hassidoot'].value;
  }


  bodySAdd() {

    this.userService.currentUser.bodyStructure = this.bodyStructureFormGroup.value;
    this.userService.currentUser.bodyStructure.bodyStructureContent = this.bodyStructureFormGroup.controls['bodyStructure'].value;
    this.userService.currentUser.bodyStructure.colorHair = new Color();

    this.userService.currentUser.bodyStructure.colorHair.id = Number(this.bodyStructureFormGroup.controls['colorHair'].value);
    this.userService.currentUser.bodyStructure.colorSkin = new Color();
    this.userService.currentUser.bodyStructure.colorSkin.id = Number(this.bodyStructureFormGroup.controls['colorSkin'].value);
  }

  spiritualStateAdd() {
    this.userService.currentUser.spiritualState = this.spiritualStateFormGroup.value;
    this.userService.currentUser.spiritualState.spiritualStateInt = this.spiritualStateFormGroup.controls['spiritualState'].value;
  }

  workAdd() {
    this.userService.currentUser.work = this.workFormGroup.value;

  }

  add() {
    this.userService.addToUserDetails(this.userService.currentUser).subscribe(d => {
      this.toastr.success('הפרטים עדכנו בהצלחה', '', {
        timeOut: 2000
      });
      this.router.navigate(['/preferences'])
    }, err => {
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
    this.userService.currentUser.recommends = [];
    this.userService.currentUser.recommends.push(this.recomend1);
    this.userService.currentUser.recommends.push(this.recomend2);
    this.userService.currentUser.recommends.push(this.recomend3);
  }

  addManager() {
    this.userService.addToUserDetails(this.userService.currentUser).subscribe(d => {
      this.userService.currentUser=this.user;
      this.toastr.success('הפרטים עדכנו בהצלחה', '', {
        timeOut: 2000
      });
      this.router.navigate(['/admin'])
    }, err => {
      this.toastr.error('עדכון הפרטים נכשל', '', {
        timeOut: 2000
      });
    })
  }

}
