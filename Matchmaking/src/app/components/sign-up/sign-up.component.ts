import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { createValidatorText } from 'src/app/shared/validators/user-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  loginFormGroup: any;

  constructor(private toastr: ToastrService,
    public _formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router) { }

  ngOnInit() {

    this.loginFormGroup = this._formBuilder.group({
      userName: ['', createValidatorText('שם משתמש', 2, 40)],
      password: ['', createValidatorText(' סיסמה', 4, 50)],
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginFormGroup.controls[controlName].hasError(errorName);
  }

  sinup()
  {

  }

}
