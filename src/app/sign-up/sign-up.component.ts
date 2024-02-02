import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ISignUpForm } from "../core/interfaces/sign-up.interface";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { IUserInterface } from "../core/interfaces/user.interface";
import { MessageService } from 'primeng/api';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent implements OnInit {
  public confirmPasswordEyeShowHide: boolean = false;
  public passwordEyeShowHide: boolean = false;
  public getAllUsers: IUserInterface | any;
  public confirmPasswordInputType: string = 'password';
  public passwordInputType: string = 'password';
  public emailAlreadyExist: boolean = false;

  public passwordsDontMatch: boolean = false;
  public defaultCountryCode: string;
  public pInputMask: string;
  public countries: any[] | undefined;
  public selectedCountry: any;
  public icon: string;
  public cities: any;
  public signUpForm: FormGroup<ISignUpForm> = new FormGroup<ISignUpForm>(<ISignUpForm>{
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
    phoneNumber: new FormControl('', [ Validators.required, Validators.minLength(9) ]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    companyNumber: new FormControl('')
  });
  public viewChangeProp: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private http: HttpClient,
    private signUpUserService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.defaultCountryCode = '+1';
    this.pInputMask = '(+1) 999 999-9999';
    this.cities = [];
    this.countries = [
      { name: 'United States', code: '+1', img: 'assets/images/languages/en.png', mask: '999 999-9999' },
      { name: 'Russia', code: '+7',  img: 'assets/images/languages/ru.png', mask: '999 999-99-99' },
      { name: 'Farsi', code: '+98',  img: 'assets/images/languages/fa.png', mask: '99 9999-9999' },
    ];
    this.selectedCountry = this.countries[0];
    this.signUpForm.controls.companyName?.disable();
  }

  public ConfirmPasswordEyeShowHide(): void {
    if (this.confirmPasswordEyeShowHide) {
      this.confirmPasswordEyeShowHide = false;
      this.confirmPasswordInputType = 'password';

    } else {
      this.confirmPasswordEyeShowHide = true;
      this.confirmPasswordInputType = 'text';

    }
  }

  public PasswordEyeShowHide(): void {
    if (this.passwordEyeShowHide) {
      this.passwordEyeShowHide = false;
      this.passwordInputType = 'password';

    } else {
      this.passwordEyeShowHide = true;
      this.passwordInputType = 'text';

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
      this.http.get('http://localhost:3000/users')
        .subscribe({
          next:(res) => {
            this.getAllUsers = res;
            let userAlreadyExist =  this.getAllUsers.find((user:IUserInterface) => user.email === this.signUpForm.value.email);
            if (userAlreadyExist) {
              this.emailAlreadyExist = true;
              this.signUpForm.controls.email.markAsUntouched();

            }else {
              let newUser: IUserInterface = {
                ...this.signUpForm.getRawValue(),
                role: '0',
                favorites: [],
              };
              this.http.post('http://localhost:3000/users', newUser)
                .subscribe(res => {
                  this.signUpUserService.settingTrueVal(true, newUser);
                  this.ref.close();
                  this.messageService.add({ severity: 'success', summary: 'Successfully Signed-up', detail: 'Congratulations !' });
                })

            }
          },
          error:(err): void => {
            this.router.navigate([ '/error' ]).then()
          }
      })
    }
  }

  public getCountry(): void{
    console.log('ok')
    this.defaultCountryCode = this.selectedCountry.code;
    this.pInputMask = `(${this.selectedCountry.code}) ` + this.selectedCountry.mask;
  }

  public viewChange(): void {
    this.viewChangeProp = !this.viewChangeProp;
    if (this.viewChangeProp) {
      this.signUpForm.controls.companyName?.enable();

    }else{
      this.signUpForm.controls.companyName?.reset();
      this.signUpForm.controls.companyName?.disable();


    }
  }

}
