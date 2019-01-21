import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor( public router: Router,private userService:UserService) {}

  canActivate(): boolean {
    if (!this.userService.currentUser) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}