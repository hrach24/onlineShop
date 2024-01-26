import { Component, OnInit } from '@angular/core';

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
  public loopCount: number;
  public array: any[];
  public currentMinute: number;
  public currentHour: number;
  public amOrPm: string;
  public adjustedHours: number;
  public minutesCountInSingleHourNumber: number;
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
    this.loopCount = 0;
    this.array = [0,15,30,45];
    if (this.date.getMinutes() < 10){
      this.currentTime = this.date.getHours() + ':' + '0' + this.date.getMinutes();

    }else{
      this.currentTime = this.date.getHours() + ':' + this.date.getMinutes();

    }
    this.array = [0,15,30,45];
    this.currentMinute = this.date.getMinutes();
    this.currentHour = this.date.getHours();
    this.foundMinute = this.array.find(minute => minute > this.currentMinute);
    this.amOrPm = this.currentHour >= 12 ? 'PM' : 'AM';
    this.adjustedHours = this.currentHour % 12 || 12;

    if(this.foundMinute === undefined){
      this.foundMinute = 0;
      this.currentHour = this.currentHour + 1;
      this.minutesCountInSingleHourNumber = (this.adjustedHours * 60 + this.foundMinute) / 15;
      if (this.amOrPm === 'AM'){
        this.loopCount = 90 - this.minutesCountInSingleHourNumber;

      }else{
        this.loopCount = 42 - this.minutesCountInSingleHourNumber;

      }
      for(let j = 0; j < this.loopCount; j++){
        this.foundMinute = this.foundMinute + 15;

        if(this.foundMinute === 60 ){
          this.foundMinute = 0;
          this.currentHour = this.currentHour + 1;

        }
        let dateToShowInDropDown = { name: String(this.currentHour) + ':' + String(this.foundMinute) };
        this.cities.push(dateToShowInDropDown);
      }

    }else{
      let minutesCountInSingleHourNumber: number = (this.adjustedHours * 60 + this.foundMinute) / 15;
      if (this.amOrPm === 'AM'){
        this.loopCount = 95 - minutesCountInSingleHourNumber;

      }else{
        this.loopCount = 47 - minutesCountInSingleHourNumber;

      }

      for(let i = 0; i < this.loopCount; i++){
        let dateToShowInDropDown = { name: String(this.currentHour) + ':' + String(this.foundMinute) };
        this.foundMinute = this.foundMinute + 15;
        if(this.foundMinute === 60 ){
          this.foundMinute = 0;
          this.currentHour = this.currentHour + 1;

        }
        this.cities.push(dateToShowInDropDown);
      }
    }
  }

  getCountry(): void{
    this.defaultCountryCode = this.selectedCountry.code;
    this.pInputMask = `(${this.selectedCountry.code}) ` + this.selectedCountry.mask
  }

}
