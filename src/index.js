import './scss/index.scss';
import '../index.html';
import Slider from './js/slider';
import BookCard from './js/bookCard';
import GenreList from './js/genreList';
import { genreData } from './db/genreData';
import { API_KEY } from './api/api'; 

const sliderDots = document.querySelector('.slider-dots');
const sliderBlock = document.querySelectorAll('.slider-block');
const listBlock = document.querySelector('.books-list');
const circle = document.querySelector('.books__circle');
const cards = document.querySelector('.books-cards');
const badge = document.querySelector('.header__badge');

const bookCards = new BookCard(cards, API_KEY, badge);
const genreList = new GenreList(bookCards, genreData, listBlock, circle);
const slider = new Slider(sliderDots, sliderBlock);
localStorage.setItem('genre', 0);


genreList.createList();
const listItems = document.querySelectorAll('.books-list__item');

setTimeout(() => {
  genreList.setListener(listItems);
}, 500);

bookCards.fetchData(localStorage.getItem('genre'));

setTimeout(() => {
  bookCards.createCard();
}, 1000);

slider.initDots();
slider.sliderInterval();


bookCards.createCard();

