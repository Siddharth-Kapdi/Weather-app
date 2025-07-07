const inputValue = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const city = inputValue.value.trim();

  if (city) {
    console.log(city);
  } else {
    console.log("Please enter a city name.");
  }
  inputValue.value = ""; // Clear the input field after search

  fetchWeatherData(`${city}`);
});

async function fetchWeatherData(city) {
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
