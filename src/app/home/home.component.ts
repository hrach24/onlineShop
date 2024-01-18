import {Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderLinksService } from "../services/header-links.service";
import { HttpClient } from "@angular/common/http";
import { Product, Products } from "../core/interfaces/products/products-interface";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { subCategories } from "../core/interfaces/products/products-interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem ;
  public products:{ [key: string]: any } = {}
  public isLoading:boolean = true;
  constructor(public headerLinks: HeaderLinksService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.items = this.headerLinks.getMenuItems();
      this.http.get<Products>('http://localhost:3000/products/')
        .pipe(map((res: Products) => {
          setTimeout(() => {
            this.isLoading = false;
          },2000);

          for (let key in res){
            if (this.products){
              this.products[key] = Object.values(res[key]).flat();

            }
          }
        }))
      .subscribe({
        next: () => {

        },
        error: (err) => {
            this.router.navigate([ '/error' ]).then();
        }
      })
  }


  skeletonView(num: number):any[]{
    return new Array(num)
  }
}
