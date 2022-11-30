import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import previewListCountryMarcup from './markup/previewListCountryMarcup.hbs';
import countryInformationMarcup from './markup/countryInformationMarcup.hbs';
import countryLanguages from './markup/countryLanguages.hbs';
import { fetchCountries } from './js/fetchCountries.js';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 500;

const refs = {
  inputCountry: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputCountry.addEventListener(
  'input',
  debounce(onCountryInputFinishedPrinting, DEBOUNCE_DELAY)
);
function onCountryInputFinishedPrinting(event) {
  const nameCountry = event.target.value.trim();
  if (nameCountry === '') clearPage();
  if (!nameCountry) return;

  fetchCountries(nameCountry)
    .then(country => {
      if (country.length >= 10) {
        clearPage();
        notifyInfo();
      }
      if (country.length > 1 && country.length < 10) {
        clearPage();
        renderPreviewMarcups(country);
      }
      if (country.length === 1) {
        clearPage();
        renderInformationMarcup(country);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function clearPage() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function notifyInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function renderPreviewMarcups(country) {
  const marcup = previewListCountryMarcup(country);
  refs.countryList.innerHTML = marcup;
}

function renderInformationMarcup(country) {
  const marcup = countryInformationMarcup(country);
  const countryLanguagesArr = Object.values(country[0].languages);
  const marcupLanguages = countryLanguages(countryLanguagesArr);
  refs.countryInfo.innerHTML = marcup;
  refs.countryInfo.insertAdjacentHTML('beforeend', marcupLanguages);
}

function inputValidation(params) {}
