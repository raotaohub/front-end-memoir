import {observe, obj} from "./js/Vm";

const body = document.getElementsByTagName('body')[0]
console.log(body)
const container = document.createElement('div')
container.textContent = '开始'
body.appendChild(container)
document.write('开始')
