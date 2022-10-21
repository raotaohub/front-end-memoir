function traverse(list, length, cb) {
  let i = 0;
  while (length--) {
    cb(list[i++]);
  }
}

const list = [1, 2, 3, 4, 5, 6];
traverse(list, list.length, console.log);
