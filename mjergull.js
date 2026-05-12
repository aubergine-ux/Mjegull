const weatherCodeMap = {
    0: ["Clear Sky", "Images/sun.png"],
    1: ["Mainly Clear", "Images/sun.png"],
    2: ["Partly Cloudy", "Images/cloudy.png"],
    3: ["Overcast", "Images/overcast.png"],
    45: ["Fog", "Images/fog.png"],
    48: ["Depositing Rime Fog", "Images/fog.png"],
    51: ["Light Drizzle", "Images/rain.png"],
    53: ["Moderate Drizzle", "Images/rain.png"],
    55: ["Dense Drizzle", "Images/rain.png"],
    56: ["Light Freezing Drizzle", "Images/rain.png"],
    57: ["Dense Freezing Drizzle", "Images/rain.png"],
    61: ["Slight Rain", "Images/rain.png"],
    63: ["Moderate Rain", "Images/rain.png"],
    65: ["Heavy Rain", "Images/rain.png"],
    66: ["Light Freezing Rain", "Images/rain.png"],
    67: ["Dense Freezing Rain", "Images/rain.png"],
    71: ["Light Snow", "Images/snow.png"],
    73: ["Moderate Snow", "Images/snow.png"],
    75: ["Heavy Snow", "Images/snow.png"],
    77: ["Snow Grains", "Images/snow.png"],
    80: ["Slight Rain Showers", "Images/rain.png"],
    81: ["Moderate Rain Showers", "Images/rain.png"],
    82: ["Violent Rain Showers", "Images/rain.png"],
    85: ["Slight Snow Showers", "Images/snow.png"],
    86: ["Heavy Snow Showers", "Images/snow.png"],
    95: ["Thunderstorm", "Images/thunderstorm.png"],
    96: ["Thunderstorm With Slight Hail", "Images/thunderstorm.png"],
    99: ["Thunderstorm With Heavy Hail", "Images/thunderstorm.png"]
};

const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", (e) => { if (e.key === "Enter") getWeather(); });

async function getWeather() {
    const city = cityInput.value.trim();

    //API FOR GEOCODING
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results) {
        alert("City Not Found");
        return;
    }

    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    const country = geoData.results[0].country;

    //API FOR UNSPLASH PHOTO BACKGROUNDS
    const unsplashUrl = `https://mjergull-unsplash.rubyxf.workers.dev/?city=${name}`;
    const unsplashResponse = await fetch(unsplashUrl);
    const unsplashData = await unsplashResponse.json();

    //API FOR WEATHER
    const unit = document.getElementById("unit-select").value;
    const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";
    const windUnit = unit === "fahrenheit" ? "mph" : "kmh";
    const windLabel = unit === "fahrenheit" ? "mph" : "km/h";
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=${unit}&wind_speed_unit=${windUnit}`
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    
    const temperature = weatherData.current_weather.temperature;
    const windSpeed = weatherData.current_weather.windspeed;
    const weatherCode = weatherData.current_weather.weathercode;
    const [weatherCondition, weatherImage] = weatherCodeMap[weatherCode];

    if (country && city != country) {
        document.getElementById("city").innerText = `${city}, ${country}`;
    }
    else {
        document.getElementById("city").innerText = city;
    }

    document.getElementById("weather-image").src = weatherImage;
    document.getElementById("temperature").innerText = `${temperature} ${unitSymbol}`;
    document.getElementById("weather-condition").innerText = weatherCondition;
    document.getElementById("wind-speed").innerText = `${windSpeed} ${windLabel}`;

    document.body.style.backgroundImage = `url(${photoUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.filter = "";
}