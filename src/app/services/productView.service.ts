import { Injectable } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { DynamicDialogRef, DialogService } from "primeng/dynamicdialog";



@Injectable({
  providedIn: 'root',
})
export class productViewService {
  public ref: DynamicDialogRef;
  constructor(public dialogService: DialogService) {
  }
  public productView(productId: string, productCategory: string) {
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
