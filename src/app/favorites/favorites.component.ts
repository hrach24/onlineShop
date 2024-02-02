import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { HeaderLinksService } from "../services/header-links.service";
import { AuthService } from "../services/auth.service";
import { getProducts } from "../services/products.service";
import { IUserInterface } from "../core/interfaces/user.interface";
import { IProduct, IProducts } from "../core/interfaces/products-interface";


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem;
  public productsArray: any[];
  public favoriteProductsFromDataBase: any[] = [];
  public userFavoriteProducts: any[] = [];
  public products: { [key: string]: any } = {};
  public newArr = [];
  public f = []
  public obj: { [key: string]: any[] } = {};

  constructor(
    public headerLinks: HeaderLinksService,
    public productService: getProducts,
    public authService: AuthService,
) {}

  ngOnInit(): void {
    this.items = this.headerLinks.getMenuItems();

    this.authService.userData$.subscribe({
      next: (res) => {
        this.userFavoriteProducts = res.favorites
        this.productService.getProducts().subscribe({
          next:(products) => {
            for (let key in products) {
              if (this.products) {
                this.products[key] = Object.values(products[key]).flat();
              }
            }
            this.userFavoriteProducts.forEach((item) => {

            this.f = this.products[item.productCategory]

            this.f.forEach((it) => {
              if (it['id'] === item.productId){
                this.obj[item.productCategory] = this.obj[item.productCategory] || [];
                this.obj[item.productCategory].push(it);
              }
            })
          })
            console.log(this.obj)
          }
        })
      }
    })
  }
}
