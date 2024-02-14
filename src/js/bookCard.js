export default class BookCard {
  constructor(data, div) {
    this.data = data;
    this.div = div;
  }

  img(src) {
    return `<img src="${src}" alt="book's picture"/>`;
  }

  span(text) {
    return `<span>${text}</span>`;
  }

  h3(text) {
    return `<h3>${text}</h3>`;
  }

  p(text) {
    return `<p>${text}</p>`;
  }

  button(text) {
    return `<button>${text}</button>`;
  }

  createCard() {
    console.log(this.data);
    this.div.innerHTML = `${
      this.data.map((item) => {
        return (
          `
          ${this.img(item.volumeInfo.imageLinks.thumbnail)}
          <div>
          ${
          item.volumeInfo.authors.map((el) => {
            return this.span(el);
          }).join(' ')
          }
          ${this.h3(item.volumeInfo.title)}
          ${item.volumeInfo.description ? this.p(item.volumeInfo.description) : this.p(item.volumeInfo.subtitle)}
          ${this.span(item.saleInfo.saleability !== 'NOT_FOR_SALE' ? item.saleInfo.listPrice.amount : 'not for sale')}
            </div>
          `
        );
      }).join('')}`;
  }
}