export default class GenreList {
  constructor(data, listBlock, circle) {
    this.data = data;
    this.listBlock = listBlock;
    this.circle = circle;
    this.activeIndex = 0;
  }

  createList() {
    this.listBlock.innerHTML = `
      ${this.data.map((item, index) => {
    return `<li class="books-list__item ${index === this.activeIndex ? 'active' : ''}" data-index="${index}">${item}</li>`;
  }).join('')}
  `;
  }

  moveCircle(index) {
    const k = 38;
    this.circle.style.transform = `translateY(${k*index}px)`;
  }

  setActive(items) {
    items.forEach(el => {
      if(+el.dataset.index === this.activeIndex) {
        el.classList.add('active');
        this.moveCircle(this.activeIndex);
      }
      else el.classList.remove('active');
    });
  }

  setListener(items) {
    items.forEach(el => {
      el.addEventListener('click', () => {
        this.activeIndex = +el.dataset.index;
        this.setActive(items);
      });
    });
  }
}
