const API = 'https://restcountries.eu/rest/v2/name/';
const API_ALL = 'https://restcountries.eu/rest/v2/all';
const API_REGION = 'https://restcountries.eu/rest/v2/region/'

const countryCardContainer = document.querySelector('#country-card-container');

const inputCountry = document.querySelector('.input-country');
const form = document.querySelector('#form');
const regionSelect = document.querySelector('.region-selector');

async function getCountry(countryName) {
    const resp = await fetch(API + countryName);
    const respData = await resp.json();
    respData.forEach(country => {
        const countryCardElements = `
        <div class="country-card">
            <img src="${country.flag}" class="flag">
            <div class="country-info">
            <h3>${country.name}</h3>
            <p><span>Population: </span>${country.population}</p>
            <p><span>Region: </span> ${country.region}</p>
            <p><span>Capital: </span>${country.capital}</p>
            </div>
        </div>
    `

        countryCardContainer.innerHTML = countryCardElements;
    });
    // createCountryCard('Bangladesh');
    console.log(respData);
}

async function homepageCountries() {
    const resp = await fetch(API_ALL);
    const respData = await resp.json();

    respData.slice(0, 8).map((country, i) => {
        const countryCardElements = `
        <div class="country-card">
            <img src="${respData[i].flag}" class="flag">
            <div class="country-info">
            <h3>${respData[i].name}</h3>
            <p><span>Population: </span>${respData[i].population}</p>
            <p><span>Region: </span> ${respData[i].region}</p>
            <p><span>Capital: </span>${respData[i].capital}</p>
            </div>
        </div>
    `;
        console.log(respData[i])
        countryCardContainer.innerHTML += countryCardElements;

    })

}
homepageCountries();



// //filter by region

regionSelect.addEventListener('change', filterByRegion);
async function filterByRegion() {
    countryCardContainer.innerHTML = '';
    let region = regionSelect.value;
    const resp = await fetch(API_REGION + region);
    const respData = await resp.json();
    respData.slice(0, 8).map((country, i) => {
        const countryCardElements = `
        <div class="country-card">
            <img src="${respData[i].flag}" class="flag">
            <div class="country-info">
            <h3>${respData[i].name}</h3>
            <p><span>Population: </span>${respData[i].population}</p>
            <p><span>Region: </span> ${respData[i].region}</p>
            <p><span>Capital: </span>${respData[i].capital}</p>
            </div>
        </div>
    `;
        console.log(respData[i])
        countryCardContainer.innerHTML += countryCardElements;
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputCountryName = inputCountry.value;
    if (inputCountryName) {
        getCountry(inputCountryName);
        inputCountryName = '';
    }
})

//theme
function darkMode() {
    const element = document.body;
    element.classList.toggle("dark-mode");
}