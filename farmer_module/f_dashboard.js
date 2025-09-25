// Weather Data Function
function fetchWeather() {
  console.log('Starting weather fetch...');
  if ("geolocation" in navigator) {
    console.log('Geolocation is available');
    navigator.geolocation.getCurrentPosition(async function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const API_KEY = '57d518d2dccce9aaec135a8f5c500ea4';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Weather data received:', data);

        const temperature = Math.round(data.main.temp);
        const condition = data.weather[0].main; // e.g. Clear, Rain, Clouds

        updateWeatherUI(condition, temperature);

      } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('temperature').textContent = '--°C';
        document.getElementById('weather-condition').textContent = '--';
        document.getElementById('weather-icon').textContent = '❓';
      }
    }, function (error) {
      console.error('Error getting location:', error.code, error.message);
      document.getElementById('temperature').textContent = '--°C';
      document.getElementById('weather-condition').textContent = '--';
      document.getElementById('weather-icon').textContent = '❓';
    });
  } else {
    console.error('Geolocation is not supported by this browser');
    document.getElementById('temperature').textContent = '--°C';
    document.getElementById('weather-condition').textContent = '--';
    document.getElementById('weather-icon').textContent = '❓';
  }
}

// Function to update weather widget dynamically
function updateWeatherUI(condition, temp) {
  const icon = document.getElementById("weather-icon");
  const weatherCondition = document.getElementById("weather-condition");
  const temperature = document.getElementById("temperature");

  let iconSymbol = "❓";
  switch (condition.toLowerCase()) {
    case "clear":
    case "sunny":
      iconSymbol = "☀️";
      weatherCondition.textContent = "Sunny";
      break;
    case "clouds":
      iconSymbol = "☁️";
      weatherCondition.textContent = "Cloudy";
      break;
    case "rain":
    case "drizzle":
      iconSymbol = "🌧️";
      weatherCondition.textContent = "Rainy";
      break;
    case "thunderstorm":
      iconSymbol = "⛈️";
      weatherCondition.textContent = "Stormy";
      break;
    case "snow":
      iconSymbol = "❄️";
      weatherCondition.textContent = "Snowy";
      break;
    case "mist":
    case "fog":
    case "haze":
      iconSymbol = "🌫️";
      weatherCondition.textContent = "Foggy";
      break;
    default:
      iconSymbol = "🌡️";
      weatherCondition.textContent = condition;
  }

  // Update UI
  icon.textContent = iconSymbol;
  temperature.textContent = `${temp}°C`;

  // Bounce animation on update
  icon.style.transform = "scale(1.2)";
  setTimeout(() => {
    icon.style.transform = "scale(1)";
  }, 300);
}

// Call weather function when page loads
window.addEventListener('load', fetchWeather);

