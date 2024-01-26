import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderLinksService } from "../services/header-links.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IProducts } from "../core/interfaces/products-interface";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductComponent } from "../product/product.component";
import { ISkeleton } from "../core/interfaces/products-interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ DialogService ],

})

export class HomeComponent implements OnInit {
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem;
  public products: { [key: string]: any } = {}
  public isLoading: boolean = true;
  public ref: DynamicDialogRef;

  constructor(
    public headerLinks: HeaderLinksService,
    private http: HttpClient,
    private router: Router,
    public dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.items = this.headerLinks.getMenuItems();
    this.getProducts()
  }

  private getProducts(): void {
    this.http.get<IProducts>('http://localhost:3000/products/')
      .pipe(take(1))
      .subscribe({
        next: (res: IProducts) => {
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

  public showProduct(productId: string, productCategory: string) {
    this.ref = this.dialogService.open(ProductComponent, {
      contentStyle: {
        'overflow-y': 'hidden',
      },
      closable: true,
      baseZIndex: 10000,
      dismissableMask: true,
      showHeader: true,
      header: '',
      data: { productId, productCategory }
    });
  }
}
