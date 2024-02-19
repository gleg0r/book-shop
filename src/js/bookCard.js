import { genreData } from '../db/genreData';

export default class BookCard {
  constructor(div, key, badge) {
    this.data;
    this.API_KEY = key;
    this.div = div;
    this.maxResults = 6;
    this.genreData = genreData;
    this.genreIndex = 0;
    this.badge = badge;
    this.indexInTheCart = [];
  }

  async fetchData() {
    let genre = this.genreData[this.genreIndex];
    let booksData = await fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${genre}"&key=${this.API_KEY}&printType=books&startIndex=0&maxResults=${this.maxResults}&langRestrict=en`);
    let booksJson = await booksData.json();
    this.data = booksJson;
    this.badge.innerHTML = 0;
    this.badge.style.display = 'none';
  }

  img(src) {
    return `<img class="books-cards__img" src="${src}" alt="no picture yet"/>`;
  }

  span(text, className) {
    return `<span class="${className}">${text !== undefined ? text : 'not for sale'}</span>`;
  }

  h3(text) {
    return `<h3 class="books-cards__title">${text}</h3>`;
  }

  p(text) {
    const cutText = () => {
      if(text.length > 100) {
        let cut = text.slice(0, 100) + '...';
        return cut;
      }     
      else {
        return text;
      }

    };
    return `<p class="books-cards__desc">${text !== undefined ? cutText() : 'without desctiption'}</p>`;
  }

  button(text, className, index) {
    return `<button class="${className}" data-index="${index}">${text}</button>`;
  }

  createCard() {
    this.div.innerHTML = `${
      this.data.items.map((item, index) => {
        return (
          `<div class="books-cards__item"> 
            ${this.img(item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.thumbnail : './src/file.png')}
            <div class="books-cards__text">
              <div class="books-cards__authors">
                ${
          item.volumeInfo.authors.map((el) => {
            return this.span(el, 'books-cards__author');
          }).join(' ')
          }
              </div>
          ${this.h3(item.volumeInfo.title)}
          ${item.volumeInfo.description ? this.p(item.volumeInfo.description) : item.volumeInfo.subtitle ? this.p(item.volumeInfo.subtitle) : 'no description yet'}
          ${this.span((item.saleInfo.saleability !== 'NOT_FOR_SALE' ? item.saleInfo.saleability !== 'FREE' ? item.saleInfo.listPrice.amount + ' руб.' : 'free' : 'not for sale'), 'books-cards__sale')}
          ${this.button('buy now', 'books-cards__buyBtn', index)}
            </div>
          </div>`
        );
      }).join('')}
      <div class="books-cards__load">
        <button id="loadBtn" class="books-cards__buyBtn">load more</button>
      </div>
      `;
    this.loadOnClick();
    this.setListener();
  }

  async refreshCards() {
    this.maxResults = this.maxResults + 6;
    if(this.maxResults > 40) {
      this.maxResults = 40;
    }
    await this.fetchData(this.genreIndex);
    this.createCard();
  }

  loadOnClick() {
    const loadBtn = document.getElementById('loadBtn');
    loadBtn.addEventListener('click', () => this.refreshCards());
  }

  setListener() {
    const buyBtns = document.querySelectorAll('.books-cards__buyBtn');
    buyBtns.forEach((el, index) => {
      el.addEventListener('click', () => {
        if(index === +el.dataset.index) {
          if(el.className === 'books-cards__buyBtn') {
            el.classList.remove('books-cards__buyBtn');
            el.classList.add('books-cards__cartBtn');
            el.innerHTML = 'in the cart';
            this.badge.style.display = 'block';
            let count = this.badge.innerHTML;
            count = +count;
            this.badge.innerHTML = count + 1;
          } else {
            el.classList.remove('books-cards__cartBtn');
            el.classList.add('books-cards__buyBtn');
            el.innerHTML = 'buy now';
            let count = this.badge.innerHTML;
            count = +count;
            this.badge.innerHTML = count - 1;
          }
          if(this.badge.innerHTML === '0') {
            this.badge.style.display = 'none';
          }
        }
      });
    });
  }

  setGenreIndex(index) {
    this.genreIndex = index;
    this.maxResults = 6;
  }
}

//linear-gradient(90deg, $starActive 50%, $starNonActive 50%)