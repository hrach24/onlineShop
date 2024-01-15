import {Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderLinksService } from "../services/header-links.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem | undefined;

  constructor(public headerLinks: HeaderLinksService) {}

  ngOnInit(): void {
    this.items = this.headerLinks.getMenuItems();

  }
}
