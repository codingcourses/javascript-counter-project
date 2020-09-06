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
    this.onChange(this.count);
  }

  decrement() {
    this.count--;
    this.onChange(this.count);
  }

  reset() {
    this.count = 0;
    this.onChange(this.count);
  }

  bindOnChange(callback) {
    this.onChange = callback;
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
    this.reset = this.getElement('#reset');
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  updateCount(count) {
    this.count.textContent = count;
  }

  bindIncrement(handler) {
    this.plus.addEventListener('click', () => {
      handler();
    });
  }

  bindDecrement(handler) {
    this.minus.addEventListener('click', () => {
      handler();
    });
  }

  bindReset(handler) {
    this.reset.addEventListener('click', () => {
      handler();
    });
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

    this.model.bindOnChange(this.onCountChanged);
    this.view.bindIncrement(this.handleIncrement);
    this.view.bindDecrement(this.handleDecrement);
    this.view.bindReset(this.handleReset);
  }

  onCountChanged = count => {
    this.view.updateCount(count);
  }

  handleIncrement = () => {
    this.model.increment();
  }

  handleDecrement = () => {
    this.model.decrement();
  }

  handleReset = () => {
    this.model.reset();
  }
}

const app = new Controller(new Model(), new View());
