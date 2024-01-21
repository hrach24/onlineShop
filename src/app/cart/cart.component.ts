import { Component, OnInit } from '@angular/core';


interface City {
  name: number;
  minutes: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})


export class CartComponent implements OnInit{
  public countries: any[] | undefined;
  public defaultCountryCode: string;
  public pInputMask: string;
  public selectedCountry: any
  public date: Date;
  public cities: any;
  public icon: string;
  public foundMinute: number | undefined;
  public currentTime: string;
  constructor() {}

  ngOnInit(): void {
    this.defaultCountryCode = '+1';
    this.pInputMask = '(+1) 999 999-9999';
    this.countries = [
      { name: 'United States', code: '+1', img: 'assets/images/languages/en.png', mask: '999 999-9999' },
      { name: 'Russia', code: '+7',  img: 'assets/images/languages/ru.png', mask: '999 999-99-99' },
      { name: 'Farsi', code: '+98',  img: 'assets/images/languages/fa.png', mask: '99 9999-9999' },
    ];
    this.selectedCountry = this.countries[0];
    this.cities = [];
    this.date = new Date();

    if (this.date.getMinutes() < 10){
      this.currentTime = this.date.getHours() + ':' + '0' + this.date.getMinutes();

    }else{
      this.currentTime = this.date.getHours() + ':' + this.date.getMinutes();

    }
    let array: any[] = [0,15,30,45];
    let currentMinute:number = this.date.getMinutes();
    let currentHour:number = this.date.getHours();
    this.foundMinute = array.find(minute => minute > currentMinute);
    let singleHourNumber: number = new Date().getHours() % 12 || 12;
    if(this.foundMinute === undefined){
      this.foundMinute = 0;

    }
    let minutesCountInSingleHourNumber: number = (singleHourNumber * 60 + this.foundMinute) / 15;
    let loopCount: number = 46 - minutesCountInSingleHourNumber;

    for(let i = 0; i < loopCount; i++){
      this.foundMinute = this.foundMinute + 15
      if(this.foundMinute === 60 ){
        this.foundMinute = 0;
        currentHour = currentHour + 1;

      }
      let dateToShowInDropDown = { name: String(currentHour) + ':' + String(this.foundMinute) };
      this.cities.push(dateToShowInDropDown);

    }
  }

  getCountry(): void{
    this.defaultCountryCode = this.selectedCountry.code;
    this.pInputMask = `(${this.selectedCountry.code}) ` + this.selectedCountry.mask
  }

}
