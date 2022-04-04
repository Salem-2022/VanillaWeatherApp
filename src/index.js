function formatTime(timestamp) {
  let now = new Date(timestamp);
  //let currentTime = document.querySelector("li.currentDay");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
//currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(dateStamp) {
  let date = new Date(dateStamp * 1000);
  let day = date.getDay();
  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[day];
}
function showForecast(response) {
  let weatherForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecast = `<div class="row">`;

  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecast =
        forecast +
        `<div class="col-2">
              <ul>
              <li class="sat">${formatDay(forecastDay.dt)}</li>
              <li class="emoji"><img
                  src=" http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="clear"
                  id="forecastIcon"
                /></li>
              <li class="forecastTemp"> <span id="minTemp">${Math.round(
                forecastDay.temp.min
              )}℃</span> <span id="maxTemp">${Math.round(
          forecastDay.temp.max
        )}℃</span></li>
            </ul>
            </div>`;
    }
  });
  forecast = forecast + `</div>`;
  forecastElement.innerHTML = forecast;
}
function getCoordinates(coordinates) {
  let apiKeySecond = "7be7b75afb254afdb582a59c09762d2d";
  let apiUrlOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeySecond}&units=metric`;

  axios.get(`${apiUrlOneCall}`).then(showForecast);
}
//---
function getCurrentCoordinates(coords) {
  let apiKeyThird = "7be7b75afb254afdb582a59c09762d2d";
  let apiUrlCurrentForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKeyThird}&units=metric`;

  axios.get(`${apiUrlCurrentForecast}`).then(showForecast);
}
function currentCity(response) {
  let CurrentCity = document.querySelector("li.currentCity");
  CurrentCity.innerHTML = response.data.name;

  let iconCurrent = document.querySelector("#currentIcon");
  let temp = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#currentTemp");
  let currentTime = document.querySelector("li.currentDay");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let description = document.querySelector("#description");

  iconCurrent.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconCurrent.setAttribute("alt", response.data.weather[0].description);
  tempValue.innerHTML = `${temp}`;
  currentTime.innerHTML = formatTime(response.data.dt * 1000);

  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  description.innerHTML = response.data.weather[0].description;
  getCurrentCoordinates(response.data.coord);
}
let apiKeyCurrent = "7be7b75afb254afdb582a59c09762d2d";
let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric`;

axios.get(`${apiUrlCurrent}&appid=${apiKeyCurrent}`).then(currentCity);

//---
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityName = document.querySelector("li.currentCity");
  cityName.innerHTML = `${searchInput.value}`;

  let apiKeyfirst = "7be7b75afb254afdb582a59c09762d2d";
  let apiUrlfirst = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;

  function showTemp(response) {
    let iconCurrent = document.querySelector("#currentIcon");
    let temp = Math.round(response.data.main.temp);
    let tempValue = document.querySelector("#currentTemp");
    let currentTime = document.querySelector("li.currentDay");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#windSpeed");
    let description = document.querySelector("#description");

    iconCurrent.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconCurrent.setAttribute("alt", response.data.weather[0].description);
    tempValue.innerHTML = `${temp}`;
    humidity.innerHTML = `Humidity: ${Math.round(
      response.data.main.humidity
    )} %`;
    windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
    description.innerHTML = response.data.weather[0].description;

    getCoordinates(response.data.coord);
    currentTime.innerHTML = formatTime(response.data.dt * 1000);
  }

  axios.get(`${apiUrlfirst}&appid=${apiKeyfirst}`).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
