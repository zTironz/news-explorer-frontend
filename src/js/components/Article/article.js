import Header from '../Header/header';
import MainApi from '../../api/MainApi';

import { apiOption } from '../../constants/constants';
import { data } from '../../utils/data';

const api = new MainApi(apiOption);
const header = new Header();

export default class Article {
  constructor() {
    this.id = '';
  }

  save(event) {
    if (event.target.classList.contains('news__add')) {
      if (header.login()) {
        const keyword = event.target
          .closest('.news__card')
          .querySelector('.news__tag-main').textContent;
        const title = event.target
          .closest('.news__card')
          .querySelector('.news__title').textContent;
        const text = event.target
          .closest('.news__card')
          .querySelector('.news__subtitle').textContent;
        const date = event.target
          .closest('.news__card')
          .querySelector('.news__date').textContent;
        const source = event.target
          .closest('.news__card')
          .querySelector('.news__source').textContent;
        const link = event.target.closest('.news__card').querySelector('.news__source').getAttribute('href');
        const image = event.target.closest('.news__card').querySelector('.news__img').getAttribute('src');
        api.createArticle({
          keyword, title, text, date, source, link, image
        })
          .then((res) => {
            if (res) {
            event.target.classList.add('news__click-add');
            event.target.classList.remove('news__add');
            // this.id = res.data._id;
            }
          })
          .catch((err) => {
            throw err;
          });
      }
    }
  }

  create(infoArticle, keyword) {
    infoArticle.publishedAt = data(infoArticle.publishedAt);
    const container = document.createElement('div');
    container.classList.add('news__card');
    const template = `
  
          <div class="news__head">
            <img src="${infoArticle.urlToImage}" alt="фоновая картинка статьи" class="news__img">
            <p class="news__tag-main">${keyword}</p>
            <button class="news__add"></button>
            <p class="news__login">Войдите, чтобы сохранять статьи</p>
          </div>
          <div class="news__main">
            <p class="news__date">${infoArticle.publishedAt}</p>
            <h4 class="news__title">${infoArticle.title}</h4>
            <p class="news__subtitle">${infoArticle.description}</p>
            <a href="${infoArticle.url}"class="news__source">${infoArticle.source.name}</a>
          </div>
       
  
  `;
    container.insertAdjacentHTML('beforeend', template);
    return container;
  }

  createSaveArticle(infoArticle) {
    infoArticle.publishedAt = data(infoArticle.publishedAt);
    const container = document.createElement('div');
    container.classList.add('news__card');
    const template = `
    <div class="article__id" card__id="${infoArticle._id}">
    <div class="news__head">
      <img src="${infoArticle.image}" alt="фоновая картинка статьи" class="news__img">
      <p class="news__tag">${infoArticle.keyword}</p>
      <p class="news__login">Убрать из сохранённых</p>
      <button class="news__del"></button>
    </div>
    <div class="news__main">
      <p class="news__date">${infoArticle.date}</p>
      <h4 class="news__title">${infoArticle.title}</h4>
      <p class="news__subtitle">${infoArticle.text}</p>
      <a href="${infoArticle.link}"class="news__source">${infoArticle.source}</a>
    </div>
    </div>`;
    container.insertAdjacentHTML('beforeend', template);
    return container;
  }

  deleteArticle(event) {
    if (event.target.classList.contains('news__del')) {
      const id = event.target.parentNode.parentNode.getAttribute('card__id');
      api.deleteArticle(id)
        .then((res) => {
          if (res) {
            const article = event.target.parentNode;
            article.parentNode.parentNode.remove(article);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  }
}