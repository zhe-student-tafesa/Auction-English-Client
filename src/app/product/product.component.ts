import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../shared/product.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
declare var $: any;  // 为了 用 jQuery

//import  "rxjs/Rx";
//import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //搜索功能
  //public  keyword:string="";
  //public titleFilter: FormControl= new FormControl();
  //22   声明一个数组
  public products: Observable<Product[]>;
  public imgUrl="http://placehold.it/320x150";
  //注入
  constructor(private productService:ProductService) {
    //订阅流    .debounceTime(800) 错误
    // this.titleFilter.valueChanges
    //
    //   .subscribe(
    //     value => this.keyword=value
    //   );//把值赋给  keyword               .debounceTime(800)
    //使用注入的对象的 getProducts 方法, 获取 商品信息
    this.products=this.productService.getProducts();
    console.log("首页获取商品");
    console.log(this.products);

    //this.products.push(new Product(7,"第七个商品名称",4.99,4,"第7个商品描述",["电子","手机"]))
  }

  ngOnInit(){
    //订阅搜索  流  8.6--------222
    this.productService.searchEvent.subscribe(
      params=>this.products=this.productService.search(params)
    );
    //console.log("产品组件");
    //console.log(params);
    //333初始化这个 数组
    //this.products=this.productService.getProducts();

    //   new Product(1,"第一个商品名称",1.99,3.5,"第一个商品描述",["电子产品","硬件设备"]),
    //   new Product(1,"第一个商品名称",1.99,3.5,"第一个商品描述",["电子产品","硬件设备"]),
    //   new Product(1,"第一个商品名称",1.99,3.5,"第一个商品描述",["电子产品","硬件设备"]),
    //   new Product(1,"第一个商品名称",1.99,3.5,"第一个商品描述",["电子产品","硬件设备"]),
    //   new Product(1,"第一个商品名称",1.99,3.5,"第一个商品描述",["电子产品","硬件设备"]),
    //   new Product(1,"第一个商品名称",1.99,3.5,"第一个商品描述",["电子产品","硬件设备"])
    // ];
  }

}
// // 11   定义一个类
// export class Product{
//   constructor(
//     public id:number,
//     public title:string,
//     public price:number,
//     public rating:number,
//     public desc:string,
//     public categories:Array<string>
//
//   ) {
//   }
// }
