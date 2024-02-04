import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { HeaderLinksService } from "../services/header-links.service";
import { AuthService } from "../services/auth.service";
import { getProducts } from "../services/products.service";
import { IUserInterface } from "../core/interfaces/user.interface";
import { IProducts } from "../core/interfaces/products-interface";
import { productViewService } from "../services/productView.service";


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem;
  public userFavoriteProducts: any[] = [];
  public products: { [key: string]: any } = {};
  public favProdsWithMatchedCategory = []
  public arrayOfFavProds:any[] = [];
  public faveProductFound: boolean = true;

  constructor(
    public headerLinks: HeaderLinksService,
    public productService: getProducts,
    public authService: AuthService,
    public productViewService: productViewService,
  ) {}

  ngOnInit(): void {
    this.items = this.headerLinks.getMenuItems();
    this.authService.userData$.subscribe({
      next: (res: IUserInterface) :void => {
        this.userFavoriteProducts = res.favorites;
      }
    })

    if (this.userFavoriteProducts.length !== 0) {
      this.productService.getProducts().subscribe({
        next: (productsFromServer: IProducts) :void => {
          for (let key in productsFromServer) {
            if (this.products) {
              this.products[key] = Object.values(productsFromServer[key]).flat();
            }
          }
          this.userFavoriteProducts.forEach((item) => {
            this.favProdsWithMatchedCategory = this.products[item.productCategory];
            this.favProdsWithMatchedCategory.forEach((favoriteItem: any) :void => {
              if (favoriteItem['id'] === item.productId){
                favoriteItem.favProductCategory = item.productCategory
                this.arrayOfFavProds.push(favoriteItem)
              }
            })
          })
        }
      })
    }else {
      this.faveProductFound = false;
    }
  }
  public productShow(productId: string, productCategory :string){
    this.productViewService.productView(productId, productCategory)
  }



}
