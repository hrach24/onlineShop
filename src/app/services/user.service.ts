import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject, take } from "rxjs";
import {AuthService} from "./auth.service";
import { IUserInterface } from "../core/interfaces/user.interface";
import { resolve } from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public array: any[] = [];
  constructor(public http: HttpClient, public authService: AuthService){}


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
          this.http.patch(`http://localhost:3000/users/` + user.id, { favorites: this.array }).subscribe({
            next: (res: any) =>  {
              localStorage.removeItem('newUser');
              localStorage.setItem('newUser', JSON.stringify(res))
              this.authService.userData$.next(res)
            }
          });
        }
      })
        }

  public removeProductFromFavorites(productId: string, productCategory: string) :void {
    let favProductsFromStorage: any = localStorage.getItem('favProducts');
    let newUserFromStorage: any = localStorage.getItem('newUser');

    favProductsFromStorage = JSON.parse(favProductsFromStorage);
    newUserFromStorage = JSON.parse(newUserFromStorage);

    favProductsFromStorage = favProductsFromStorage.filter((item: any) => item.id !== productId);
    localStorage.removeItem('favProducts');
    localStorage.setItem('favProducts', JSON.stringify(favProductsFromStorage));

    newUserFromStorage.favorites = newUserFromStorage.favorites.filter((item: any) => item.productId !== productId);
    localStorage.removeItem('newUser');
    localStorage.setItem('newUser', JSON.stringify(newUserFromStorage));


    this.authService.userData$.next(newUserFromStorage);

    this.http.patch(`http://localhost:3000/users/` + newUserFromStorage.id, { favorites: newUserFromStorage.favorites }).subscribe({
      next: (res: any) =>  {
        localStorage.removeItem('newUser');
        localStorage.setItem('newUser', JSON.stringify(res))
        this.authService.userData$.next(res)
      }
    });

  }
}
