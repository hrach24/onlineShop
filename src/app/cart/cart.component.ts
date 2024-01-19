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
  public currentTime: any;
  public date: Date | undefined;
  public cities: any;
  public icon: string
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
    let getMinutes: number = new Date().getMinutes();
    let minutes: any = new Date().getMinutes().toString();
    let hour: number = new Date().getHours();
    let singleHourNumber: number = new Date().getHours() % 12 || 12;
    let arr: any[] = [0,15,30,45];
    this.date = new Date();
    if (minutes < 10){
      getMinutes = 0;
    }

    if (this.date.getMinutes() < 10){
      this.currentTime = this.date.getHours() + ':' + '0'+ this.date.getMinutes();

    }else{
      this.currentTime = this.date.getHours() + ':' + this.date.getMinutes();

    }

    let allMinutesInLastHour: number = 46; //12*60/15
    let minutesInCurrentHour: number = singleHourNumber * 60 / 15;
    let minutesCountForLoop: number = allMinutesInLastHour - minutesInCurrentHour;

    let foundNumber: any= arr.find((number)=>  number > getMinutes)
    console.log(foundNumber)
    let result: number = foundNumber - getMinutes;
    let dateHourDropDownMinutes:number = getMinutes + result;
    if (foundNumber === undefined){
      dateHourDropDownMinutes = 0;
      let c = { name: String(hour) + ':' + String('00') };
      this.cities.push(c);

    }


    for (let i = 0; i < minutesCountForLoop; i++) {
      console.log(dateHourDropDownMinutes)
      if (dateHourDropDownMinutes === 60){
        hour = hour + 1;
        dateHourDropDownMinutes = 0;
        let f = { name: String(hour) + ':' + String('00') }
        this.cities.push(f);

      }else{
        // console.log(dateHourDropDownMinutes)
        let dateHourDropDownToShow = { name: String(hour) + ':' + String(dateHourDropDownMinutes) }
        this.cities.push(dateHourDropDownToShow);

      }
      dateHourDropDownMinutes = dateHourDropDownMinutes + 15;
    }
  }

  getCountry(): void{
    this.defaultCountryCode = this.selectedCountry.code;
    this.pInputMask = `(${this.selectedCountry.code}) ` + this.selectedCountry.mask
  }
}
