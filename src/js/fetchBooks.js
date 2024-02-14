export default class FetchBooks {
  constructor(key, genre) {
    this.base_url = `https://www.googleapis.com/books/v1/volumes?q="subject:${genre}"&key=${key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
  }

  async fetchData() {
    let booksData = await fetch(this.base_url);
    let booksJson = await booksData.json();
    return booksJson;
  }
}