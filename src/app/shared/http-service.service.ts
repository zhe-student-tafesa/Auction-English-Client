import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Product} from "./product.service";
import {ProductSearchParams} from "../interface/product-search-params";
export interface Coffee{
  id:string;
  title:string;
  price:number;
  rating:number;
  desc:string;
  categories:[];
}

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {// 服务名字：HttpServiceService

  constructor(private  http:HttpClient) { }
  getF(url:string,search?:any){                 //search?:any  ?代表可选参数
    if(search){
      return this.http.get<any>(url,search);

    }else {
      return this.http.get<any>(url);
    }

    //return this.http.get<Product[]>("/api/products");  url
    //return this.http.get<Coffee[]>("http://localhost:8000/products");
  }
  // @ts-ignore
  getSearch(url:string,search?:RequestOptionsArgs):Observable<Product[]>{                 //search?:any  ?代表可选参数

      return this.http.get<Product[]>(url);
    //return this.http.get<Product[]>("/api/products");  url
    //return this.http.get<Coffee[]>("http://localhost:8000/products");
  }
  getFSearch(url:string,search?:any){                 //search?:any  ?代表可选参数
    if(search){
      console.log("您好");
      console.log(search);
      const params = new HttpParams({
        fromString: 'price=1&category=book'
      });
      console.log(params);

      return this.http.get<any>(url+"?"+search);/////////试一试

    }else {
      return this.http.get<any>(url);
    }

    //return this.http.get<Product[]>("/api/products");  url
    //return this.http.get<Coffee[]>("http://localhost:8000/products");
  }

}
