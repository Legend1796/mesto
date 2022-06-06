//не готов
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

  }

  addtItem(element) {
    this._container.append(element);
  }

  renderItems() {
    // this.cle ar();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}