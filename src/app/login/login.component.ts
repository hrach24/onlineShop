import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ILoginForm } from "../core/interfaces/sign-up.interface";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { IUserInterface, IUserLoginInterFace } from "../core/interfaces/user.interface";
import { MessageService } from 'primeng/api';
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public wrongPassword: boolean
  public loginForm: FormGroup<ILoginForm> = new FormGroup<ILoginForm>(<ILoginForm>{
    email: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
    password: new FormControl('', Validators.required),
  })
  public makeInputBorderNotVisiable:boolean =  false;
  public users: any[];
  public emailSucceed: boolean = false;
  public userEmail: string | undefined;
  public currentUser: IUserLoginInterFace;

  constructor(
    private ref: DynamicDialogRef,
    public userService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private usersService: UserService,
  ) {}

  ngOnInit() :void {
    this.usersService.getUsersEmail().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error:(err) => {
        this.router.navigate([ '/error' ]).then();
      }
    })
  }

  // public openSignUpPopUp(): void{
  //   this.ref.close(true);
  // }

  public makeBorderNotVisible() :void {
      this.makeInputBorderNotVisiable = true;
  }

  public continueButtonClick() :void {
    this.currentUser = this.users.find((user): boolean => this.loginForm.value.email === user.email);
    if (this.currentUser){
      this.emailSucceed = true;
      this.userEmail = this.currentUser.email;
    }
  }

  public logInButtonClick() :void {
    if (this.loginForm.value.password === this.currentUser.password) {
      this.userService.settingTrueVal(true, this.currentUser);
      this.ref.close();

      if (this.currentUser.name && this.currentUser.surname){
        let firstLetterUpperCaseUserName: string = this.currentUser.name[0]!.toUpperCase() + this.currentUser.name.slice(1);
        let firstLetterUpperCaseUserSurname: string = this.currentUser.surname[0].toUpperCase() + this.currentUser.surname.slice(1);
        this.messageService.add({ severity: 'success', summary: 'Welcome Back !', detail:  firstLetterUpperCaseUserName +  " " + firstLetterUpperCaseUserSurname });

      }

    }else{
      this.wrongPassword = true;

    }
  }
}
