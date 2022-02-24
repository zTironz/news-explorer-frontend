import { formatDate } from '../../js/utils/formatDate';

const datacreate = formatDate();
const datanow = new Date().toISOString();

export default class NewsApi {
  constructor() {
    this.apikey = '0a47075e387044a3baacb9cb2cb020af';
  }

  getNews(UserKeyWord) {
    return fetch(`https://newsapi.org/v2/everything?q=${UserKeyWord}&from=${datacreate}&sortBy=${datanow}&pageSize=100&apiKey=${this.apikey}`, {
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }
}