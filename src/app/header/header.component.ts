import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { Subject, take, takeUntil } from "rxjs";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from "@angular/router";
import { IUserInterface } from "../core/interfaces/user.interface";


interface Price {
  name: string;
  code: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [ DialogService ],
})

export class HeaderComponent implements OnInit, OnDestroy {
  price: Price[];
  public items: MenuItem[];
  public countries: any = [
    { name: 'EN', code: 'EN', flag_path: 'assets/images/languages/en.png' },
    { name: 'RU', code: 'RU', flag_path: 'assets/images/languages/ru.png' },
    { name: 'FA', code: 'FA', flag_path: 'assets/images/languages/fa.png' } ];
  public selectedCountry: any = this.countries[0];
  public ref: DynamicDialogRef;
  public isAuth: boolean;
  public users: any
  public userName: string;
  public userSurname: string;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public dialogService: DialogService,
    public authService: AuthService,
    public http: HttpClient,
    private messageService: MessageService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.followAuthState();
    this.checkUserFromLocalStorage();
    this.generateUserProfileItems();
    this.price = [
      { name: 'AMD', code: 'AMD' },
    ];

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public checkUserFromLocalStorage(): void {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('newUser') || 'null');
    if (userFromLocalStorage) {
      this.userName = userFromLocalStorage.name;
      this.userSurname = userFromLocalStorage.surname;
      this.http.get('http://localhost:3000/users')
        .subscribe({
          next:(usersFromServer) => {
            this.users = usersFromServer;
            let foundUser = this.users.find((user: IUserInterface) => {
              if (
                user.name === userFromLocalStorage.name &&
                user.surname === userFromLocalStorage.surname &&
                user.email === userFromLocalStorage.email &&
                user.password === userFromLocalStorage.password &&
                user.role === userFromLocalStorage.role
              ){
                return user
              }
            })
            if (foundUser) {
              if (this.items) {
                this.items[0].label = `${this.userName} ${this.userSurname}`;

              }
              this.authService.userData$.next(foundUser);
              this.authService.isAuth$.next(true);
            }else {
              localStorage.clear();

            }
          },
          error: (err) :void => {
            this.router.navigate([ '/error' ]).then()
          }
        })

    }else {
      localStorage.clear();
    }
  }

  private followAuthState(): void {
    this.authService.isAuth$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe( {
        next:(data: boolean) :void => {
          this.isAuth = data;
          },
        error: (err) :void => {
          this.router.navigate([ '/error' ]).then();
        }
      })
  }

  private generateUserProfileItems(): void {
    this.items = [
      {
        items: [
          {
            label: 'Yummy Shop.am Wallet',
            icon: 'assets/images/shop-logo/shop-logo.jpg',
            command: (): void => {
            },
            routerLink: 'hey'
          },
          {
            label: 'Gift Cards',
            icon: 'assets/images/header/gift-card.png',
            clickEvent: (): void => {
            }
          },
          {
            label: 'My Addresses',
            icon: 'assets/images/header/location.png',
            clickEvent: (): void => {
            }
          },
          {
            label: 'Personal Information',
            icon: 'assets/images/header/grey-user.png',
            clickEvent: (): void => {
            }
          },
          {
            label: 'Orders History',
            icon: 'assets/images/header/history.png',
            clickEvent: (): void => {
            }
          },
          {
            label: 'Log Out',
            icon: 'assets/images/header/exit.png',
            clickEvent: (): void => {
              this.logOut();
            }
          }
        ]
      },
    ];
  }

  public loginShow(): void {
    this.ref = this.dialogService.open(LoginComponent, {
      modal: true,
    });
    this.ref.onClose
      .pipe(take(1))
      .subscribe({
        next: res => {
          if (res) {
            this.signUpShow();

          }
        }
      })
  }

  public signUpShow(): void {
    this.ref = this.dialogService.open(SignUpComponent, {
      header: 'Sign-Up',
      width: '716px',
      height: 'auto',
      modal: true,
    })
    this.ref.onClose
      .pipe(take(1))
      .subscribe({
        next: res => {
          if (res) {
            this.loginShow();

          }
        }
      })
  }

  public logOut(): void {
    localStorage.clear();
    this.isAuth = false;
    this.messageService.add({icon:'pi pi-sign-out', severity: 'error', summary: 'Successfully', detail: 'Logged Out !' });
  }

  public logInPopUpShowAndButtonClick(event: any, element: any): void {
    element.hide(event);
    this.loginShow();
  }

  public registerPopUpShowAndButtonClick(event: any, element: any): void {
    element.hide(event);
    this.signUpShow();
  }
}
