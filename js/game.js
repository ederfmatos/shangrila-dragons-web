import { Dragon } from "./dragon.js";
import { Clock } from "./clock.js";

class Game {
  dragons = [];
  quantityOfSelectedDragons = 0;
  dragonsListElement = document.querySelector("#dragons");

  constructor() {
    this.setupDragons();
    this.setupRemoveButtonElement();
    this.clock = new Clock();
    this.clock.start();
  }

  setupDragons() {
    const elements = this.dragonsListElement.querySelectorAll(".dragon");

    for (const element of elements) {
      const type = element.getAttribute("type");
      if (type === "green") {
        element.addEventListener("click", this.dragonClicked.bind(this));
      }
      this.dragons.push(new Dragon(type, element));
    }
  }

  setupRemoveButtonElement() {
    this.removeButtonElement = document.querySelector("button");
    this.removeButtonElement.addEventListener(
      "click",
      this.removeDragons.bind(this)
    );
  }

  dragonClicked(event) {
    event.preventDefault();
    event.stopPropagation();

    const dragonIndex = event.target.getAttribute("index");
    if (!dragonIndex) return;

    const dragon = this.dragons[dragonIndex];
    if (!dragon.visible) return;

    if (this.quantityOfSelectedDragons >= 3 && !dragon.selected) {
      alert("É permitido selecionar apenas 3 dragões por rodada.");
      return;
    }

    const selected = dragon.click();
    this.quantityOfSelectedDragons += selected;

    this.changeStateRemoveButton();
  }

  changeStateRemoveButton() {
    if (this.quantityOfSelectedDragons > 0) {
      this.removeButtonElement.removeAttribute("disabled");
    } else {
      this.removeButtonElement.setAttribute("disabled", "true");
    }
  }

  removeDragons() {
    for (const dragon of this.dragons) {
      if (dragon.visible && dragon.selected) {
        dragon.remove();
      }
    }
    this.clock.reset();
    this.quantityOfSelectedDragons = 0;
    this.changeStateRemoveButton();
  }
}

new Game();
