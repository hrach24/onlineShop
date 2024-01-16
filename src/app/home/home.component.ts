import {Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderLinksService } from "../services/header-links.service";
import { HttpClient } from "@angular/common/http";
import { IHomeProduct, Products, subCategories } from "../core/interfaces/products/products-interface";
import { Product } from "../core/interfaces/products/products-interface";
import { compareSegments } from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem ;
  public products: any = {}
  constructor(public headerLinks: HeaderLinksService, private http: HttpClient) {}

  ngOnInit(): void {
    this.items = this.headerLinks.getMenuItems();
      this.http.get<Products>('http://localhost:3000/products/')
      .subscribe((res) => {
        for (let key in res){
          this.products[key] = Object.values(res[key]);

        }
      })



  }
}
