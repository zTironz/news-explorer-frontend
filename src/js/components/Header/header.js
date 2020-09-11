import {

    header__unauth,
    header__auth,
    header__savearticles,
    header__savemobarticles,
    header__username,
    header__mobunauth,
    header__mobauth,
    header__mob__username,
    save__name
  } from '../../constants/constants';
  
  export default class Header {

  
    mainUnauth() {
      header__unauth.style.display = 'inline-flex';
    }
  
    auth() {
      header__auth.style.display = 'inline-flex';
      header__savearticles.style.display = 'inline-flex';
      header__unauth.style.display = 'none';
      header__savemobarticles.style.display = 'inline-flex';
      header__mobunauth.style.display = 'none';
      header__mobauth.style.display = 'inline-flex';
    }

    authArticles() {
      header__mobunauth.style.display = 'none';
      header__mobauth.style.display = 'inline-flex';
      header__savemobarticles.style.display = 'none';
    }
  
    unauth() {
      header__auth.style.display = 'none';
      header__mobunauth.style.display = 'flex';
      header__savearticles.style.display = 'none';
      header__savemobarticles.style.display = 'none';
      header__mobauth.style.display = 'none';
    }
  
    login() {
      return localStorage.getItem('token');
    }
  
    addUserName(name) {
      header__username.textContent = name;
      header__mob__username.textContent = name;
    }
    addUserNameArticles(name) {
      save__name .textContent = name;
    }
  }