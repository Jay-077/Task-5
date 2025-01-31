const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const getWeatherButton = document.getElementById('get-weather');
const weatherInfo = document.getElementById('weather-info');
const locationInput = document.getElementById('location-input');

getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value || 'New York'; // Default location
    fetchWeather(location);
});

async function fetchWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Conditions: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}

