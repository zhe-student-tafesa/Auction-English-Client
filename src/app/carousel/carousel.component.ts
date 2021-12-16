import { Component, OnInit } from '@angular/core';
declare var $: any;  // 为了 用 jQuery

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
