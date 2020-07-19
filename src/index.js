// Current Date and Time Feature #1
// Formate example: Tuesday 16:00
function formateDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let timeDate = document.querySelector(".time-date");
let currentTime = new Date();

timeDate.innerHTML = formateDate(currentTime);

// Feature #2
// On your project, when a user searches for a city (example: New York),
// it should display the name of the city on the result page and
// the current temperature of the city.

function showTemperature(response) {
  //console.log(response.data);

  let temperatureElement = document.querySelector("#temperature-numbers");
  let headlineCity = document.querySelector("#headline-city");
  let feelslikeElement = document.querySelector("#feels-like");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let pressureElement = document.querySelector("#pressure");
  let iconElement = document.querySelector("#icon");

  headlineCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${celsiusTemperature}`;
  feelslikeElement.innerHTML = `Feels like: </br> ${Math.round(
    response.data.main.feels_like
  )}°C`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  pressureElement.innerHTML = `Pressure: </br> ${Math.round(
    response.data.main.pressure
  )} hPa`;

  humidityElement.innerHTML = `Humidity: </br> ${response.data.main.humidity}%`;

  windspeedElement.innerHTML = `Wind: </br> ${Math.round(
    response.data.wind.speed
  )} km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "ef922ffd6c0dbe48060af94d4b7d066a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}

function displayForecast(response) {
  //console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
          <div class="col-2">
            ${formatHours(forecast.dt * 1000)}
            <br />
            <img class="icon" src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
      />
            <br />
            <strong>${Math.round(
              forecast.main.temp_max
            )}°</strong> <small>${Math.round(forecast.main.temp_min)}°</small>
  </div>`;
  }
}

function dailyForecast(response) {
  console.log(response.data);
}

function citySearch(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  search(inputCity.value);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", citySearch);

// Celsius-Fahrenheit Conversion Feature # 3
// When clicking on it, it should convert the temperature
// to Fahrenheit. When clicking on Celsius,it should convert it back.
function showTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-numbers");
  tempCel.classList.remove("active");
  tempFah.classList.add("active");
  let fahrenheiTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

let tempFah = document.querySelector("#fahrenheit");
tempFah.addEventListener("click", showTemp);

function backTemp(event) {
  event.preventDefault();
  tempCel.classList.add("active");
  tempFah.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-numbers");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let tempCel = document.querySelector("#celsius");
tempCel.addEventListener("click", backTemp);

// 🙀 Bonus point: Feature #4
// Add a Current Location button.
// When clicking on it, it uses the Geolocation API to get your GPS coordinates
// and display and the city and current temperature using the OpenWeather API.
let apiKey = "ef922ffd6c0dbe48060af94d4b7d066a";

function showCity(response) {
  //console.log(response.data);
  let h1 = document.querySelector("h1");
  celsiusTemperature = Math.round(response.data.main.temp);
  //let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature-numbers");
  currentTemp.innerHTML = `${celsiusTemperature}`;

  h1.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  //
  let feelslike = document.querySelector("#feels-like");
  feelslike.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

search("Hong Kong");
