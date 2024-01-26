import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { getProducts } from "../services/products.service";
import { take } from "rxjs";
import { ProductComponent } from "../product/product.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { IProductCategory, IProducts, ISkeleton } from "../core/interfaces/products-interface";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ DialogService ],

})
export class ProductsComponent implements OnInit {
  public pageRoute: string;
  public mainCategory: string;
  public mainCategoryProducts: IProductCategory;
  public ref: DynamicDialogRef;
  public isLoading: boolean = false;
  public products: { [key: string]: any } = {};

  constructor(
    private router: Router,
    private productsService: getProducts,
    public dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.pageRoute = this.router.url;
    this.mainCategory = this.router.url.slice(1);
    this.getProducts()
  }

  private getProducts(): void {
    this.productsService.getProducts(this.mainCategory)
      .pipe(take(1))
      .subscribe({
        next: (res: IProducts) => {
          this.isLoading = false;
          this.mainCategoryProducts = res[this.mainCategory];
        }
      })
  }

  public showProduct(productId: string) {
    this.ref = this.dialogService.open(ProductComponent, {
      contentStyle: {
        'overflow-y': 'hidden',
      },
      closable: true,
      baseZIndex: 10000,
      dismissableMask: true,
      showHeader: true,
      header: '',
      data: { productId, productCategory: this.mainCategory }
    });

  }

  public skeletonView(num: number): ISkeleton[] {
    return new Array(num)
  }
}
