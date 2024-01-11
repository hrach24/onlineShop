import {  Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { of, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [ DialogService ],
})

export class HeaderComponent implements OnInit {
  public value: string | undefined;
  public countries: any[] | undefined;
  public selectedCountry: any;
  public ref: DynamicDialogRef | undefined;
  public isAuth: any;
  public loggedInUser: any
  public users: any

  constructor(public dialogService: DialogService, public loginService: AuthService, public http: HttpClient) {}

  ngOnInit(): void {
    this.localStorageValueChange();
    this.selectedCountry = { name: 'EN', code: 'EN', flag_path: 'assets/images/languages/en.png' }
    this.countries = [
      { name: 'EN', code: 'EN', flag_path: 'assets/images/languages/en.png' },
      { name: 'RU', code: 'RU', flag_path: 'assets/images/languages/ru.png' },
      { name: 'FA', code: 'FA', flag_path: 'assets/images/languages/fa.png' },
    ];
    this.loginService.isAuth.subscribe(data => {
      this.isAuth = data;
    })
  }





  public loginShow(): void {
    this.ref = this.dialogService.open(LoginComponent, {
      header: 'Log In',
      modal: true,
    });

    this.ref.onClose
      .pipe(take(1))
      .subscribe({
        next: res => {
          if (res){
            this.signUpShow();

          }
        }
      })
  }

  public signUpShow(): void {
    this.ref = this.dialogService.open(SignUpComponent, {
      header: 'Sign-Up',
      width: '50%',
      modal: true,
    })
    this.ref.onClose
      .pipe(take(1))
      .subscribe({
        next: res => {
          if (res){
            this.loginShow();

          }
        }
      })
  }


  public localStorageValueChange(){
    const userFromStorage = JSON.parse(localStorage.getItem('isAuth') || 'null');
    if (userFromStorage){
      this.http.get('http://localhost:3000/users').subscribe((res) => {
        this.users = res;
        let found  = this.users.find((arr: any) => {
          if(
            arr.name === userFromStorage.name &&
            arr.surname === userFromStorage.surname &&
            arr.email === userFromStorage.email &&
            arr.password === userFromStorage.password &&
            arr.role === userFromStorage.role &&
            arr.id === userFromStorage.id
          ){
            return arr
          }
        })

        if (found){
          this.isAuth = userFromStorage;

        }else{
          localStorage.clear();

        }
      })
    }else{
      localStorage.clear();

    }
  }

}
