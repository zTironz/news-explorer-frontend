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
  let keywordsArr = [];
  res.articles.forEach((item) => {
    keywordsArr.push(item.keyword);
  });
  const keywords = {};
  keywordsArr.forEach((item) => {
      if (keywords[item]) {
        keywords[item] += 1;
      } else {
        keywords[item] = 1;
      }
    });
    
const words = Object.keys(keywords).sort((a, b) => keywords[b] - keywords[a]);
console.log(keywords);
  if (words.length > 0 && words.length === 3) {
    document.querySelector('.saves__length').textContent = `${res.articles.length}`;
    document.querySelector('.saves__keywords').textContent = `${words[0]}, ${words[1]}, ${words[2]}`;
  } else if (words.length > 0 && words.length === 2) {
    document.querySelector('.saves__length').textContent = `${res.articles.length}`;
    document.querySelector('.saves__keywords').textContent = `${words[0]}, ${words[1]}`;
  } else if (words.length > 0 && words.length === 1) {
    document.querySelector('.saves__length').textContent = `${res.articles.length}`;
    document.querySelector('.saves__keywords').textContent = `${words[0]}`;
  } else if (words.length> 0 && words.length > 3) {
    document.querySelector('.saves__length').textContent = `${res.articles.length}`;
    document.querySelector('.saves__keywords').textContent = `${words[0]}, ${words[1]} и ${words.length - 2} другим.`;
  } else {
    document.querySelector('.saves__length').textContent = `нет`;
  }

})
.catch(err => console.log(err));

