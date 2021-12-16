import {EventEmitter, Injectable} from '@angular/core';
import {HttpServiceService} from "./http-service.service";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import { ProductSearchParams } from '../interface/product-search-params';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //   public products: Product[]= [new Product(1,"第一个商品名称",1.99,4.5,"第一个商品描述",["电子产品","硬件设备"]),
  //   new Product(2,"第二个商品名称",2.99,3.5,"第二个商品描述",["图书","IT"]),
  //   new Product(3,"第三个商品名称",3.99,1.5,"第三个商品描述",["电子产品","硬件设备"]),
  //   new Product(4,"第四个商品名称",4.99,4,"第四个商品描述",["电子产品","手机"]),
  //   new Product(5,"第五个商品名称",5.99,4,"第五个商品描述",["电子产品","硬件设备"]),
  //   new Product(6,"第六个商品名称",6.99,5,"第六个商品描述",["通信","硬件设备"])
  // ];
    //console.log("123");
//定义 事件的流  点击搜索时8.6  传入的类型是  ProductSearchParams  在product组件中订阅这个流
  searchEvent:EventEmitter<ProductSearchParams>= new EventEmitter();//<ProductSearchParams>



  constructor(private httpServer:HttpServiceService) {

  }





  getAllCategories(): string[]{//返回一个string数组
    return  ["IT","hardware","Tech","E-commerce","Social network","Ads"];
  }
    //获取所有的商品信息   返回商品数组的流 改造
    getProducts():Observable<Product[]>{//With HttpClient, you don't need map(res => res.json())
      //return  this.httpServer.getF().map(res=>res.json());
      return  this.httpServer.getF("/api/products");
    }


    //根据商品id在数组中找到商品，如何返回商品  返回值是Product      ) =>定义匿名函数
    getProduct(id:number):Observable<Product> {
     return  this.httpServer.getF("/api/product/"+id);//product 没有 s
     }
     //根据商品id 获取商品评论的信息
    // @ts-ignore
    getCommentsForProductId(id:number):Observable<Comment[]>{
    //                                                      如果评论的id与传过来的id相同，则把这个评论加到返回的数组里面
    return this.httpServer.getF("/api/product/"+id+"/comments");//product没有 s

    }
    //接受ProductSearchParas类型的输入， 返回商品数组的流 Observable<Product[]>
  //接受ProductSearchParas类型的输入， 返回商品数组的流 Observable<Product[]>
  //接受ProductSearchParas类型的输入， 返回商品数组的流 Observable<Product[]>
    search(params: ProductSearchParams):Observable<Product[]>{
      //
      //console.log("调用search前params");
     // console.log(params);
     return this.httpServer.getFSearch("/api/products",this.encodeParams(params));//getF 函数如何设置第二个参数可选
      //return this.httpServer.getF("/api/products",{params:this.encodeParams(params)});//getF 函数如何设置第二个参数可选

  }
  private encodeParams(params:ProductSearchParams) {
    //let result:URLSearchParams;  换成HttpParams
    //把paras的属性取出来,  然后过滤，如果有值则 留下来       //sum.append(key,params[key]); 把值赋给sum


    console.log("调用encodeParams 前params");
    console.log(params);
    console.log(params.title);
    let seachParams:string="";
    //               样本字符串         price=1&category=book
    if(params.title && params.price && params.category){// 111
      seachParams="title="+params.title+  "&price="+params.price+"&category="+params.category;
    }
    if(params.title && params.price && !params.category){ //110
      seachParams="title="+params.title+  "&price="+params.price;
    }
    if(params.title && !params.price && params.category){//101
      seachParams="title="+params.title+ "&category="+params.category;
    }
    if(params.title && !params.price && !params.category){//100
      seachParams="title="+params.title;
    }
    if(!params.title && params.price && params.category){//011
      seachParams=  "price="+params.price+"&category="+params.category;
    }
    if(!params.title && params.price && !params.category){//010
      seachParams=   "price="+params.price ;
    }
    if(!params.title && !params.price && params.category){//001
      seachParams= "category="+params.category;
    }
    if(!params.title && !params.price && !params.category){//000
      seachParams="";
    }
    console.log("笨方法");
    console.log(seachParams);
     let params111: HttpParams = new HttpParams({
       fromString: seachParams
     });
    console.log(params111);

    return seachParams;
  }


}


//声明一个类 :用类去封装搜索的数据结构  这个service作为中间人（搜索组件和产品组件）
//  interface  ProductSearchParams{
//   //搜索参数有3个
//
//       [title:string]:string;
//
//    // @ts-ignore
//    [price:string]:number;
//
//    // @ts-ignore
//    [category:string]:string;
//
// }

//   这个service作为中间人（搜索组件和产品组件）




// 11   定义一个商品类
export class Product{
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>

  ) {
  }
}


// 22   定义一个评论类
export class Comment{

  constructor(
    public id:number,
    public productId:number,
    public timestamp:string,
    public user:string,
    public rating:number,
    public content:string

  ) {
  }

}
