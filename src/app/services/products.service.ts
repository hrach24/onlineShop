import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, take, tap } from "rxjs";
import { IProduct, IProductCategory, IProducts } from "../core/interfaces/products-interface";


@Injectable({
  providedIn: 'root'
})
export class getProducts {

  public clickedProductCategory: IProductCategory;
  public foundProduct$: Subject<IProduct> = new Subject<IProduct>();
  public products$: Subject<IProducts> = new Subject<IProducts>();

  constructor(
    private http: HttpClient,
  ) {
  }

  public getProductsByID(productId: string, productCategory: string) {
    this.http.get<IProducts>('http://localhost:3000/products')
      .subscribe((res: IProducts) => {
        this.clickedProductCategory = res[productCategory];
        for (let productSubCategories in this.clickedProductCategory) {
          const subCategoriesProduct: IProduct[] = this.clickedProductCategory[productSubCategories]
          const product = subCategoriesProduct.find((item: any) => item.id === productId)
          if (product) {
            this.foundProduct$.next(product)
          }
        }
      })
  }

  public getProducts():Observable<IProducts> {
    return this.http.get<IProducts>('http://localhost:3000/products')
      .pipe(
        tap((res) => {
          this.products$.next(res)
        })
      )
  }
}
