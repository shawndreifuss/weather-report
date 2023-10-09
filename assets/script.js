function start() {
  const cityEl = document.getElementById("city");
  const searchEl = document.getElementById("search-button");
  const nameEl = document.getElementById("city-name");
  const currentIconEl = document.getElementById("icon");
  const currentTempEl = document.getElementById("temp");
  const currentHumidityEl = document.getElementById("humidity");
  const currentWindEl = document.getElementById("wind");
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  const Key = "9c37f6b29f7611451a0abe8420b12a9b";
  const historyEl = document.getElementById("history");
  var today = document.getElementById("today-weather")
  var fiveday = document.getElementById("forecast-header");
 

  function getWeather(city) {
      
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + Key;
      axios.get(queryURL)
          .then(function (response) {

            today.classList.remove("d-none")


              // Parse response to display current weather
              const currentDate = new Date(response.data.dt * 1000);
              const day = currentDate.getDate();
              const month = currentDate.getMonth() + 1;
              const year = currentDate.getFullYear();
              nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
              let weatherIcon = response.data.weather[0].icon;
              currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
              currentIconEl.setAttribute("alt", response.data.weather[0].description);
              currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
              currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
              currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
              
              
              // Get 5 day forecast for this city
              let cityID = response.data.id;
              let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + Key;
              axios.get(forecastQueryURL)
                  .then(function (response) {
                    fiveday.classList.remove("d-none");
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

                        
                          const forecastWeatherEl = document.createElement("img");
                          forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                          forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                          forecastEls[i].append(forecastWeatherEl);
                          const forecastTempEl = document.createElement("p");
                          forecastTempEl.innerHTML = "Temperature: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                          forecastEls[i].append(forecastTempEl);
                          const forecastHumidityEl = document.createElement("p");
                          forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                          forecastEls[i].append(forecastHumidityEl);
                      }
                  })
          });
  }

  // Get history from local storage 
  searchEl.addEventListener("click", function () {
      const searchTerm = cityEl.value;
      getWeather(searchTerm);
      searchHistory.push(searchTerm);
      localStorage.setItem("search", JSON.stringify(searchHistory));
      renderSearchHistory();
  })

 // function to make it to farenheight from weather api website
  function k2f(K) {
      return Math.floor((K - 273.15) * 1.8 + 32);
  }

  function renderSearchHistory() {
      historyEl.innerHTML = "";
      for (let i = 0; i < searchHistory.length; i++) {
          const historyItem = document.createElement("input");
          historyItem.setAttribute("type", "text");
          historyItem.setAttribute("readonly", true);
          historyItem.setAttribute("class", "form-control d-block bg-white");
          historyItem.setAttribute("value", searchHistory[i]);
          historyItem.addEventListener("click", function () {
              getWeather(historyItem.value);
          })
          historyEl.append(historyItem);
      }
  }

  renderSearchHistory();
  if (searchHistory.length > 5) {
      getWeather(searchHistory[searchHistory.length - 1]);
  }
  
}

start();
 


