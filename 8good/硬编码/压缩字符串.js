function reduce(str) {
  let win = [],
    prevC,
    curC,
    nextC,
    result = "";

  for (let i = 0; i < str.length; i++) {
    prevC = str[i - 1];
    curC = str[i];
    nextC = str[i + 1];

    if (prevC !== curC && nextC !== curC) {
      result += curC;
    } else {
      win.push(curC);

      if (!nextC || nextC !== curC) {
        result += `${win.length}${curC}`;
        win = [];
      }
    }
  }

  return result;
}
console.log(reduce("abcdd"));
console.log(reduce("aaaaa"));

// 2. 单词前后缀检索

function Words(data) {
  this.data = data;
  this.hash = new Map();
  this.lHash = new Map();
  this.rHash = new Map();
}

//
Words.prototype.findWords = function findWords() {};
const data = ["apple", "banna", "expire"];
const word = new Words();

word.findWords("a", "e");
