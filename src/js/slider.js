export default class Slider {
  constructor(dots, sliderBlocks) {
    this.dots = dots;
    this.sliderBlocks = sliderBlocks;
    this._indexInterval = 2;
    this.interval;
  }

  moveSilder(index) {
    this.sliderBlocks.forEach((block) => {
      if(+block.dataset.index === index) {
        block.classList.remove('disabled');
      } else {
        block.classList.add('disabled');
      }
    });
    this.dots.querySelectorAll('.slider-dots__dot').forEach((dot) => {
      if(+dot.dataset.index === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    clearInterval(this.interval);
    this.sliderInterval();
  }

  initDots() {
    this.dots.querySelectorAll('.slider-dots__dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        this.moveSilder(+dot.dataset.index);
        dot.classList.add('active');
      });
    });
  }

  sliderInterval() {
    this.interval = setInterval(() => {
      this.moveSilder(this._indexInterval);
      if(this._indexInterval < 3) {
        this._indexInterval++;
      } else {
        this._indexInterval = 1;
      }
    }, 5000);
  }
}