import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
declare var $: any;  // 为了 用 jQuery


@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input()
  public rating: number = 0;

  @Output()
  public ratingChange: EventEmitter<number> = new EventEmitter();//输出属性 ratingChange   用来发射 一个事件 ，事件就是新评价的星数  number类型
  public stars: boolean[];

  @Input()
  public readonly: boolean = true;


  constructor() {
    this.stars = [];


    //this.rating=

  }

  ngOnChanges(changes: SimpleChanges): void {
    // 根据最新的rating设置  stars
    this.stars=[];//先 清零，再push
    for(let i=1;i<=5;i++){
      this.stars.push(i>this.rating);
    }

    }

  ngOnInit(): void {
    // // 根据实际的rating画星星
    // this.stars=[];//先 清零，再push
    // for(let i=1;i<=5;i++){
    //   this.stars.push(i>this.rating);
    // }
  }
  clickStar(index:number){
    if(!this.readonly){
      this.rating=index+1;//索引是0~4，对应1星到 5星 当前点的星星
      ///222此时 会ngOnChanges       //////////111111 调用this.ngOnInit();// 例如rating为2， 则 stars为 f f T T True
      //点击 星星 时，发射 事件，把 新rating值发射出去
      this.ratingChange.emit(this.rating);

    }


  }
}
