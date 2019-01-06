import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users:User[];
  addUserDetails:number=0;
  newUser:User;
  constructor() { }

  addNewUser()
  {
    if(this.addUserDetails==4)
    {
    this.users.push(this.newUser);
    this.addUserDetails=0;
    }
    
  }

  addToUserDetails()
  {
    this.addUserDetails++;
  }


}
