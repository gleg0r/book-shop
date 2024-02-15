export default class BookCard {
  constructor(data, div) {
    this.data = data;
    this.div = div;
  }

  img(src) {
    return `<img class="books-cards__img" src="${src}" alt="book's picture"/>`;
  }

  span(text, className) {
    return `<span class="${className}">${text}</span>`;
  }

  h3(text) {
    return `<h3 class="books-cards__title">${text}</h3>`;
  }

  p(text) {
    const cutText = () => {
      let cut = text.slice(0, 100) + '...';
      return cut;
    };
    return `<p class="books-cards__desc">${cutText()}</p>`;
  }

  button(text, className) {
    return `<button class="${className}">${text}</button>`;
  }

  createCard() {
    console.log(this.data);
    this.div.innerHTML = `${
      this.data.map((item) => {
        return (
          `<div class="books-cards__item"> 
          ${this.img(item.volumeInfo.imageLinks.thumbnail)}
          <div class="books-cards__text">
          ${
          item.volumeInfo.authors.map((el) => {
            return this.span(el, 'books-cards__author');
          }).join(' ')
          }
          ${this.h3(item.volumeInfo.title)}
          ${item.volumeInfo.description ? this.p(item.volumeInfo.description) : this.p(item.volumeInfo.subtitle)}
          ${this.span((item.saleInfo.saleability !== 'NOT_FOR_SALE' ? item.saleInfo.listPrice.amount + ' руб.' : 'not for sale'), 'books-cards__sale')}
          ${this.button('buy now', 'books-cards__buyBtn')}
            </div>
          </div>`
        );
      }).join('')}`;
  }
}

//110