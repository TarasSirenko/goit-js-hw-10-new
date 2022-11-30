const searchParams = new URLSearchParams({
  fields: 'name,name,capital,population,flags,languages',
});
const BASE_URL = 'https://restcountries.com/v3.1';
function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?${searchParams}`).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('жопа');
    }
  });
}
export { fetchCountries };
