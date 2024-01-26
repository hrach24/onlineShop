import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject, take } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public usersEmail$: Subject<any> = new Subject<any>();
  constructor(public http: HttpClient){}


  public getUsersEmail(){
    return this.http.get('http://localhost:3000/users/')
      .pipe(take(1))
  }

}
