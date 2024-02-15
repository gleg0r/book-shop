import './scss/index.scss';
import '../index.html';
import Slider from './js/slider';
import BookCard from './js/bookCard';
import GenreList from './js/genreList';
import FetchBooks from './js/fetchBooks';
import { genreData } from './db/genreData';
import { API_KEY } from './api/api'; 

const sliderDots = document.querySelector('.slider-dots');
const sliderBlock = document.querySelectorAll('.slider-block');
const listBlock = document.querySelector('.books-list');
const circle = document.querySelector('.books__circle');
const cards = document.querySelector('.books-cards');

const genreList = new GenreList(genreData, listBlock, circle);
const slider = new Slider(sliderDots, sliderBlock);
const fetchData = new FetchBooks(API_KEY, 'Architecture');
let jsonData;
let bookCards;


genreList.createList();
const listItems = document.querySelectorAll('.books-list__item');

setTimeout(() => {
  genreList.setListener(listItems);
}, 500);

const getJsonData = async() => {
  jsonData = await fetchData.fetchData();
  
  return await jsonData;
};

getJsonData();

setTimeout(() => {
  if(jsonData) {
    bookCards = new BookCard(jsonData.items, cards);
    bookCards.createCard();
  }
}, 1000);

slider.initDots();
slider.sliderInterval();


bookCards.createCard();