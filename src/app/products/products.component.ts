import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public pageRoute: string;
  private params: string;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.pageRoute = this.router.url;
    this.route.params
      .subscribe({
        next: params => {
          this.params = params.id;
        }
      })
    console.log(this.pageRoute)
  }
}
