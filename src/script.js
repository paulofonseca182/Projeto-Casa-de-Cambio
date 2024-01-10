import './style.css';

const getbtn = document.getElementById('btn-search');
const getCoin = document.getElementById('coin');
const textCoin = document.getElementById('text-coin');
const listCoins = document.getElementById('list-coins');

getbtn.addEventListener('click', (e) => {
  e.preventDefault();
  const coin = getCoin.value;
  const upperCase = coin.toUpperCase();
  const host = 'api.frankfurter.app';

  const newtitle = document.createElement('p');
  newtitle.innerText = `Valores referentes a 1 ${upperCase}`;
  textCoin.appendChild(newtitle);

  fetch(`https://${host}/latest?from=${getCoin.value}`)
    .then((resp) => resp.json())
    .then((data) => [Object.entries(data.rates)].forEach((a) => {
      a.forEach((b) => {
        const coins = document.createElement('p');
        coins.innerText = `${b[0]}: ${b[1]}`;
        listCoins.appendChild(coins);
      });
    }));
});
