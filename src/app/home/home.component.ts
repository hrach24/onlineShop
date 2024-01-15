import {Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public items: MenuItem[] | undefined;

  public activeItem: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [
      {label: 'Food', routerLink: '/food'},
      {label: 'Cakes', routerLink: '/cakes'},
      {label: 'Drinks', routerLink: '/drinks'}
    ];
  }
}
