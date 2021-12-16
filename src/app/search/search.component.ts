import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../shared/product.service";
import {Router} from "@angular/router";
declare var $: any;  // 为了 用 jQuery

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formModule: FormGroup;
  categories:string[];

  constructor(private productService: ProductService, private  router :Router) {
    let fb=new FormBuilder();
    //建立 响应式表单的数据模型
    this.formModule=fb.group({//开始111
      //对应表单的3个字段
      title: ['',Validators.minLength(3)], //默认值是“， 校验验器：Validators.minLength
      price: [null,this.positiveNumberValidators],
      category: ['-1']
    });//结束111

    this.categories=this.productService.getAllCategories();
  }
  positiveNumberValidators(control:FormControl):any{
    if(!control.value){///如果没有值null，则没有问题
      return null;
    }
    let price=parseInt(control.value);
    if (price>0){
      return null;//没有问题
    }else {
      return {positiveNumber:true};//有问题,返回一个 对象
    }
  }

  ngOnInit(): void {

  }

  onSearch(){

    if(this.formModule.valid){//如果表单数据 全部有效，则打印结果
      console.log(this.formModule.value);
      this.productService.searchEvent.emit(this.formModule.value);

    }
    this.router.navigate(['/']);///////////////////////////////张哲 2021/12/16 修改

  }


}
