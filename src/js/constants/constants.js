const popupNew = document.querySelector(".popup-auth");
const popupReg = document.querySelector(".popup-reg");
const popupAuth = document.querySelector(".popup__success");
const popupmenu = document.querySelector(".popup-menu");
const header__username = document.querySelector('.header__user-name');
const header__mob__username = document.querySelector('.header__mob-user-name');
const header__auth = document.querySelector('.header__name');
const header__mobauth = document.querySelector('.header__mob-name');
const header__savearticles = document.querySelector('.header__article');
const header__savemobarticles = document.querySelector('.header__mob-article');
const header__unauth = document.querySelector('.header__auth');
const header__mobunauth = document.querySelector('.header__mob-auth');
const exit__button = document.querySelector('.header__logout');
const exit__mob__button = document.querySelector('.header__mob-logout');
const preloader = document.querySelector('.preloader');
const search__button = document.querySelector('.search__button');
const input__place = document.querySelector('.search__input');
const button__more = document.querySelector('.news__more');
const save__name = document.querySelector('.saves__name');
const result = document.querySelector('.news__cards');
const not__found = document.querySelector('.not-found');
const result__container = document.querySelector('.news');
const news__card = document.querySelector('.news__card');
const token = localStorage.getItem('token');


const apiOption = {
    baseUrl: 'https://api.tiron.dev/',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  };

export {
    popupNew,
    popupReg,
    popupAuth,
    popupmenu,
    apiOption,
    header__username,
    header__auth,
    header__savearticles,
    header__unauth,
    exit__button,
    preloader,
    search__button,
    input__place,
    button__more,
    header__savemobarticles,
    header__mobunauth,
    header__mobauth,
    header__mob__username,
    exit__mob__button,
    save__name,
    result,
    not__found,
    result__container,
    news__card,
    token
}