import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ILoginForm } from "../core/interfaces/sign-up.interface";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { IUserInterface } from "../core/interfaces/user/user.interface";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public eyeShow:boolean;
  public wrongEmailAndPassword: boolean
  public inputType: string = 'password';
  private getAllUsers: IUserInterface | any;
  public loginForm: FormGroup<ILoginForm> = new FormGroup<ILoginForm>(<ILoginForm>{
    email: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
    password: new FormControl('', Validators.required),
  })


  constructor(
    private ref: DynamicDialogRef,
    private http: HttpClient,
    public userService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {}

  public showHide(): void {
    if (this.eyeShow) {
      this.eyeShow = false;
      this.inputType = 'text';

    } else {
      this.eyeShow = true;
      this.inputType = 'password';

    }
  }

  openSignUpPopUp(): void{
    this.ref.close(true)
  }

  submit(): void{
    if (!this.loginForm.invalid) {
      this.http.get('http://localhost:3000/users')
        .subscribe(res => {
        this.getAllUsers = res;
        let loggedInUser = this.getAllUsers.find((user: any) =>  {
          if (user.email === this.loginForm.value.email && user.password === this.loginForm.value.password){
            return user

          }
        });
        if (loggedInUser){
          this.userService.settingTrueVal(loggedInUser);
          this.ref.close();
          let firstLetterUpperCaseUserName = loggedInUser.name[0].toUpperCase() + loggedInUser.name.slice(1)
          let firstLetterUpperCaseUserSurname = loggedInUser.surname[0].toUpperCase() + loggedInUser.surname.slice(1)
          this.messageService.add({ severity: 'success', summary: 'Welcome Back !', detail:  firstLetterUpperCaseUserName +  " " + firstLetterUpperCaseUserSurname });

        }else{
          this.wrongEmailAndPassword = true;
          this.loginForm.controls.email.markAsUntouched();
          this.loginForm.controls.password.markAsUntouched();

        }
      })
    }else {
      this.loginForm.markAllAsTouched();

    }
  }
}
