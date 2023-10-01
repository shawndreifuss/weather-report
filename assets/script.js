
searchEl.addEventListener("click", function () {
  const searchTerm = cityEl.value;
  getWeather(searchTerm);
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
})

function onStart() {
  const cityEl = document.getElementById("city");
  const searchEl = document.getElementById("search-button");
  const nameEl = document.getElementById("city-name");
  const currentIconEl = document.getElementById("icon");
  const currentTempEl = document.getElementById("temperature");
  const currentHumidityEl = document.getElementById("humidity");
  const currentWindEl = document.getElementById("wind");
  const historyEl = document.getElementById("history");
  var fivedayEl = document.getElementById("forecast-header");
  var todayweatherEl = document.getElementById("current");
  var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

  function getWeather(cityName) {
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=9c37f6b29f7611451a0abe8420b12a9b";
      axios.get(queryURL)
          .then(function (response) {

              

              const today = new Date(response.data.dt * 1000);
              const day = today.getDate();
              const month = today.getMonth() + 1;
              const year = today.getFullYear();
              nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
              var icon = response.data.weather[0].icon;
              currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
              currentIconEl.setAttribute("alt", response.data.weather[0].description);
              currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
              currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
              currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
              
             
              
              // Get 5 day forecast for this city
              var cityID = response.data.id;
              var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
              axios.get(forecastUrl)
                  .then(function (response) {
                 const forecastEls = document.querySelectorAll(".forecast");
                      for (i = 0; i < forecastEls.length; i++) {
                          forecastEls[i].innerHTML = "";
                          const forecastIndex = i * 8 + 4;
                          const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                          const forecastDay = forecastDate.getDate();
                          const forecastMonth = forecastDate.getMonth() + 1;
                          const forecastYear = forecastDate.getFullYear();
                          const forecastDateEl = document.createElement("p");
                          forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                          forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                          forecastEls[i].append(forecastDateEl);

                          // Icon for current weather
                          const forecastWeatherEl = document.createElement("img");
                          forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                          forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                          forecastEls[i].append(forecastWeatherEl);
                          const forecastTempEl = document.createElement("p");
                          forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                          forecastEls[i].append(forecastTempEl);
                          const forecastHumidityEl = document.createElement("p");
                          forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                          forecastEls[i].append(forecastHumidityEl);
                      }
                  })
          });
  }
}

  
onStart()


 


