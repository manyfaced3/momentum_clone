const weatherContainer = document.querySelector(".js-weather"),
  weatherIcon = weatherContainer.querySelector(".weatherIcon"),
  weatherCity = weatherContainer.querySelector(".weatherCity"),
  weatherTemp = weatherContainer.querySelector(".weatherTemp");
const API_KEY = "822aa1796c758595edac483675285616";
const COORDS = "coords";

function getWeatherIcon(weather){

  //i.fas tag 만들기
  const i = document.createElement("i");
  i.classList.add("fas")
  //switch : weather 에 따라 i tag 다른 class 넣기
  switch(weather){
    case "Thunderstorm":
      i.classList.add("fa-poo-storm");
      break;
    case "Drizzle":
    case "Rain":
      i.classList.add("fa-umbrella");
      break;
    case "Snow":
      i.classList.add("fa-snowflake");
      break;
    case "Atmosphere":
      break;
    case "Clear":
      i.classList.add("fa-sun");
      break;
    case "Clouds":
      i.classList.add("fa-cloud");
      break;
    case "Haze":
    case "Mist":
    case "Dust":
      i.classList.add("fa-smog");
      break;
  }

  weatherIcon.appendChild(i);
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const weather = json.weather[0].main;
      const temperature = json.main.temp;
      const place = json.name;
      const shortPlace = place.replace("-gwangyŏksi","");
      getWeatherIcon(`${weather}`);
      weatherCity.innerText = `${shortPlace}`;
      weatherTemp.innerHTML = `${Math.floor(temperature)}`+'&#8451;';
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function geoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function geoError(position) {
  console.log("위치확인 실패");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();
