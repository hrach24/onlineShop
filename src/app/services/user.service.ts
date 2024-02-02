import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, take } from "rxjs";
import { IUserInterface } from "../core/interfaces/user.interface";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public usersEmail$: Subject<any> = new Subject<any>();
  public array: any[] = [];
  constructor(public http: HttpClient){}


  public getUsersEmail(){
    return this.http.get('http://localhost:3000/users/')
      .pipe(take(1))
  }

  public addProductToFavorites(productId: string, productCategory: string) :void{
      let userObjectAsString: any  = localStorage.getItem('newUser');
      let user = JSON.parse(userObjectAsString);
      this.http.get(`http://localhost:3000/users/` + user.id)
        .subscribe({
          next: (res: any) => {
              this.array = res.favorites;
              this.array.push( { productCategory, productId } );
              this.http.patch(`http://localhost:3000/users/` + user.id, { favorites: this.array }).subscribe();
          }
        })

  }



}
