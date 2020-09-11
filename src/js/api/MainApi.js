export default class MainApi {

    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    signup(inputNameValue, inputEmailValue, inputPasswordValue) {
        const test = 'http://localhost:3000';
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "name": inputNameValue,
              "email": inputEmailValue,
              "password": inputPasswordValue
            })
          })
          .then(res => this.getResponseJson(res)
        )
            .catch((err) => {
              throw err;
            });
      }

      signin(inputEmailValue, inputPasswordValue) {
        const test = 'http://localhost:3000';
        return fetch(`${this.baseUrl}/signin`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": inputEmailValue,
            "password": inputPasswordValue
          }),
        })
        .then(res => this.getResponseJson(res)
        )
            .catch((err) => {
              throw err;
            });
      }

    
      getResponseJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

      getUserInfo() {
        const test = 'http://localhost:3000';
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
          headers: {
              'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
          .then(res => this.getResponseJson(res)
          )
          .catch((err) => console.log(err));
      }

     

      createArticle({keyword, title, text, date, source, link, image}) {
        return fetch(`${this.baseUrl}/articles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ keyword, title, text, date, source, link, image }),
        })
        .then(res => this.getResponseJson(res)
        )
          .catch((err) => console.log(err));
      }

      getArticles() {
        return fetch(`${this.baseUrl}articles`, {
          method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => this.getResponseJson(res)
        )
        .catch((err) => console.log(err));
      }

      deleteArticle(id) {
        return fetch(`${this.baseUrl}/articles/${id}`, {
            method: "DELETE",
            headers: this.headers,
          })
          .then(res => this.getResponseJson(res)
        )
            .catch((err) => {
              throw err;
            });
      }

  }