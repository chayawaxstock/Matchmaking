import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { createValidatorText, createValidatorBirthday, createValidatorEmail } from 'src/app/shared/validators/user-validators';

@Component({
  selector: 'app-new-user-profile',
  templateUrl: './new-user-profile.component.html',
  styleUrls: ['./new-user-profile.component.scss']
})
export class NewUserProfileComponent implements OnInit {

  isLinear = false;
  age:number=0;
  userFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  bodyStructureFormGroup: FormGroup;
  
  constructor(private _formBuilder: FormBuilder) {}
 
  ngOnInit() {

    this.userFormGroup = this._formBuilder.group({
      email:['',createValidatorEmail("מייל", 2, 30,this.emailPattern)],
      tz:['',createValidatorText('תעודת זהות',9,9,/^[0-9]+$/)],
      phone:['',createValidatorText('פלאפון',10,10,/^[0-9]+$/)],
      tel:['',createValidatorText('טלפון',7,10,/^[0-9]+$/)],
      city:['',Validators.required],
      firstName:['',createValidatorText("שם פרטי", 2, 15)],
      lastName:['',createValidatorText("שם משפחה", 2, 15)],
      address:['',createValidatorText("כתובת", 2, 30)],
      brithday:['',createValidatorBirthday('תאריך לידה')],
      age:[''],
      gender:['']
    });
    /*  
    bodyStructure:string;
    height:number;
    colorHair:Color;
    beard:number;//זקן
    colorSkin:Color;
    healthCondition:boolean;//מצב בריאותי */

    this.bodyStructureFormGroup = this._formBuilder.group({
      email:['',createValidatorEmail("מייל", 2, 30,this.emailPattern)],
      tz:['',createValidatorText('תעודת זהות',9,9,/^[0-9]+$/)],
      phone:['',createValidatorText('פלאפון',10,10,/^[0-9]+$/)],
      tel:['',createValidatorText('טלפון',7,10,/^[0-9]+$/)],
      city:['',Validators.required],
      firstName:['',createValidatorText("שם פרטי", 2, 15)],
      lastName:['',createValidatorText("שם משפחה", 2, 15)],
      address:['',createValidatorText("כתובת", 2, 30)],
      brithday:['',createValidatorBirthday('תאריך לידה')],
      age:[''],
      gender:['']
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.userFormGroup.controls[controlName].hasError(errorName);
  }

  addUser()
  {
    console.log(this.userFormGroup.controls);
  }
  changeAge()
  {

    this.age=new Date().getFullYear()-new Date(  this.userFormGroup.controls['brithday'].value).getFullYear();
  }

}
