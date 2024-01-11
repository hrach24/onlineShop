import { Injectable } from '@angular/core';
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
  public isAuth: Subject<boolean> = new Subject<boolean>();

  public settingTrueVal(data: any): void{
    this.isAuth.next(data);
    console.log(data)
    localStorage.setItem('isAuth', JSON.stringify(data));
    console.log(data)
  }
}
