import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  public items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      { label: 'About Us', icon: 'pi pi-fw pi-users', routerLink: 'about-us' },
      { label: 'Contact Us', icon: 'pi pi-fw pi-phone', routerLink: 'contact-us' },
    ];

  }
}
