import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  baseUrl:string="localhost:8000/";
  users:User[];
  addUserDetails:number=0;
  newUser:User;
  constructor(public http:HttpClient) { }

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

  allHassids():Observable<any>
  {
  return this.http.get(this.baseUrl+"allHassids");
  }

  lll():Observable<any> 
  {
    return this.http.post('http://localhost:8000/test',{});
  }

  login(values): Observable<any> {
    debugger;
    return this.http.post(this.baseUrl+"login",values);
  }


}
