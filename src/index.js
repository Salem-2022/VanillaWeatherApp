let now = new Date();
let currentTime = document.querySelector("li.currentDay");
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
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

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
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#windSpeed");
    let description = document.querySelector("#description");

    iconCurrent.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconCurrent.setAttribute("alt", response.data.weather[0].description);
    tempValue.innerHTML = `${temp}`;
    humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
    windSpeed.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
    description.innerHTML = response.data.weather[0].description;
    //deg F and C
    function showTempC(event) {
      event.preventDefault();
      let currentTempC = document.querySelector("#currentTemp");
      currentTempC.innerHTML = `${temp}`;
    }

    let degreeCent = document.querySelector("#degC");
    degreeCent.addEventListener("click", showTempC);

    function showTempF(event) {
      event.preventDefault();
      let currentTempF = document.querySelector("#currentTemp");
      let tempC = `${temp}`;
      currentTempF.innerHTML = Math.round((tempC * 9) / 5 + 32);
    }

    let degreeFaren = document.querySelector("#degF");
    degreeFaren.addEventListener("click", showTempF);

    //=======
  }

  axios.get(`${apiUrlfirst}&appid=${apiKeyfirst}`).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecast = `<div class="row">`;
  let dayNames = ["Sun", "Mon", "Tue"];
  dayNames.forEach(function (day) {
    forecast =
      forecast +
      `<div class="col-2">
              <ul>
              <li class="sat">${day}</li>
              <li class="emoji">🌤</li>
              <li class="satTemperature"> <span id="minTemp">10℃</span> <span id="maxTemp">17℃</span></li>
            </ul>
            </div>`;
  });
  forecast = forecast + `</div>`;
  forecastElement.innerHTML = forecast;
}
showForecast();
