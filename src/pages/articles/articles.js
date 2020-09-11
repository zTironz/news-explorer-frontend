import './articles.css';
import MainApi from "../../js/api/MainApi";
import Header from '../../js/components/Header/header';
import Article from '../../js/components/Article/article';
import ArticleList from '../../js/components/Articles-list/ArticlesList';
import Popup from '../../js/Popup';
import {
    apiOption,
    exit__button,
    exit__mob__button,
    result,
    token

  } from '../../js/constants/constants';

const mainApi = new MainApi(apiOption);
const popUpLinkMenu = document.querySelector(".popup__link-menu");
const popupmenu = document.querySelector(".popup-menu");

const addMenuPopup = new Popup(popupmenu);

popUpLinkMenu.addEventListener("click", addMenuPopup.open);
const header = new Header();

if (token) {
  mainApi.getUserInfo().then((res) => {
    header.addUserName(res.user.name);
    header.authArticles();
    header.addUserNameArticles(res.user.name);
  })
} else {
  header.unauth();
}

exit__button.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = './index.html';
    header.mainUnauth();
  });
  
  exit__mob__button.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = './index.html';
    header.mainUnauth();
  });

  const api = new MainApi(apiOption);
  const article = new Article();
  const articleList = new ArticleList(result, article);

  api.getArticles()
  .then((res) => {
    articleList.renderSaveArticle(res.articles);
  });

  
  result.addEventListener('click', (event) => {
  event.preventDefault();
  article.deleteArticle(event);
});

mainApi.getArticles()
.then((res) => {
  if (res.articles.length > 0 && res.articles.length === 3) {
    document.querySelector('.saves__length').textContent = `${res.articles.length}`;
    document.querySelector('.saves__keywords').textContent = `${res.articles[0].keyword}, ${res.articles[1].keyword}, ${res.articles[2].keyword}`;
  } else if (res.articles.length > 0 && res.articles.length === 2) {
    document.querySelector('.saves__length').textContent = `${res.articles.length}`;
    document.querySelector('.saves__keywords').textContent = `${res.articles[0].keyword}, ${res.articles[1].keyword}`;
  } else if (res.articles.length > 0 && res.articles.length === 1) {
    document.querySelector('.saves__length').textContent = `${res.articles.length}`;
    document.querySelector('.saves__keywords').textContent = `${res.articles[0].keyword}`;
    console.log(res.articles[0].keyword)
  } else if (res.articles.length > 0 && res.articles.length > 3) {
    document.querySelector('.saves__length').textContent = `${res.articles.length}`;
    document.querySelector('.saves__keywords').textContent = `${res.articles[0].keyword}, ${res.articles[1].keyword} и ${res.articles.length - 2} другим.`;
  } else {
    document.querySelector('.saves__length').textContent = `нет`;
  }

})
.catch(err => console.log(err));

