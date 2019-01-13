import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cities } from '../models/cities';

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
  return this.http.get(this.baseUrl+"getAllHasidoots");
  }

  login(values): Observable<any> {
    debugger;
    return this.http.post(this.baseUrl+"login",values);
  }

  loadCities():Observable<any>
  {
  return this.http.post(this.baseUrl+"loadCities",cities);
  }

  allCities():Observable<any>
  {
  return this.http.post(this.baseUrl+"loadCities",cities);
  }


}
