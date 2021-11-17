/**
 *  代理模式最常见的应用就是事件代理的实现
 *  通过在父元素上绑定事件监听函数，在事件冒泡上来时，监听到事件的发生。从而减少监听函数的绑定
 */

`
html
<ul>                           -->    <ul onclick="cb">
    <li onclick="cb">1</li>    -->        <li>1</li>
    <li onclick="cb">2</li>    -->        <li>2</li>
    <li onclick="cb">3</li>    -->        <li>3</li>
    <li onclick="cb">4</li>    -->        <li>4</li>
</ul>                          -->    </ul>
js
function cb(e){
    if(e.target.tagName ==="A"){
        e.preventDefault()
        alert('我是\${e.target.innerText}')
    }
}
`;

/* bad 违法了单一职责的原则 */
class PreLoadImage {
    static LOADING_URL = "XXX";
    imgNode: any;

    constructor(imgNode) {
        this.imgNode = imgNode;
    }

    setStr(targetUrl) {
        this.imgNode.src = PreLoadImage.LOADING_URL;

        const image = new Image();

        image.onload = () => {
            this.imgNode.src = targetUrl;
        };
        image.src = targetUrl;
    }
}
