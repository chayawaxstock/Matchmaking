import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { cities } from '../models/cities';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 
  matchSubject:Subject<User[]>=new Subject<User[]>();
  logOut:Subject<boolean>=new Subject();
  baseUrl:string="http://localhost:65448/api/";
  users:User[];
  addUserDetails:number=0;
  newUser:User;
  currentUser: User;
  helperUser: User;
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
    return this.http.post(this.baseUrl+"login",values);
  }

  loginByPassword(pass:string): Observable<any> {
    return this.http.post(this.baseUrl+"loginByPassword",pass);
  }

  loadCities():Observable<any>
  {
  return this.http.post(this.baseUrl+"loadCities",cities);
  }

  allCities():Observable<any>
  {
  return this.http.get(this.baseUrl+"getAllCityies");
  }
  getMan(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+"getAllMan");
  }

  getFeman(): Observable<User[]>  {
    return this.http.get<User[]>(this.baseUrl+"getAllFeman");
  }

  getMatch(user:User): Observable<User[]> {
    return this.http.post<User[]>(this.baseUrl+"getMatch",user);
  }

}
