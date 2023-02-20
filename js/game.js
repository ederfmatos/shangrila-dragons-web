import { Dragon } from "./dragon.js";

class Game {
  dragons = [];
  quantityOfSelectedDragons = 0;
  dragonsListElement = document.querySelector("#dragons");

  constructor() {
    this.setupDragons();
    this.setupRemoveButtonElement();
  }

  setupDragons() {
    for (let index = 0; index < 14; index++) {
      const element = this.createListItemElement(index, "green");
      this.dragons.push(new Dragon("green", element));
    }

    const element = this.createListItemElement(14, "red");
    this.dragons.push(new Dragon("red", element));
  }

  createListItemElement(index, type) {
    const element = document.createElement("li");
    element.setAttribute("index", index);

    const imageElement = document.createElement("img");

    if (type === "green") {
      imageElement.src = "./img/green-dragon.png";
    } else {
      imageElement.src = "./img/red-dragon.png";
    }

    imageElement.addEventListener("click", this.dragonClicked.bind(this));

    element.appendChild(imageElement);
    this.dragonsListElement.appendChild(element);
    return imageElement;
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

    const dragonIndex = event.target.parentNode.getAttribute("index");
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

    this.quantityOfSelectedDragons = 0;
    this.changeStateRemoveButton();
  }
}

new Game();
