import {def} from "./utils";
import defineReactive from "./defineReactive"

export default function Observer(value) {

  def(value, '__ob__', this, false)

  this.walk(value)

}
Observer.prototype.walk = function (value) {
  Object.keys(value).forEach(key => {
    defineReactive(value, key)
  })
}


