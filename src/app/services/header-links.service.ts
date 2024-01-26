import { Injectable } from '@angular/core';
import { MenuItem } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class HeaderLinksService {
  public items: MenuItem[] | undefined;

  constructor() {
    this.items = [
      { label: 'Food', routerLink: '/food' },
      { label: 'Cakes', routerLink: '/cakes' },
      { label: 'Drinks', routerLink: '/drinks' },
    ];
  }

  public getMenuItems() {
    return this.items
  }


}
