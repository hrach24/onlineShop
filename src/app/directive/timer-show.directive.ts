import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTimerShow]'
})
export class TimerShowDirective {

  constructor(private el : ElementRef) {}

}
