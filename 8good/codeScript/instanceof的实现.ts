function _instanceof(A, B) {
  let prototype = B.prototype;
  // A = A.__proto__;
  A = Object.getPrototypeOf(A);
  while (true) {
    if (A === null) {
      return false;
    }
    if (A === prototype) {
      return true;
    }
    A = A.__proto__;
  }
}
