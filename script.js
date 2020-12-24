class Model {
  #data;
  #onChange;

  constructor() {
    this.#data = Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0;
    this.#onChange = () => {};
  }

  increment() {
    this.#data++;
    this.save();
    this.#onChange(this.#data);
  }

  decrement() {
    this.#data--;
    this.save();
    this.#onChange(this.#data);
  }

  reset() {
    this.#data = 0;
    this.save();
    this.#onChange(this.#data);
  }

  save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, this.#data);
  }

  bindOnChange(handler) {
    this.#onChange = handler;
  }

  initialize() {
    this.#onChange(this.#data);
  }
}

class View {
  #count;
  #plus;
  #minus;
  #reset;

  constructor() {
    this.#count = View.getElement('#count');
    this.#plus = View.getElement('#plus');
    this.#minus = View.getElement('#minus');
    this.#reset = View.getElement('#reset');
  }

  static getElement(selector) {
    const elem = document.querySelector(selector);
    return elem;
  }

  bindIncrement(handler) {
    this.#plus.addEventListener('click', () => handler());
  }

  bindDecrement(handler) {
    this.#minus.addEventListener('click', () => handler());
  }

  bindReset(handler) {
    this.#reset.addEventListener('click', () => handler());
  }

  updateCount(count) {
    this.#count.textContent = count;
  }
}

class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#model.bindOnChange(this.onCountChange);

    this.#view.bindIncrement(this.onIncrement);
    this.#view.bindDecrement(this.onDecrement);
    this.#view.bindReset(this.onReset);

    this.#model.initialize();
  }

  onIncrement = () => this.#model.increment();

  onDecrement = () => this.#model.decrement();

  onReset = () => this.#model.reset();

  onCountChange = count => this.#view.updateCount(count);
}

const LOCAL_STORAGE_KEY = 'CounterProject';

const app = new Controller(new Model(), new View);
