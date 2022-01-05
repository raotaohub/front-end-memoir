class Modal {
  private instance = null;

  constructor() {}
  getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Modal();
    return this.instance;
  }
}
