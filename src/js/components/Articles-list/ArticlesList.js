import {
    result,
    result__container,
    preloader,
    not__found,
    button__more
  } from '../../constants/constants';

  export default class ArticleList {
    constructor(container, article) {
      this.container = container;
      this.article = article;
    }

    preloaderOn() {
        preloader.style.display = 'block';
      }
    
      preloaderOff() {
        preloader.style.display = 'none';
      }
    
      notFoundOn() {
        not__found.style.display = 'block';
      }
    
      notFoundOff() {
        not__found.style.display = 'none';
      }
  
    addCard(data, keyword) {
      const element = this.article.create(data, keyword);
      this.container.appendChild(element);
    }
  
    render(infoArticle, keyword) {
      this.buttonResult(infoArticle);
      const arrArticles = infoArticle.splice(0, 3);
      arrArticles.forEach((item) => {
        this.addCard(item, keyword);
        result__container.style.display = 'flex';
      });
    }
  
    buttonResult(infoArticle) {
      if (infoArticle.length > 1) {
        button__more.style.display = 'flex';
      } else {
        button__more.style.display = 'none';
      }
    }
  
    clearContent() {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
        result__container.style.display = 'none';
      }
    }
  
    addSaveArticle(infoArticle) {
      const element = this.article.createSaveArticle(infoArticle);
      this.container.appendChild(element);
    }
  
    renderSaveArticle(infoArticle) {
      infoArticle.forEach((item) => {
        this.addSaveArticle(item);
      });
      result__container.style.display = 'flex';
    }
  
    saveButtonUnauth() {
      if (!localStorage.getItem('token')) {
        result.addEventListener('mouseover', (event) => {
          event.preventDefault();
          if (event.target.className === 'news__add') {
            event.target.nextElementSibling.style.display = 'flex';
          }
        });
      }
      if (!localStorage.getItem('token')) {
        result.addEventListener('mouseout', (event) => {
          event.preventDefault();
          if (event.target.className === 'news__add') {
            event.target.nextElementSibling.style.display = 'none';
          }
        });
      }
    }

  }