import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
//需要3个参数  1.list  2.根据哪个字段搜索  3 关键字
  transform(list: any[], filterField:string, keyword:string): any {
    //如果 2.根据哪个字段搜索 或者 3 关键字 没有传，则全部显示
    if(!filterField|| !keyword){
      return list;
    }
    //2个参数都有时，进行过滤
    return list.filter(item=>{
      //返回布尔值 当前元素是否保留
      let fieldValue=item[filterField];//fieldValue 是具体的值
      return fieldValue.indexOf(keyword)>=0;//这个具体值 是否 包含 关键字, 包含时：大于等于0

      }
      );
  }

}
