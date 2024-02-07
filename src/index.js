import './scss/index.scss';
import '../index.html';
import Slider from './js/slider';

const sliderDots = document.querySelector('.slider-dots');
const sliderBlock = document.querySelectorAll('.slider-block');

const slider = new Slider(sliderDots, sliderBlock);

slider.initDots();
//slider.sliderInterval();
