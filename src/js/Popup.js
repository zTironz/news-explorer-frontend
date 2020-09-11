export default class PopupAuth {
  constructor(popup) {
    this.popup = popup;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.addListeners();
    this.popup.classList.add("popup_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
  }

  addListeners() {
    this.popup
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
  }

  
}
