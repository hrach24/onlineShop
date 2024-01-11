import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit{
    public str: string  = '';
    ngOnInit(){
      let errorArr = 'ERROR 404';
      errorArr.split('').map((i, index) => {
        setTimeout(() => {
          this.str += i;
        },index * 300);
      })
    }
}
