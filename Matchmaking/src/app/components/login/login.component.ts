import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createValidatorText, createValidatorEmail } from 'src/app/shared/validators/user-validators';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  login() {
    this.userService.login(this.loginFormGroup.value).subscribe(data => {

      localStorage.setItem('user', JSON.stringify(data['password']));
      this.userService.currentUser=data;
      this.showSuccess(data['userName']);
      this.userService.logOut.next(true);
      if (data['isAdmin'] == true)
        this.router.navigate(['admin']);
      else this.router.navigate(['profile']);
    }, err => {
      this.showError();
    });
  }

  showSuccess(userName: string) {
    this.toastr.success('שלום ל' + userName, '', {
      timeOut: 2000
    });
  }

  showError() {
    this.toastr.error('שם משתמש או סיסמה לא תקינים', 'נכשל', {
      timeOut: 3000
    });
  }



}
