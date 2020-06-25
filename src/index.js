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

let h3 = document.querySelector(".time-date");
let currentTime = new Date();

h3.innerHTML = formateDate(currentTime);

// Feature #2
// On your project, when a user searches for a city (example: New York),
// it should display the name of the city on the result page and
// the current temperature of the city.

function citySearch(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");

  let headlineCity = document.querySelector("#headline-city");
  if (inputCity.value) {
    headlineCity.innerHTML = `${inputCity.value}`;

    let apiKey = "ef922ffd6c0dbe48060af94d4b7d066a";
    let city = headlineCity.innerHTML;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

    function showTemperature(response) {
      //console.log(response.data);
      //
      headlineCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
      //
      let temperature = Math.round(response.data.main.temp);
      let temperatureElement = document.querySelector("#temperature-numbers");
      temperatureElement.innerHTML = `${temperature}`;
      let feelslike = document.querySelector("#feels-like");
      feelslike.innerHTML = `Feels like: ${Math.round(
        response.data.main.feels_like
      )}°C`;
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
      let windSpeed = document.querySelector("#wind-speed");
      windSpeed.innerHTML = `Wind: ${Math.round(
        response.data.wind.speed
      )} km/h`;
    }
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  } else {
    inputCity.innerHTML = null;
    alert("Please enter a city");
  }
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", citySearch);

// Celsius-Fahrenheit Conversion Feature # 3
// When clicking on it, it should convert the temperature
// to Fahrenheit. When clicking on Celsius,it should convert it back.
function showTemp(event) {
  event.preventDefault();
  let tempChange = document.querySelector("#temperature-numbers");
  let temperature = tempChange.innerHTML;
  temperature = Number(temperature);
  tempChange.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let tempFah = document.querySelector("#fahrenheit");
tempFah.addEventListener("click", showTemp);

function backTemp(event) {
  event.preventDefault();
  let originalTemp = document.querySelector("#temperature-numbers");
  let temperature = originalTemp.innerHTML;
  temperature = Number(temperature);
  originalTemp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
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
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature-numbers");
  currentTemp.innerHTML = `${temperature}`;
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
