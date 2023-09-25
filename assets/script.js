
var searchBar = document.querySelector('#search-bar');
var searchButton = document.querySelector('#searchInput');

searchBar.addEventListener('submit', function (event) {
  event.preventDefault();
  
  var city = event.target.searchTerm.value;
weatherForecast(city)
})



function weatherForecast(city) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city+ '&appid=' + key+'&cnt=5')  
  .then(function(resp) {
      return resp.json() 
  })
  .then(function(data) {
      console.log(data)
  })
}
