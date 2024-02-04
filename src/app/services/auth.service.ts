import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from "rxjs";
import { IUserInterface } from "../core/interfaces/user.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  public isAuth$: Subject<boolean> = new Subject<boolean>();
  public userData$: ReplaySubject<IUserInterface> = new ReplaySubject<IUserInterface>(2);

  public settingTrueVal(isAuth: boolean, newUser: any): void {
    this.isAuth$.next(isAuth);
    this.userData$.next(newUser)
    localStorage.setItem('newUser', JSON.stringify(newUser))
    localStorage.setItem('isAuth', JSON.stringify(isAuth))
  }

}
