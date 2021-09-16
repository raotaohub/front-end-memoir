declare class PubSub extends Wolfy87EventPubSub.PubSub {
}

export = PubSub;
export as namespace PubSub;

//声明全局变量
declare namespace Wolfy87EventPubSub {
//    暴露一个 类
    export class PubSub {
        subscribe(message: string, callback: Function): string // token
        publish(message: string, data: any): boolean

        unsubscribe(value: string | Function): boolean | Function
    }

}
