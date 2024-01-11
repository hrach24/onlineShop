import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
    public pageRoute: string;
    constructor(private route: Router) {}

    ngOnInit(): void{
      this.pageRoute = this.route.url;
    }
}
