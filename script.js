const apiKey = "a953e70984cfaf068e96f6aad9483bf1";
let units = "metric"; // Default to Celsius

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    updateWeather(data);
}

function updateWeather(data) {
    document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°${units === 'metric' ? 'C' : 'F'}`;
    document.querySelector('.city').textContent = data.name;
    document.querySelector('.wind').textContent = `Wind: ${data.wind.speed} ${units === 'metric' ? 'km/hr' : 'mph'}`;
    document.querySelector('.humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.querySelector('.pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
    document.querySelector('.weather-icon').src = `images/${data.weather[0].main.toLowerCase()}.png`;
}

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

document.getElementById('get-location').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            updateWeather(data);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

document.getElementById('toggle-unit').addEventListener('click', () => {
    units = units === "metric" ? "imperial" : "metric";
    const city = document.querySelector('.city').textContent;
    if (city && city !== "City") {
        checkWeather(city);
    }
    document.getElementById('toggle-unit').textContent = `Switch to ${units === "metric" ? "°F" : "°C"}`;
});
