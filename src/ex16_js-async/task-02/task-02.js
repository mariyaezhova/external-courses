const board = document.querySelector('.board__animals');
const inputEl = document.querySelector('.board__search-animals');

const serverRequest = () => {
  fetch('http://localhost:3000/get')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const findedEl = data.filter(elem => elem.match(inputEl.value));

      findedEl.forEach((el) => {
        const searchResult = document.createElement('option');

        searchResult.innerHTML = el;
        board.append(searchResult);
      });
    });
};

const debounce = (func, ms) => {
  return function () {
    let previousCall = this.lastCall;

    this.lastCall = Date.now();
    if (previousCall && ((this.lastCall - previousCall) <= ms)) {
      clearTimeout(this.lastCallTimer);
    }

    this.lastCallTimer = setTimeout(() => func(), ms);
  }
}

inputEl.addEventListener('input', debounce(serverRequest, 2000));
