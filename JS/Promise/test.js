function Promise(fn) {
  console.log(this);
  if (typeof this !== "object") {
    throw new TypeError("Promises must be constructed via new");
  }
  if (typeof fn !== "function") {
    throw new TypeError("Promise constructor's argument is not a function");
  }
  this._deferredState = 0;
  this._state = 0;
  this._value = null;
  this._deferreds = null;
}

console.log("start");

const p = Promise();
