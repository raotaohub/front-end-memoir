/*
 * @Author: raotaohub
 * @Date: 2021-02-25 16:59:28
 * @LastEditTime: 2021-02-25 19:57:22
 * @LastEditors: raotaohub
 * @FilePath: \Speaking-JavaScript\Promise\easy.js
 * @Description: Edit......
 */

function Promise(fn) {
  const self = this;
  const PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected";

  this.PromiseState = PENDING;
  this.PromiseReason = null;
  this.callbacks = [];

  function resolve(value) {
    if (self.PromiseState === PENDING) {
      self.PromiseState = FULFILLED;
      self.PromiseReason = value;
      self.callbacks.forEach((cb) => {
        cb.onResolve(value);
      });
    }
  }

  function reject(value) {
    if (self.PromiseState === PENDING) {
      self.PromiseState = REJECTED;
      self.PromiseReason = value;
      self.callbacks.forEach((cb) => {
        cb.onReject(value);
      });
    }
  }

  try {
    fn(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

Promise.prototype.then = function (onResolve, onReject) {
  const self = this;

  if (typeof onResolve !== "function") {
    onResolve = (value) => {
      return value;
    };
  }

  if (typeof onReject !== "function") {
    onReject = (value) => {
      throw value;
    };
  }

  return new Promise((resolve, reject) => {
    function callback(type) {
      let tiemr = setTimeout(() => {
        try {
          let result = type(self.PromiseReason);
          if (result instanceof Promise) {
            result.then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          } else {
            resolve(result);
          }
          // clearTimeout(tiemr);
        } catch (err) {
          reject(err);
          // clearTimeout(tiemr);
        }
      });
    }

    if (this.PromiseState === "fulfilled") {
      callback(onResolve);
    }

    if (this.PromiseState === "rejected") {
      callback(onReject);
    }

    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolve: function () {
          callback(onResolve);
        },
        onReject: function () {
          callback(onReject);
        },
      });
    }
  });
};

Promise.prototype.catch = function (onReject) {
  return this.then(undefined, onReject);
};

Promise.prototype.resolve = function (value) {
  return new Promise((resolve, reject) => {
    try {
      if (value instanceof Promise) {
        value.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        resolve(value);
      }
    } catch (error) {
      reject(error);
    }
  });
};

Promise.prototype.reject = function (value) {
  return new Promise((undefined, reject) => {
    reject(value);
  });
};
