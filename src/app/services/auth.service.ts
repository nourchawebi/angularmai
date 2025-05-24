import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationResponss} from "../models/authentication-response";
import {AuthenticationRequest} from "../models/authentication-request";
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload:any;
  constructor( private http: HttpClient, private router: Router

  ) {
    this.userPayload = this.decodedToken();


  }
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private baseUrl : string ='http://localhost:8082/api/auth/login'
  login(authRequest:AuthenticationRequest)
  {
    return this.http.post<AuthenticationResponss>
    (`${this.baseUrl}`, authRequest)

  }
  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    // console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  createAuthorization() {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }


  private fullName$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  private user$ = new BehaviorSubject<any | null>(null);




  public getUser()
  {
    return this.user$.asObservable()}
  public setUser(user:any){
    this.user$.next(user);
  }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFirstNameFromStore(){
    return this.fullName$.asObservable();
  }


  public setFirstNameForStore(fullname:string){
    this.fullName$.next(fullname)
  }
  public setEmailForStore(email:string){
    this.fullName$.next(email)
  }
  public getEmailFromStore(){
    return this.email$.asObservable();
  }
  getLogedUser()
  {
    if(this.userPayload)

      return this.userPayload;
  }

}
