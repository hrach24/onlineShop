import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderLinksService } from "../services/header-links.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IFavoriteProduct, IProducts, ISkeleton } from "../core/interfaces/products-interface";
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
  public favProducts: any = [];
  public elseArr: IFavoriteProduct[]

  constructor(
    public headerLinks: HeaderLinksService,
    private http: HttpClient,
    private router: Router,
    public userService: UserService,
    public productViewService: productViewService,
    ) {}

  ngOnInit(): void {
    this.items = this.headerLinks.getMenuItems();
    this.getProducts();
  }

  private getProducts(): void {
    this.favProducts = localStorage.getItem('favProducts')
    if (this.favProducts) {
      this.favProducts = JSON.parse(this.favProducts);
    }
    this.http.get<IProducts>('http://localhost:3000/products/')
      .pipe(take(1))
      .subscribe({
        next: (res: IProducts):void => {
          this.isLoading = false;
          for (let key in res) {
            this.products[key] = Object.values(res[key]).flat();
            if (this.favProducts) {
              this.favProducts.filter((item: any) :void => {
                this.products[key].filter((prod:any) :void => {
                  if (item.id === prod.id) {
                    prod.isFavorite = true
                  }
                })
              })
            }
          }
        },
        error: (err: HttpErrorResponse) :void => {
          this.router.navigate([ '/error' ]).then();
        }
      })
  }

  public skeletonView(num: number): ISkeleton[] {
    return new Array(num);
  }

  public showProduct(productId: string, productCategory: string) :void {
    this.productViewService.productView(productId, productCategory);
  }

  public addToFavorite(productId: string, productCategory: string, event: any): void {
    event.stopPropagation();
    if (event.target.classList.contains("pi-heart")) {
      event.target.classList.remove('pi-heart');
      event.target.classList.add('pi-heart-fill');
      this.userService.addProductToFavorites(productId, productCategory);
      for (let key in this.products) {
        this.products[key].filter((item: IFavoriteProduct) :void => {
          if (item.id === productId) {
            item.isFavorite = true;
            if (this.favProducts) {
              this.favProducts.push(item);
              localStorage.setItem('favProducts', JSON.stringify(this.favProducts));

            }else{
              item.isFavorite = true;
              this.elseArr.push(item);
              localStorage.setItem('favProducts', JSON.stringify(this.elseArr));
            }
          }
        });
        }
    }else{
      event.target.classList.remove('pi-heart-fill');
      event.target.classList.add('pi-heart');
      this.userService.removeProductFromFavorites(productId, productCategory);
    }
  }
}
