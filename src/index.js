import "./style.css";
import PopupAuth from './js/Popup';
// import PopupReg from './js/Popup';

const popupNew = document.querySelector(".popup-auth");
const addCardPopup = new PopupAuth(popupNew);

const popupReg = document.querySelector(".popup-reg");
const addRegPopup = new PopupAuth(popupReg);

const popupmenu = document.querySelector(".popup-menu");
const addMenuPopup = new PopupAuth(popupmenu);

const popupAuth = document.querySelector(".popup__success");
const addAuthPopup = new PopupAuth(popupAuth);




  
const userInfoButton = document.querySelector(".user-info__button");
const popUpLinkReg = document.querySelector(".popup__link-registration");
const popUpLinkAuth = document.querySelector(".popup__link-auth");
const popUpLinkMenu = document.querySelector(".popup__link-menu");

userInfoButton.addEventListener("click", addCardPopup.open);
popUpLinkReg.addEventListener("click", addRegPopup.open);
popUpLinkAuth.addEventListener("click", addAuthPopup.open);
popUpLinkMenu.addEventListener("click", addMenuPopup.open);

  

popupNew.addEventListener('click', () => {
    popupNew.classList.remove('popup_is-opened');
  });

  popupReg.addEventListener('click', () => {
    popupReg.classList.remove('popup_is-opened');
  });

