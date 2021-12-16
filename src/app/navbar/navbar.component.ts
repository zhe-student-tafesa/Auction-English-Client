import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
declare var $: any;  // 为了 用 jQuery

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private  router :Router) {

  }

  ngOnInit(): void {
  }

}
