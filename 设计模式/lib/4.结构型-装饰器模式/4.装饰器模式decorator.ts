class Decorator {
  private target: any;
  constructor(target) {
    this.target = target;
  }

  writeEnglish() {
    this.target.writeChinese();
    console.log("写英文");
  }
}

class Raotao {
  writeChinese() {
    console.log("写中文");
  }
}

const raotao = new Raotao();

raotao.writeChinese();

const decorator = new Decorator(raotao);

decorator.writeEnglish();
