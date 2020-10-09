import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[SelectDiscipline]'
})
export class SelectDisciplineDirective {
  @HostListener('click', ['$event.target']) onClick(btn) {
    console.log('button', btn, 'number of clicks:');
 }
 @Input() id 
  constructor() { }

}
