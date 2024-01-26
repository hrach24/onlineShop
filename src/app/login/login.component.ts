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
  public eyeShow:boolean;
  public wrongPassword: boolean
  public inputType: string = 'password';
  private getAllUsers: IUserInterface[];
  public loginForm: FormGroup<ILoginForm> = new FormGroup<ILoginForm>(<ILoginForm>{
    email: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
    password: new FormControl('', Validators.required),
  })
  public makeInputBorderNotVisiable:boolean =  false;
  public users: any[];
  public emailSucceed: boolean = false;
  public userEmail: string | undefined
  public currentUser: IUserLoginInterFace

  constructor(
    private ref: DynamicDialogRef,
    private http: HttpClient,
    public userService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private usersService: UserService
  ) {}

  ngOnInit() {
    this.usersService.getUsersEmail().subscribe({
      next: (res: any) => {
        console.log(res)
        this.users = res
      },
      error:(err) => {
        this.router.navigate([ '/error' ]).then()
      }
    })
  }

  public showHide(): void {
    if (this.eyeShow) {
      this.eyeShow = false;
      this.inputType = 'text';

    } else {
      this.eyeShow = true;
      this.inputType = 'password';
    }
  }

  public openSignUpPopUp(): void{
    this.ref.close(true);
  }

  public submit(): void{
    if (!this.loginForm.invalid) {
      this.http.get<IUserInterface[]>('http://localhost:3000/users')
        .subscribe({
          next: (res: IUserInterface[]) => {
            this.getAllUsers = res;
            let loggedInUser:IUserInterface | undefined = this.getAllUsers.find((user: any) =>  {
              if (user.email === this.loginForm.value.email && user.password === this.loginForm.value.password){
                return user

              }
            });
            if (loggedInUser){
              this.userService.settingTrueVal(true, loggedInUser);
              this.ref.close();
              let firstLetterUpperCaseUserName = loggedInUser.name[0].toUpperCase() + loggedInUser.name.slice(1)
              let firstLetterUpperCaseUserSurname = loggedInUser.surname[0].toUpperCase() + loggedInUser.surname.slice(1)
              this.messageService.add({ severity: 'success', summary: 'Welcome Back !', detail:  firstLetterUpperCaseUserName +  " " + firstLetterUpperCaseUserSurname });

            }else{
              // this.wrongEmailAndPassword = true;
              this.loginForm.controls.email.markAsUntouched();
              this.loginForm.controls.password.markAsUntouched();

            }
          },
          error:(err) => {
            this.router.navigate([ '/error' ]).then()
          }
      })
    }else {
      this.loginForm.markAllAsTouched();

    }
  }

  public makeBorderNotVisible(): void{
      this.makeInputBorderNotVisiable = true
  }

  public continueButtonClick() :void{
    this.currentUser = this.users.find((user) => this.loginForm.value.email === user.email);
    if (this.currentUser){
      this.emailSucceed = true;
      this.userEmail = this.currentUser.email;
    }
  }

  public logInButtonClick(){
    console.log(this.currentUser)
    console.log(this.loginForm.value.password)
    console.log(this.currentUser.password)
    if (this.loginForm.value.password === this.currentUser.password){
      this.userService.settingTrueVal(true, this.currentUser);
      this.ref.close();

      if (this.currentUser.name && this.currentUser.surname){
        let firstLetterUpperCaseUserName = this.currentUser.name[0]!.toUpperCase() + this.currentUser.name.slice(1)
        let firstLetterUpperCaseUserSurname = this.currentUser.surname[0].toUpperCase() + this.currentUser.surname.slice(1)
        this.messageService.add({ severity: 'success', summary: 'Welcome Back !', detail:  firstLetterUpperCaseUserName +  " " + firstLetterUpperCaseUserSurname });

      }

    }else{
      this.wrongPassword = true;
      this.loginForm.controls.password.markAsUntouched();

    }
  }
}
