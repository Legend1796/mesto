

//не готов
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addtItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}