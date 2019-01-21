import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { createValidatorEmail, createValidatorText, createValidatorBirthday, createValidatorNumber } from 'src/app/shared/validators/user-validators';
import { Preference } from 'src/app/shared/models/preference';
import { Community } from 'src/app/shared/models/community';
import { Color } from 'src/app/shared/models/color';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {
  preferenceFormGroup: any;

  minValue: number = 18;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    minLimit: 18,
    maxLimit: 100,
    noSwitching: true,
    showTicks: true
  };
  seeHassidoot: boolean;
  hassidoots: any;

  constructor(private _formBuilder: FormBuilder, private userService: UserService,private toastr: ToastrService
    ,private router:Router) {
 
  }
  ngOnInit() {

    this.userService.allHassids().subscribe(data => {
      console.log(data);
      this.hassidoots = data;
    },
      err => {
        this.hassidoots = []
      });
   
    // communities:Community[]=[];
    // hassidoots:Hassid[]=[];
    // skinColor:Color;
    // statuses:Status[]=[];
    // healthCondition:boolean;
    // spiritualStateInt:number;
    // isDrivingLicense:boolean;
    // isComputer:boolean;
    // isSmoking:boolean;
    // isInternet:boolean;
    // economicSituation:number;//מצב כלכלי
    if(this.userService.currentUser.preference==null||this.userService.currentUser.preference==undefined)
    {
      this.userService.currentUser.preference=new Preference();
      this.userService.currentUser.preference.fromAge=18;
      this.userService.currentUser.preference.tillAge=100;
    }
    this.preferenceFormGroup = this._formBuilder.group({
      sliderControl: [[this.userService.currentUser.preference.fromAge, this.userService.currentUser.preference.tillAge]],
      statuses:[[]],
      communities:[[]],
      hassidoots:[[]],
      skinColor:[this.userService.currentUser.preference.skinColor],
      healthCondition:[this.userService.currentUser.preference.healthCondition],
      spiritualStateInt:[this.userService.currentUser.preference.spiritualStateInt],
      isDrivingLicense:[this.userService.currentUser.preference.isDrivingLicense],
      isComputer:[this.userService.currentUser.preference.isComputer],
      isSmoking:[this.userService.currentUser.preference.isSmoking],
      isInternet:[this.userService.currentUser.preference.isInternet],
      economicSituation:[this.userService.currentUser.preference.economicSituation]
    });
  }

  add()
  {

    // communities:Community[]=[];
    // hassidoots:Hassid[]=[];
    // skinColor:Color;
    // statuses:Status[]=[];
    // healthCondition:boolean;
    // spiritualStateInt:number;
    // isDrivingLicense:boolean;
    // isComputer:boolean;
    // isSmoking:boolean;
    // isInternet:boolean;
    // economicSituation:number;//מצב כלכלי

    this.userService.currentUser.preference=this.preferenceFormGroup.value;
    this.userService.currentUser.preference.fromAge=this.preferenceFormGroup.value.sliderControl[0];
    this.userService.currentUser.preference.tillAge=this.preferenceFormGroup.value.sliderControl[1];
    this.userService.currentUser.preference.skinColor=new Color();
    this.userService.currentUser.preference.skinColor.id=this.preferenceFormGroup.controls['skinColor'].value
    this.userService.currentUser.preference.statuses=[];
    this.userService.currentUser.preference.communities=[];
    this.userService.currentUser.preference.hassidoots=[];

    this.preferenceFormGroup.controls['communities'].value.forEach(element => {
      let com={id:element,CommunityName:''};
      this.userService.currentUser.preference.communities.push(com);
    });

    this.preferenceFormGroup.controls['statuses'].value.forEach(element => {
      let com={id:element,status:''};
      this.userService.currentUser.preference.statuses.push(com);
    });

    this.preferenceFormGroup.controls['hassidoots'].value.forEach(element => {
      let com={id:element,HassidootName:''};
      this.userService.currentUser.preference.hassidoots.push(com);
    });

    this.userService.addToUserDetails(this.userService.currentUser).subscribe(d => {
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

  selectCommunity() {
    let d=false;
    this.preferenceFormGroup.controls['communities'].value.forEach(element => {
      if(element==4)
      {
        this.seeHassidoot = true;
        d=true;
      } 
    });
  if(d==false)
    this.seeHassidoot = false;
  }

  returnProfile()
  {
    this.router.navigate(['/profile'])
  }

}
