// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// start of the coding 
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {};

weather.temperature = {
    unit: "celsius"
}
weather.description = '';

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

// check if geolocation is permitted or not 

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>Browser doesn't support geolocation</p>`;
}

// users position

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

async function getWeather(latitude, longitude) {
    let api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' +
        key + '&units=metric';
    //console.log(api);
    let response = await fetch(api);
    let data = await response.json();
    //console.log(data);

    weather.temperature.value = Math.floor(data.main.temp);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;

    displayWeather();
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

tempElement.addEventListener("click", function() {

    if (weather.temperature.unit == "celsius") {
        weather.temperature.unit = "farenheit";
        weather.temperature.value = Math.floor(weather.temperature.value * 1.8 + 32);
        tempElement.innerHTML = `${weather.temperature.value}°<span>K</span>`;
    } else if (weather.temperature.unit == "farenheit") {
        weather.temperature.unit = "celsius";
        weather.temperature.value = Math.floor((weather.temperature.value - 32) / 1.8);
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    } else {
        return `-`;
    }
});