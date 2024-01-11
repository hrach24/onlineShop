import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "../../home/home.component";
import { TabMenuModule } from "primeng/tabmenu";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TabMenuModule,
  ],
  exports: [
    HomeComponent,
    TabMenuModule
  ]

})
export class HomeModuleModule { }
