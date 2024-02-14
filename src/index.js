import './scss/index.scss';
import '../index.html';
import Slider from './js/slider';
import { genreData } from './db/genreData';
import GenreList from './js/genreList';

const sliderDots = document.querySelector('.slider-dots');
const sliderBlock = document.querySelectorAll('.slider-block');
const listBlock = document.querySelector('.books-list');

const genreList = new GenreList(genreData, listBlock);
const slider = new Slider(sliderDots, sliderBlock);

slider.initDots();
slider.sliderInterval();

genreList.createList();