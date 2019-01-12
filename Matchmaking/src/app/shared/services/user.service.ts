import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  
  baseUrl:string="http://localhost:65448/api/";
  users:User[];
  addUserDetails:number=0;
  newUser:User;
  constructor(public http:HttpClient) { }


  addToUserDetails(user:User):Observable<any>
  {
    return this.http.post(this.baseUrl+"updateUser",user);
  }

  allHassids():Observable<any>
  {
  return this.http.get(this.baseUrl+"allHassids");
  }

  login(values): Observable<any> {
    debugger;
    return this.http.post(this.baseUrl+"login",values);
  }


}
