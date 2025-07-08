const inputValue = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");

var city = "anjar"; // Default city
fetchWeatherData(`${city}`);

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  city = inputValue.value.trim();
  // console.log(city);

  if (city) {
    // console.log(city);
    fetchWeatherData(`${city}`);
  } else {
    console.log("Please enter a city name.");
  }
  inputValue.value = ""; // Clear the input field after search
});

async function fetchWeatherData(city) {
  console.log(city);

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=f27ddc35824744ddab3130428250707&q=${city}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    const { location, current } = data;

    const imgUrl = `https:${current.condition.icon}`;

    document.querySelector(".weather-icon").src = imgUrl;

    document.querySelector(
      ".condition-text"
    ).textContent = `${current.condition.text}`;

    document.querySelector(".city-temp").textContent = `${current.temp_c}°c`;

    document.querySelector(
      ".city-name"
    ).textContent = `${location.name}, ${location.country}`;

    document.querySelector(
      ".humidity-count"
    ).textContent = `${current.humidity}%`;

    document.querySelector(".wind-count").textContent = `${current.wind_kph}%`;

    console.log(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
