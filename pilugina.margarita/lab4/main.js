import {Travel} from './model.js';

const savedTravels = JSON.parse(localStorage.getItem('travels')) || [];

let travels = savedTravels.map(
  (travel) =>
    new Travel(travel.id, travel.travelerName, travel.visitedCountries),
);

const idInput = document.querySelector('#travel-id');
const nameInput = document.querySelector('#traveler-name');
const countryInput = document.querySelector('#country');

const addCountryButton = document.querySelector('#add-country');
const removeCountryButton = document.querySelector('#remove-country');
const addTravelButton = document.querySelector('#add-travel');
const removeTravelButton = document.querySelector('#remove-travel');

const travelList = document.querySelector('#travel-list');

function asyncOperation(callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, 300);
  });
}

function saveTravels() {
  localStorage.setItem('travels', JSON.stringify(travels));
}

function renderTravels() {
  travelList.innerHTML = '';

  if (travels.length === 0) {
    travelList.innerHTML = `
      <p class="empty-message">
        Путешествий пока нет
      </p>
    `;

    return;
  }

  travels.forEach((travel) => {
    const card = document.createElement('div');

    card.classList.add('travel-card');

    card.innerHTML = `
      <h2>${travel.travelerName}</h2>

      <p>
        <strong>ID:</strong>
        ${travel.id}
      </p>

      <p>
        <strong>Страны:</strong>
      </p>

      <ul>
        ${
          travel.visitedCountries.length
            ? travel.visitedCountries
                .map((country) => `<li>${country}</li>`)
                .join('')
            : '<li>Нет посещённых стран</li>'
        }
      </ul>

      <p>
        <strong>Количество стран:</strong>
        ${travel.visitedCount}
      </p>
    `;

    travelList.append(card);
  });
}

addTravelButton.addEventListener('click', async () => {
  const id = Number(idInput.value);
  const travelerName = nameInput.value.trim();

  if (!id || !travelerName) {
    alert('Введите ID и имя путешественника');
    return;
  }

  const existingTravel = travels.find((travel) => travel.id === id);

  if (existingTravel) {
    alert('Путешествие с таким ID уже существует');
    return;
  }

  await asyncOperation(() => {
    const newTravel = new Travel(id, travelerName);

    travels.push(newTravel);

    saveTravels();
    renderTravels();
  });

  idInput.value = '';
  nameInput.value = '';
});

removeTravelButton.addEventListener('click', async () => {
  const id = Number(idInput.value);

  if (!id) {
    alert('Введите ID путешествия');
    return;
  }

  const existingTravel = travels.find((travel) => travel.id === id);

  if (!existingTravel) {
    alert('Путешествие не найдено');
    return;
  }

  await asyncOperation(() => {
    travels = travels.filter((travel) => travel.id !== id);

    saveTravels();
    renderTravels();
  });

  idInput.value = '';
});

addCountryButton.addEventListener('click', async () => {
  const id = Number(idInput.value);
  const country = countryInput.value.trim();

  if (!id) {
    alert('Введите ID путешествия');
    return;
  }

  if (!country) {
    alert('Введите страну');
    return;
  }

  const travel = travels.find((item) => item.id === id);

  if (!travel) {
    alert('Путешествие не найдено');
    return;
  }

  if (travel.visitedCountries.includes(country)) {
    alert('Эта страна уже добавлена');
    return;
  }

  await asyncOperation(() => {
    travel.addCountry(country);

    saveTravels();
    renderTravels();
  });

  countryInput.value = '';
});

removeCountryButton.addEventListener('click', async () => {
  const id = Number(idInput.value);
  const country = countryInput.value.trim();

  if (!id) {
    alert('Введите ID путешествия');
    return;
  }

  if (!country) {
    alert('Введите страну');
    return;
  }

  const travel = travels.find((item) => item.id === id);

  if (!travel) {
    alert('Путешествие не найдено');
    return;
  }

  if (!travel.visitedCountries.includes(country)) {
    alert('Такой страны нет в путешествии');
    return;
  }

  await asyncOperation(() => {
    travel.removeCountry(country);

    saveTravels();
    renderTravels();
  });

  countryInput.value = '';
});

renderTravels();
