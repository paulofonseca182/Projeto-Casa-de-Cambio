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
    .then((data) => [Object.entries(data.rates)].forEach((a) => {
      a.forEach((b) => {
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
    }));
};

getbtn.addEventListener('click', (e) => {
  e.preventDefault();

  const coin = getCoin.value;
  const upperCase = coin.toUpperCase();

  const newtitle = document.createElement('p');
  newtitle.innerText = `Valores referentes a 1 ${upperCase}.`;
  textCoin.appendChild(newtitle);

  fetchApi();
});
