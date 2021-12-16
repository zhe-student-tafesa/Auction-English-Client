import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Comment, Product, ProductService} from "../shared/product.service";
import {WebSocketService} from "../shared/web-socket.service";
//import {Product, ProductService} from "../shared/product.service";
import {map} from 'rxjs/operators';
import {Subscription} from "rxjs";
declare var $: any;  // 为了 用 jQuery


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  //productTitle: string;//1定义变量
  public product!: Product;
  //声明一个本地数组
  comments!:Comment[];//选择   src/app/shared/product.service.ts 里面的 Comment类型
  //新评论  新等级
  public newRating: number=5;
  public newComment: string="";
  public isCommentHidden=true;//为true时，div隐藏

  isWatched:boolean=false;//是否关注了
  currentBid!:number;//当前的出价
  //是否订阅  订阅方法会返回一个Subscription对象，来代表 你当前的订阅
  subscription!:Subscription;

  constructor(private routeInfo: ActivatedRoute,//路由对象
              private productService:ProductService,
              private wsService:WebSocketService
  ) {//11111111111注入
    //this.productTitle=this.routeInfo.snapshot.params["prodTitle"];//参数快照
    let productId:number=this.routeInfo.snapshot.params["productId"];//参数快照    //第一步
                        //2222222222222使用 productService
    //this.product=this.productService.getProduct(productId);//第2步  手工订阅
    this.productService.getProduct(productId).subscribe(
      product=> {
        this.product = product;
        this.currentBid=product.price;
      }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments=>this.comments=comments
    );//拿到comments，然后把comments赋值给本地 this.comments

  }

  ngOnInit(): void {

  }
  addComment(){
    let comment=new Comment(0,this.product.id,new Date().toISOString(),"somebody",this.newRating,this.newComment);
    //推到 评论 数组里
    this.comments.unshift(comment);
    this.newComment="";
    this.newRating=5;
    this.isCommentHidden=true;

    //点击提交时，计算平均评分 把 星级加起来，求平均
    //reduce需要2个参数              参数1：匿名的回调函数，                               参数2：初始值0
    //循环comments数组的元素，第1次调用时，传递的sum为0， comment是数组里的第一个元素，sum+comment.rating 即0+第一个rating
    //                   第2次调用时，传递的sum为0+第一个rating， comment是数组里的第2个元素，sum+comment.rating 即第一个结果+第2个rating
    let sum= this.comments.reduce((sum,comment)=>sum+comment.rating,0 );
    this.product.rating=sum/this.comments.length;


  }
  watchProduct(){
    this.isWatched=!this.isWatched;//点击 关注时，关注状态取反
    //如果存在 说明我在关注
    if(this.subscription){//如果 在关注
      this.subscription.unsubscribe();//取消关注        取消订阅时，记得把连接也关掉（service中）  unsubscribe()时调用 return的回调函数
      this.isWatched=false;
      // @ts-ignore
      this.subscription=null;

    }else {
      this.isWatched=true;
      this.subscription=this.wsService.createObservableSocket("ws://localhost:8085",this.product.id)//收到的是这个客户端所有关注的商品的最新价格，只需找出这个商品的最新价格
        .subscribe(//  products0的原始数据   [{"producId":2,"bid":184.37801320143487}]

          products0=>{//对象数组，对象有2个属性          ?????????需要将字符串转为 对象？
            // @ts-ignore
            console.log("fuck Map");
            console.log(products0);

            let product:{} = products0;
            // let product2=JSON.parse(product);//转成对象
            // console.log(product2);
            console.log( products0.substr(21,8));

            // products=products0.toArray();
            // @ts-ignore
            //let product=JSON.parse(products0);//收到的是这个客户端所有关注的商品的最新价格，只需找出这个
            this.currentBid=products0.substr(21,8);
            //console.log(products0.bid);
          }
        );

    }

    //createObservableSocket这个方法返回可观测的流
    //                            给出服务器的地址，createObservableSocket这个方法返回可观测的流，客户端订阅这个流，就可以收到服务器的消息

  }

}
