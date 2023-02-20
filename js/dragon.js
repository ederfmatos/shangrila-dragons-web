export class Dragon {
  selected = false;
  visible = true;

  constructor(type, element) {
    this.type = type;
    this.element = element;
  }

  click() {
    if (this.selected) {
      this.element.src = "./img/green-dragon.png";
      this.selected = false;
      return -1;
    }

    this.element.src = "./img/selected-green-dragon.png";
    this.selected = true;
    return 1;
  }

  remove() {
    this.visible = false;
    this.element.style.opacity = 0;
  }
}
