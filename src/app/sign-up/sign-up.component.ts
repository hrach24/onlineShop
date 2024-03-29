import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ISignUpForm } from "../core/interfaces/sign-up.interface";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { IUserInterface } from "../core/interfaces/user/user.interface";
import { MessageService } from 'primeng/api';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent implements OnInit {
  public eyeShow: boolean = true;
  public getAllUsers: IUserInterface | any;
  public inputType: string = 'password';
  public emailAlreadyExist: boolean = false;
  public signUpForm: FormGroup<ISignUpForm> = new FormGroup<ISignUpForm>(<ISignUpForm>{
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
    phoneNumber: new FormControl('', [ Validators.required, Validators.minLength(9) ]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })
  public passwordsDontMatch: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private http: HttpClient,
    private signUpUserService: AuthService,
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

  public onClose(): void {
    this.ref.close();
  }

  public showLoginModal(): void {
    this.ref.close(true);
  }

  public submit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();

    } else if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.passwordsDontMatch = true;
      this.signUpForm.controls.password.markAsUntouched();
      this.signUpForm.controls.confirmPassword.markAsUntouched();

    } else {
      this.passwordsDontMatch = false;
      let newUser: IUserInterface = {
        name: this.signUpForm.value.name,
        surname: this.signUpForm.value.surname,
        email: this.signUpForm.value.email,
        phoneNumber: this.signUpForm.value.phoneNumber,
        password: this.signUpForm.value.confirmPassword,
        role: '0',

      }
      this.http.get('http://localhost:3000/users')
        .subscribe(res => {
        this.getAllUsers = res;
        let userAlreadyExist =  this.getAllUsers.find((user:IUserInterface) => user.email === this.signUpForm.value.email);
        if (userAlreadyExist) {
          this.emailAlreadyExist = true;
          this.signUpForm.controls.email.markAsUntouched();

        }else {
          this.http.post('http://localhost:3000/users', newUser)
            .subscribe(res => {
            this.signUpUserService.settingTrueVal(JSON.stringify(newUser));
            this.ref.close();
            this.messageService.add({ severity: 'success', summary: 'Successfully Signed-up', detail: 'Congratulations !' });
          })
        }

      })
    }
  }
}
