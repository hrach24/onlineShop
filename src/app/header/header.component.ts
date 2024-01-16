import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { Subject, take, takeUntil } from "rxjs";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { MenuItem, MessageService } from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [ DialogService ],
})

export class HeaderComponent implements OnInit, OnDestroy {
  public items: MenuItem[];
  public countries: any = [
    { name: 'EN', code: 'EN', flag_path: 'assets/images/languages/en.png' },
    { name: 'RU', code: 'RU', flag_path: 'assets/images/languages/ru.png' },
    { name: 'FA', code: 'FA', flag_path: 'assets/images/languages/fa.png' } ];
  public selectedCountry: any = this.countries[0];
  public ref: DynamicDialogRef;
  public isAuth: any;
  public users: any;
  public userName: string;
  public userSurname: string;
  private unsubscribe$: Subject<void> = new Subject<void>();


  constructor(
    public dialogService: DialogService,
    public authService: AuthService,
    public http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.localStorageValueChange();
    this.followAuthState();
    this.generateUserProfileItems();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public localStorageValueChange(): void {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('newUser') || 'null');
    if (userFromLocalStorage) {
      this.http.get('http://localhost:3000/users')
        .subscribe((usersFromServer) => {
          this.users = usersFromServer;
          let found = this.users.find((user: any) => {
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
          if (found) {
            this.userName = userFromLocalStorage.name;
            this.userSurname = userFromLocalStorage.surname;
            if (this.items) {
              this.items[0].label = `${this.userName} ${this.userSurname}`;

            }
            this.isAuth = true;
          }else {
              localStorage.clear();

          }
        })
    }
    else {
      localStorage.clear();

    }
  }

  private followAuthState(): void {
    this.authService.isAuth$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.isAuth = data;
      })
  }

  private generateUserProfileItems(): void {
    this.items = [
      {
        items: [
          {
            label: 'Yummy Shop.am Wallet',
            icon: 'pi pi-wallet',
            command: () => {
            },
            routerLink: 'hey'
          },
          {
            label: 'Gift Cards',
            icon: 'pi pi-gift',
            command: () => {
            }
          },
          {
            label: 'My Addresses',
            icon: 'pi pi-times',
            command: () => {
            }
          },
          {
            label: 'Personal Information',
            icon: 'pi pi-user',
            command: () => {
            }
          },
          {
            label: 'Orders History',
            icon: 'pi pi-history',
            command: () => {
            }
          },
          {
            label: 'Log Out',
            icon: 'pi pi-sign-out',
            command: (): void => {
              this.logOut();
            }
          }
        ]
      },
    ];
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
          if (res) {
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
          if (res) {
            this.loginShow();
          }
        }
      })
  }

  public logOut(): void {
    this.isAuth = false;
    this.messageService.add({ severity: 'error', summary: 'Successfully', detail: 'Logged Out !' });
    localStorage.removeItem('newUser');
    localStorage.removeItem('isAuth');
  }

}
