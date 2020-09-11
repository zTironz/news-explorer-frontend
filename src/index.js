import "./style.css";
import Popup from './js/Popup';
import Header from './js/components/Header/header';
import FormValidator from './js/FormValidator';
import MainApi from "./js/api/MainApi";
import NewsApi from './js/api/NewsApi';
import ArticleList from './js/components/Articles-list/ArticlesList';
import Article from './js/components/Article/article';
import {
  popupNew,
  popupmenu,
  popupAuth,
  popupReg,
  apiOption,
  exit__button,
  exit__mob__button,
  search__button,
  input__place,
  button__more,
  result,
  token
} from './js/constants/constants';


const formEdit = document.forms.edit;
  const userValid = new FormValidator(formEdit);

userValid.setEventListeners();

const formNew = document.forms.new;
  const userRegValid = new FormValidator(formNew);

  userRegValid.setEventListeners();


const addCardPopup = new Popup(popupNew);
const addRegPopup = new Popup(popupReg);
const addAuthPopup = new Popup(popupAuth);
const addMenuPopup = new Popup(popupmenu);


const userInfoButton = document.querySelector(".user-info__button");
const popUpLinkReg = document.querySelector(".popup__link-registration");
const popUpLinkAuth = document.querySelector(".popup__link-auth");
const popUpLinkAuth2 = document.querySelector(".popup__link-auth2");
const popUpLinkMenu = document.querySelector(".popup__link-menu");
const popupMobReg = document.querySelector(".popup__menu-button");


userInfoButton.addEventListener("click", addCardPopup.open);
popUpLinkReg.addEventListener('click', addCardPopup.close);
popUpLinkReg.addEventListener("click", addRegPopup.open);
popUpLinkAuth.addEventListener('click', addRegPopup.close);
popUpLinkAuth.addEventListener("click", addAuthPopup.open);

popUpLinkAuth.addEventListener("click", addAuthPopup.close);
popUpLinkAuth.addEventListener("click", addCardPopup.open);

popUpLinkMenu.addEventListener("click", addMenuPopup.open);
popupMobReg.addEventListener("click", addMenuPopup.close);
popupMobReg.addEventListener("click", addCardPopup.open);

popUpLinkAuth2.addEventListener("click", addAuthPopup.close);
popUpLinkAuth2.addEventListener("click", addCardPopup.open);



const formSignup = document.forms.new;
const formSignin = document.forms.edit;

const mainApi = new MainApi(apiOption);
const header = new Header();
const newsApi = new NewsApi();

const errorSignup = document.querySelector('#test')
formSignup.addEventListener('submit', () => {
  event.preventDefault();
  const inputName = formSignup.elements.name.value;
  const inputPassword = formSignup.elements.password.value;
  const inputEmail = formSignup.elements.email.value;
  mainApi.signup(inputName, inputEmail, inputPassword)
  .then((res) => {
    if (res !== undefined){
    addRegPopup.close();
    addAuthPopup.open();
    }
  })
  .catch((err) => {
    errorSignup.textContent = 'Такой пользователь уже есть';
  });
});

formSignin.addEventListener('submit', () => {
  event.preventDefault();
  const inputPassword = formSignin.elements.password.value;
  const inputEmail = formSignin.elements.email.value;

  mainApi.signin(inputEmail, inputPassword)

    .then((res) => {
      localStorage.setItem('token', res.token);
      window.location.reload();
    })

    .then(() => {
      mainApi.getUserInfo().then((res) => {
        localStorage.getItem('token');
        header.addUserName(res.user.name);
        header.auth();
      })
    });

    addCardPopup.close();
})



if (token) {
  mainApi.getUserInfo().then((res) => {
    header.addUserName(res.user.name);
    header.auth();
  })
} else {
  header.unauth();
}


exit__button.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem('token');
  header.unauth();
  header.mainUnauth();
  window.location.reload();
});

exit__mob__button.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem('token');
  header.unauth();
  header.mainUnauth();
});

const article = new Article();
const articleList = new ArticleList(result, article);


search__button.disabled = false;
search__button.addEventListener('click', (event) => {
  event.preventDefault();

  const keyword = input__place.value;
  if (keyword === '') {
    input__place.placeholder = 'Нужно ввести ключевое слово';
  } else {
    articleList.notFoundOff();
    articleList.clearContent();
    articleList.preloaderOn();
    newsApi.getNews(keyword)
      .then((res) => {
        if (res.totalResults === 0) {
          console.log(res);
          articleList.preloaderOff();
          articleList.notFoundOn();
        }
        if (res.totalResults > 0) {
          console.log(res);
          articleList.preloaderOff();
          articleList.render(res.articles, keyword);
          button__more.addEventListener('click', () => {
            articleList.render(res.articles, keyword);
          });
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }
});

result.addEventListener('click', (event) => {
  event.preventDefault();
  article.save(event);
});

articleList.saveButtonUnauth();
