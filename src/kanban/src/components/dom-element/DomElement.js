export default class DomElement {
  constructor({ type, className = '', html = '', value = ''}) {
    this.element = document.createElement(type);
    this.element.innerHTML = html;
    this.element.value = value;

    className.split(" ").forEach(this.addClass.bind(this));
  }

  addClass(className) {
    if (className) this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }

  removeElement() {
    this.element.remove();
  }

  appendToElement(target) {
    target.appendChild(this.element);
  }
}
