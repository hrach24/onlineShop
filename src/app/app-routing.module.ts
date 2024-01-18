import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";

import { HomeComponent } from "./home/home.component";
import { ErrorComponent } from "./error/error.component";
import { ProductsComponent } from "./products/products.component";
import {routerExistGuard} from "./guards/router-exist.guard";
import {AdminComponent} from "./admin/admin.component";
import { CartComponent } from "./cart/cart.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'cart', component: CartComponent },
  { path: ':id', component: ProductsComponent, canMatch: [ routerExistGuard ] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
