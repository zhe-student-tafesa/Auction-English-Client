import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import *as $ from 'jquery';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {ProductService} from "./shared/product.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FilterPipe } from './pipe/filter.pipe';
import {HttpClientModule} from "@angular/common/http";
import {HttpServiceService} from "./shared/http-service.service";
import {WebSocketService} from "./shared/web-socket.service";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

//配置路由
const routeConfig: Routes=[
  {path:'',component:HomeComponent},
  {path:'product/:productId',component:ProductDetailComponent}
]
//路径为product/:第n个商品时，显示ProductDetailComponent组件


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    ProductComponent,
    SearchComponent,
    StarsComponent,
    ProductDetailComponent,
    HomeComponent,
    FilterPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(routeConfig),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [ProductService,HttpServiceService,WebSocketService,
    {provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