// ================== THEME TOGGLE ==================
function setTheme(isDark) {
  const body = document.body;
  const header = document.querySelector('.header');
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const cards = document.querySelectorAll('.card');
  const navLinks = document.querySelectorAll('.nav-links a');
  const weatherContainer = document.querySelector('.weather-container');
  const themeToggle = document.querySelector('.theme-toggle');
  const logo = document.querySelector('.logo img');
  const selects = document.querySelectorAll('select');
  const buttons = document.querySelectorAll('button');

  if (!isDark) {
    // Light Theme
    body.classList.remove('dark-theme');
    body.style.background = 'linear-gradient(135deg, #d9ffdc, #f3faf3)';
    themeToggle.textContent = '🌙 Dark';

    // Header bottom line
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    header.style.boxShadow = '0 1px 0 0 rgba(128,128,128,0.3)';
    header.style.backdropFilter = 'blur(10px)';
    logo.style.filter = 'drop-shadow(0 0 5px #4caf50)';

    cards.forEach(c => {
      c.style.background = 'rgba(255,255,255,0.9)';
      c.style.color = '#2e7d32';
      c.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
      c.style.border = '1px solid rgba(76,175,80,0.1)';

      const h3 = c.querySelector('h3');
      if(h3) h3.style.textShadow = '2px 2px 4px rgba(76,175,80,0.6)';

      const btn = c.querySelector('button');
      if(btn) btn.style.color = '#fff';
    });

    navLinks.forEach(link => { link.style.color = '#2e7d32'; link.style.textShadow = 'none'; });
    headings.forEach(h => { h.style.color = ''; h.style.textShadow = 'none'; });
    weatherContainer.style.backgroundColor = 'rgb(223, 250, 135)';
    weatherContainer.style.backdropFilter = '';
    weatherContainer.style.border = 'none';
    selects.forEach(s => { s.style.backgroundColor = '#fff'; s.style.color = '#2e7d32'; s.style.border = '1px solid #2e7d32'; });
    buttons.forEach(b => { if(!b.classList.contains('theme-toggle')){ b.style.background='linear-gradient(135deg, #4caf50, #2e7d32)'; b.style.color='#fff'; b.style.border='none'; }});

  } else {
    //premium Dark Theme
    body.classList.add('dark-theme');
    body.style.background = 'linear-gradient(135deg, #0a0c1b, #1a1f35)';
    themeToggle.textContent = '☀️ Light';

    //header styling
    header.style.backgroundColor = 'rgba(16, 18, 35, 0.8)';
    header.style.boxShadow = '0 1px 0 0 rgba(128,128,128,0.3)';
    header.style.backdropFilter = 'blur(10px)';
    logo.style.filter = 'brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.3))';

    cards.forEach(c => {
      c.style.background = 'linear-gradient(145deg, #151933, #1c2142)';
      c.style.color = '#e0f2f1';
      c.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
      c.style.border = '1px solid rgba(0,0,0,0.2)';

      const h3 = c.querySelector('h3');
      if(h3) h3.style.textShadow = '2px 2px 6px rgba(255,255,255,0.5)';

      const btn = c.querySelector('button');
      if(btn) btn.style.color = '#fff';
    });

    navLinks.forEach(link => { link.style.color = '#7cb342'; link.style.textShadow = '0 0 10px rgba(255,255,255,0.2)'; });
    headings.forEach(h => { h.style.color = '#ffffff'; h.style.textShadow = '0 0 10px rgba(255,255,255,0.1)'; });
    weatherContainer.style.backgroundColor = 'rgba(26,28,45,0.7)';
    weatherContainer.style.backdropFilter = 'blur(10px)';
    weatherContainer.style.border = '1px solid rgba(255,255,255,0.1)';
    selects.forEach(s => { s.style.backgroundColor = 'rgba(26,28,45,0.9)'; s.style.color = '#e0f2f1'; s.style.border='1px solid rgba(255,255,255,0.2)'; });
    buttons.forEach(b => { if(!b.classList.contains('theme-toggle')){ b.style.backgroundColor='rgba(124,179,66,0.2)'; b.style.color='#fff'; b.style.border='1px solid rgba(124,179,66,0.3)'; }});
  }

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-theme');
  setTheme(!isDark);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme === 'dark');
});

// ================== 3-DAY WEATHER FORECAST ==================
async function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=5d4b65f9f9a24ea49cd135211252309&q=${lat},${lon}&days=3&aqi=no&alerts=no`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Unable to fetch forecast");

    const data = await response.json();
    let output = `<h3>${data.location.name}, ${data.location.country}</h3><div class="forecast-container">`;

    data.forecast.forecastday.forEach(day => {
      output += `
        <div class="forecast-day">
          <h3>${day.date}</h3>
          <img src="https:${day.day.condition.icon}" alt="icon">
          <p class="temp">🌡 ${day.day.avgtemp_c}°C</p>
          <p>Condition: ${day.day.condition.text}</p>
          <p>Max Temp: ${day.day.maxtemp_c}°C</p>
          <p>Min Temp: ${day.day.mintemp_c}°C</p>
          <p>Humidity: ${day.day.avghumidity}%</p>
          <p>Max Wind: ${day.day.maxwind_kph} kph</p>
          <p>Sunrise: ${day.astro.sunrise}</p>
          <p>Sunset: ${day.astro.sunset}</p>
        </div>`;
    });

    output += `</div>`;
    document.getElementById("result").innerHTML = output;
  } catch (error) {
    document.getElementById("result").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function showError(error) {
  let msg = "";
  switch (error.code) {
    case error.PERMISSION_DENIED: msg = "User denied the request for Geolocation."; break;
    case error.POSITION_UNAVAILABLE: msg = "Location information is unavailable."; break;
    case error.TIMEOUT: msg = "The request to get user location timed out."; break;
    default: msg = "An unknown error occurred."; break;
  }
  document.getElementById("result").innerHTML = `<p style="color:red;">${msg}</p>`;
}

window.addEventListener('load', () => {
  if (navigator.geolocation) navigator.geolocation.getCurrentPosition(showWeather, showError);
});
