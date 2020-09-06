/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}

/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
  constructor() {
    this.count = this.getElement('#count');
    this.minus = this.getElement('#minus');
    this.plus = this.getElement('#plus');
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  updateCount(count) {
    this.count.value = count;
  }

  bindIncrement(handler) {
    this.plus.addEventListener('click', handler);
  }

  bindDecrement(handler) {
    this.minus.addEventListener('click', handler);
  }

  bindReset(handler) {
    this.reset.addEventListener('click', handler);
  }
}

/**
 * @class Controller
 *
 * Links the model and the view.
 *
 * @param model
 * @param view
 */
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  handleIncrement() {
    this.model.increment();
  }

  handleDecrement() {
    this.model.decrement();
  }

  handleReset() {
    this.model.reset();
  }
}

const app = new Controller(new Model(), new View());
