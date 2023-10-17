const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "e5212f6340809309e96f9b4867b73641";
const weather = document.querySelector(".currentWeather");
const inputValue = document.querySelector(".input-value");
const searchBtn = document.querySelector(".search-btn");
const invalidInput = document.querySelector(".error");

document.querySelector(".weather").style.display = "none";

async function checkWeather(city) {
  const response = await fetch(
    apiUrl + city + `&appid=e5212f6340809309e96f9b4867b73641`
  );
  const data = await response.json();
  console.log(data);

  if (response.status === 404 || response.status === 400) {
    invalidInput.innerText = "Please enter a valid city name";
    invalidInput.style.display = "flex";
    document.querySelector(".weather").style.display = "none";

    setTimeout(() => {
      invalidInput.style.display = "none";
    }, 2000);
  } else {
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + "km/h";

    if (data.weather[0].main == "Rain") {
      weather.src = "images/rain.png";
    } else if (data.weather[0].main == "Thunderstorm") {
      weather.src = data.weather[0].icon;
    } else if (data.weather[0].main == "Clouds") {
      weather.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weather.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weather.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weather.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weather.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "flex";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputValue.value);
});

inputValue.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(inputValue.value);
  }
});
