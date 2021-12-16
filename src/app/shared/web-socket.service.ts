//客户端的webSocket 服务
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { ajax } from 'rxjs/ajax';
import 'rxjs/Rx';///map 需要
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  ws!: WebSocket;//加个 感叹号就 告诉 编译器不要报错


  constructor() { }


  //方法1：创建一个可观测的websocket 返回 一个流，流 里面包含 服务器推送 的消息 onmessage
  createObservableSocket(url:string,id:number):Observable<any> {////new WebSocket(url);/////////此时 连接 服务器了
    this.ws=new WebSocket(url);
    return new Observable(//返回 一个流
        observer=>{//1什么时候 发射 下一个 元素：          即接收到的数据event.data
          this.ws.onmessage=(event)=>observer.next(event.data);
          this.ws.onerror=(event)=>observer.error(event);//22什么时候跑异常
          this.ws.onclose=(event)=>observer.complete();//33什么时候 发出 流 结束信号
          this.ws.onopen=(event)=>this.sendMessage({productId:id});//一连接上，就发给服务器一个消息
          //取消订阅时，记得把连接也关掉（service中） ，给流加一个返回值，返回值为回调函数，在流取消订阅时 调用回调函数this.ws.close()
          return ()=>this.ws.close();

        }
    );//收到的是字符串，需要yong JSON转为 对象
  }
  //方法2：向 服务器 发送一个 消息
  sendMessage(message:any){
    this.ws.send(JSON.stringify(message));//因为send方法需要的类型是字符串，所以使用JSON.stringify( ）方法 转换一下
  }

}
