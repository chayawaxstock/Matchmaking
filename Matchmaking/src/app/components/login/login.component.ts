import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createValidatorText, createValidatorEmail } from 'src/app/shared/validators/user-validators';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: any;

  constructor(public _formBuilder:FormBuilder,public userService:UserService ) { }

  ngOnInit() {
    debugger;
    this.userService.lll().subscribe(d=>{
debugger;
    })
    this.loginFormGroup = this._formBuilder.group({
      userName: ['', createValidatorText(' שם משתמש', 2, 20)],
      password: ['', createValidatorText(' סיסמה', 4, 50)],
    });
  
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginFormGroup.controls[controlName].hasError(errorName);
  }

  login()
  {
  this.userService.login(this.loginFormGroup.value).subscribe();
  }

  
 
}
