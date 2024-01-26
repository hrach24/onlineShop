import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {BadgeModule} from "primeng/badge";
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ErrorComponent } from './error/error.component';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProductsComponent } from './products/products.component';
import { HomeModuleModule } from "./shared/home/home.module";
import { PasswordModule } from "primeng/password";
import { InputMaskModule } from "primeng/inputmask";
import { MessageModule } from "primeng/message";
import { InputNumberModule } from "primeng/inputnumber";
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";
import { KeyFilterModule } from "primeng/keyfilter";
import { HttpClientModule } from "@angular/common/http";
import { MenuModule } from "primeng/menu";
import { CardModule } from "primeng/card";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ListboxModule } from "primeng/listbox";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { CartComponent } from "./cart/cart.component";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from 'primeng/chips';
import { ProductComponent } from './product/product.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { OverlayPanelModule } from "primeng/overlaypanel";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    SignUpComponent,
    ErrorComponent,
    ProductsComponent,
    CartComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BadgeModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CascadeSelectModule,
    FormsModule,
    DropdownModule,
    HomeModuleModule,
    PasswordModule,
    InputMaskModule,
    MessageModule,
    InputNumberModule,
    ToastModule,
    KeyFilterModule,
    HttpClientModule,
    MenuModule,
    CardModule,
    NgxSkeletonLoaderModule,
    ListboxModule,
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule,
    ChipsModule,
    ConfirmPopupModule,
    OverlayPanelModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
