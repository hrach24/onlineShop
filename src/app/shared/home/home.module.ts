import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "../../home/home.component";
import { TabMenuModule } from "primeng/tabmenu";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { DialogModule } from "primeng/dialog";

@NgModule({
  declarations: [HomeComponent],
    imports: [
        TabMenuModule,
        ButtonModule,
        CardModule,
        CommonModule,
        NgxSkeletonLoaderModule,
        DialogModule
    ],
  exports: [
    HomeComponent,
    TabMenuModule,
  ]

})
export class HomeModuleModule { }
