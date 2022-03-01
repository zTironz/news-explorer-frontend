import { formatDate } from '../../js/utils/formatDate';

const datacreate = formatDate();
const datanow = new Date().toISOString();

export default class NewsApi {
  constructor() {
    this.apikey = 'abfd7572d42a46a1922889a2580248d3';
  }

  getNews(UserKeyWord) {
    return fetch(`https://nomoreparties.co/news/v2/everything?q=${UserKeyWord}&from=${datacreate}&sortBy=${datanow}&pageSize=100&apiKey=${this.apikey}`, {
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }
}