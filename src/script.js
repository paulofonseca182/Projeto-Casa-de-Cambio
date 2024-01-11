import './style.css';
import Swal from 'sweetalert2';

const getbtn = document.getElementById('btn-search');
const getCoin = document.getElementById('coin');
const textCoin = document.getElementById('text-coin');
const listCoins = document.getElementById('list-coins');

const fetchApi = () => {
  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?from=${getCoin.value}`)
    .then((resp) => resp.json())
    .then((data) => {
      const coin = getCoin.value;
      const upperCase = coin.toUpperCase();
      const newtitle = document.createElement('p');
      newtitle.classList.add('title');
      newtitle.innerText = `Valores referentes a 1 ${upperCase}.`;
      [Object.entries(data.rates)].forEach((a) => {
        a.forEach((b) => {
          textCoin.appendChild(newtitle);
          const divCoins = document.createElement('div');
          divCoins.classList.add('list');
          listCoins.appendChild(divCoins);

          const coinsName = document.createElement('p');
          coinsName.innerText = `${b[0]}:`;
          coinsName.classList.add('name');
          divCoins.appendChild(coinsName);

          const coinsvalue = document.createElement('p');
          coinsvalue.innerText = `${b[1]}`;
          coinsvalue.classList.add('value');
          divCoins.appendChild(coinsvalue);
        });
      });
    })
    .catch(() => {
      Swal.fire({
        title: 'Ops...',
        text: 'Moeda nao existente',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
};

const clearField = () => {
  while (listCoins.firstChild) {
    listCoins.removeChild(listCoins.firstChild);
  }
  while (textCoin.firstChild) {
    textCoin.removeChild(textCoin.firstChild);
  }
};

getbtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearField();
  if (!getCoin.value) {
    Swal.fire({
      title: 'Ops ...',
      text: 'Voce precisa passar uma moeda',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
  if (getCoin.value) {
    fetchApi();
  }
});
