export default class GenreList {
  constructor(data, listBlock) {
    this.data = data;
    this.listBlock = listBlock;
  }

  createList() {
    this.listBlock.innerHTML = 
    `<ul>
        ${this.data.map((item) => {
    return (`<li>${item}</li>`);
  })}
    </ul>`;
  }
}


// Министерство строительсвто и ЖКХ раздел ценообразования
// Федеральной государственной ифнормационной системы ценообразования в строительстве (ФГИС ЦС)
// Официальный сайт комитета города Москвы по ценовой политике и государственной экспертизе проектов