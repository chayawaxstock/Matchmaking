import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { createValidatorEmail, createValidatorText, createValidatorBirthday, createValidatorNumber } from 'src/app/shared/validators/user-validators';
import { Preference } from 'src/app/shared/models/preference';

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
    maxLimit: 100
  };

  constructor(private _formBuilder: FormBuilder, private userService: UserService,private toastr: ToastrService
    ,private router:Router) {
 
  }
  ngOnInit() {

   
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
    if(this.userService.user.preference==null||this.userService.user.preference==undefined)
    {
      this.userService.user.preference=new Preference();
      this.userService.user.preference.fromAge=18;
      this.userService.user.preference.tillAge=100;
    }
    this.preferenceFormGroup = this._formBuilder.group({
      sliderControl: [[this.userService.user.preference.fromAge, this.userService.user.preference.tillAge]],
      skinColor:[this.userService.user.preference.skinColor],
      healthCondition:[this.userService.user.preference.healthCondition],
      spiritualStateInt:[this.userService.user.preference.spiritualStateInt],
      isDrivingLicense:[this.userService.user.preference.isDrivingLicense],
      isComputer:[this.userService.user.preference.isComputer],
      isSmoking:[this.userService.user.preference.isSmoking],
      isInternet:[this.userService.user.preference.isInternet],
      economicSituation:[this.userService.user.preference.economicSituation]
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

    this.userService.user.preference=this.preferenceFormGroup.value;
    this.userService.user.preference.fromAge=this.preferenceFormGroup.value.sliderControl[0];
    this.userService.user.preference.tillAge=this.preferenceFormGroup.value.sliderControl[1];

    this.userService.addToUserDetails(this.userService.user).subscribe(d => {
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

}
