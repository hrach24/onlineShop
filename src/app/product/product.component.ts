import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { getProducts } from "../services/products.service";
import { take } from "rxjs";
import { ConfirmationService } from 'primeng/api';
import { ClipboardService } from "ngx-clipboard";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [ConfirmationService]

})
export class ProductComponent implements OnInit{
  public productId: string;
  public productCategory: string;
  public productCount: number = 1;
  public productPrice: number;
  public originalProductPrice: number;
  public urlToCopy: string;
  public makeBorderColorToGreen: boolean
    constructor(
      public config: DynamicDialogConfig,
      public getProductsService: getProducts,
      public clipBoardService: ClipboardService,
    ) {
      this.productId = config.data.productId;
      this.productCategory = config.data.productCategory;
    }

    ngOnInit(){
      this.getProducts(this.productId, this.productCategory);
      this.getProductsService.foundProduct$
        .pipe(take(1))
        .subscribe((res) => {
        this.productPrice = Number(res.price.slice(0,-1))
        this.originalProductPrice = Number(res.price.slice(0,-1))
      })
      this.urlToCopy = 'https://www.this/Is/The/Link/You/Can/Copy';
      this.makeBorderColorToGreen = false;
    }

    public getProducts(productId: any, productCategory: any): void{
        this.getProductsService.getProductsByID(productId, productCategory)
    }

    public productMinus() :void{
      if (this.productCount > 1){
        this.productPrice = this.productPrice - this.originalProductPrice;
        this.productCount--;
      }
    }

    public productAdd() :void {
      this.productCount++;
      this.productPrice = this.productPrice + this.originalProductPrice;
    }

    public copyContent() :void{
      this.clipBoardService.copyFromContent(this.urlToCopy);
      this.makeBorderColorToGreen = true;
      setTimeout(():void => {
        this.makeBorderColorToGreen = false
      },4000)
  }
}
