import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AuthenticationRequest} from "../models/authentication-request";
import {AuthenticationResponss} from "../models/authentication-response";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  authForm: FormGroup;

  authRequest: AuthenticationRequest= {}; // empty object
  authResponse: AuthenticationResponss={};

  constructor(private authService: AuthService,
              private router:Router,   // private toast: NgToastService,

              private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password:['', Validators.required]
    });

  }

  sendveriftoken:boolean=false;
  error:string='';
  message:any='';
  forgotpassword:boolean=false;
  authenticate(){
    this.authRequest.username = this.authForm.get('username')?.value;
    this.authRequest.password = this.authForm.get('password')?.value;
    this.authService.login(this. authRequest).
    subscribe(
      {
        next:(response)=>{
          this.authResponse=response;

          localStorage.setItem('token',response.accessToken as string);
          this.error ="";
          const tokenPayload = this.authService.decodedToken();
          this.authService.setFirstNameForStore(tokenPayload.name);
          this.authService.setRoleForStore(tokenPayload.role);
          this.authService.setUser(tokenPayload);
          this.authService.setEmailForStore(tokenPayload.email);
          this.message="u will redirected to welcome page"
          // this.toast.success({detail:"SUCCESS", summary:response.accessToken, duration: 5000});
          const role="USER"
          if(role=='USER')
          {
            this.router.navigate(['acceuil'])}


          else {
            this.router.navigate(['admin'])}



        },
        error: (error) => {
          if (error.status === 404) {
            this.error=error.error;

          }else
          if(error.status===403)
          {
            if (error.error === 'User disabled and token expired') {
              this.message="";
              this.error = 'User disabled and token expired';
              this.sendveriftoken=true;

            } else if (error.error === 'User disabled') {
              this.message="";
              this.error = 'User disabled';
            }} else {
            this.message="";
            this.error = 'Bad credentials';
          }
          console.error(error);
        }

      }
    )
  }




}
