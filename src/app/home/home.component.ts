import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderLinksService } from "../services/header-links.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IProducts, ISkeleton } from "../core/interfaces/products-interface";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { IUserInterface } from "../core/interfaces/user.interface";
import { UserService } from "../services/user.service";
import { productViewService } from "../services/productView.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem;
  public products: { [key: string]: any } = {}
  public isLoading: boolean = true;
  public user: IUserInterface;


  constructor(
    public headerLinks: HeaderLinksService,
    private http: HttpClient,
    private router: Router,
    public userService: UserService,
    public productViewService: productViewService
    ) {}

  ngOnInit(): void {
    this.items = this.headerLinks.getMenuItems();
    this.getProducts();
  }

  private getProducts(): void {
    this.http.get<IProducts>('http://localhost:3000/products/')
      .pipe(take(1))
      .subscribe({
        next: (res: IProducts):void => {
          this.isLoading = false;
          for (let key in res) {
            if (this.products) {
              this.products[key] = Object.values(res[key]).flat();
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          this.router.navigate([ '/error' ]).then();
        }
      })
  }

  public skeletonView(num: number): ISkeleton[] {
    return new Array(num)
  }

  public showProduct(productId: string, productCategory: string) :void {
    this.productViewService.productView(productId, productCategory);
  }

  public addToFavorite(productId: string, productCategory: string, event: any): void {
      event.stopPropagation();
      this.userService.addProductToFavorites(productId, productCategory);

  }
}
