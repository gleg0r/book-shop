export default class Slider {
  constructor(dots, sliderBlocks) {
    this.dots = dots;
    this.sliderBlocks = sliderBlocks;
  }

  moveSilder(index) {
    this.sliderBlocks.forEach((block) => {
      if(block.dataset.index === index) {
        block.classList.remove('disabled');
      } else {
        block.classList.add('disabled');
      }
    });
    this.dots.querySelectorAll('.slider-dots__dot').forEach((dot) => {
      if(dot.dataset.index === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  initDots() {
    this.dots.querySelectorAll('.slider-dots__dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        this.moveSilder(dot.dataset.index);
        dot.classList.add('active');
      });
    });
  }
}