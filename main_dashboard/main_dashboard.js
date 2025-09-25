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

// Theme Change Function - Light/Dark Mode Toggle
function setTheme(isDark) {
  const body = document.body;
  const header = document.querySelector('.header');
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const roleCards = document.querySelectorAll('.role-card');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.weather-section');
  const forecastText = document.querySelectorAll('.forecast-day span, .weather-header h3');
  const themeToggle = document.querySelector('.theme-toggle');
  const logo = document.querySelector('.logo img');
  const containers = document.querySelectorAll('.container, .weather-container');
  const selects = document.querySelectorAll('select');
  const buttons = document.querySelectorAll('button');

  if (!isDark) {
    // Light theme - restore default styling
    body.classList.remove('dark-theme');
    body.style.background = 'linear-gradient(135deg, #d9ffdc, #f3faf3)';
    themeToggle.textContent = '🌙 Dark';

    // Reset header to default
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    header.style.boxShadow = '';
    header.style.backdropFilter = 'blur(10px)';

    // Reset logo
    logo.style.filter = 'drop-shadow(0 0 5px #4caf50)';

    roleCards.forEach(card => {
      card.style.background = '#fff';
      card.style.color = '#2e7d32';
      card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      card.style.border = 'none';
    });

    // Reset sections to default
    sections.forEach(el => {
      el.style.backgroundColor = '#fff';
      el.style.backdropFilter = '';
      el.style.border = 'none';
    });

    // Reset nav links to default
    navLinks.forEach(link => {
      link.style.color = '#2e7d32';
      link.style.textShadow = 'none';
    });

    // Reset headings to default
    headings.forEach(h => {
      h.style.color = '';
      h.style.textShadow = 'none';
    });

    // Reset forecast text to default
    forecastText.forEach(span => {
      span.style.color = '#2e7d32';
    });

    // Reset containers to default
    containers.forEach(container => {
      container.style.backgroundColor = 'transparent';
      container.style.backdropFilter = '';
      container.style.border = 'none';
    });

    // Reset select elements to default
    selects.forEach(select => {
      select.style.backgroundColor = '#fff';
      select.style.color = '#2e7d32';
      select.style.border = '1px solid #2e7d32';
    });

    // Reset buttons to default
    buttons.forEach(button => {
      if (!button.classList.contains('theme-toggle')) {
        button.style.backgroundColor = '#2e7d32';
        button.style.color = '#fff';
        button.style.border = 'none';
      }
    });
  } else {
    // Premium Dark theme
    body.classList.add('dark-theme');
    body.style.background = 'linear-gradient(135deg, #0a0c1b, #1a1f35)';
    themeToggle.textContent = '☀️ Light';

    // Header styling
    header.style.backgroundColor = 'rgba(16, 18, 35, 0.8)';
    header.style.boxShadow = '0 1px 0 0 rgba(128,128,128,0.3)';
    header.style.backdropFilter = 'blur(10px)';
    logo.style.filter = 'brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.3))';

    // Role cards with premium styling
    roleCards.forEach(card => {
      card.style.background = 'linear-gradient(145deg, #151933, #1c2142)';
      card.style.color = '#e0f2f1';
      card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
      card.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    });

    // Weather sections
    sections.forEach(el => {
      el.style.backgroundColor = 'rgba(16, 18, 35, 0.9)';
      el.style.backdropFilter = 'blur(10px)';
      el.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    });

    // Navigation links
    navLinks.forEach(link => {
      link.style.color = '#7cb342';
      link.style.textShadow = '0 0 10px rgba(124, 179, 66, 0.3)';
    });

    // Headings with subtle glow
    headings.forEach(h => {
      h.style.color = '#ffffff';
      h.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.1)';
    });

    // Weather text
    forecastText.forEach(span => {
      span.style.color = '#e0f2f1';
    });

    // Container styling
    containers.forEach(container => {
      container.style.backgroundColor = 'rgba(26, 28, 45, 0.7)';
      container.style.backdropFilter = 'blur(10px)';
      container.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    });

    // Select and button styling
    selects.forEach(select => {
      select.style.backgroundColor = 'rgba(26, 28, 45, 0.9)';
      select.style.color = '#e0f2f1';
      select.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    });

    buttons.forEach(button => {
      if (!button.classList.contains('theme-toggle')) {
        button.style.backgroundColor = 'rgba(124, 179, 66, 0.2)';
        button.style.color = '#7cb342';
        button.style.border = '1px solid rgba(124, 179, 66, 0.3)';
      }
    });
  }

  // Save theme preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Toggle theme function that's called from the button
function toggleTheme() {
  const isDark = document.body.classList.contains('dark-theme');
  setTheme(!isDark);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme === 'dark');
});

// Language Change Function - English, Nepali, Hindi

function changeLanguage(lang) {
  const translations = {
    en: {
      welcome: "Welcome to Khetbaari 🌾",
      tagline: "Empowering farmers. Connecting communities. Choose your path below:",
      farmer: "Farmer",
      consumer: "Consumer"
    },
    ne: {
      welcome: "खेतबारीमा स्वागत छ 🌾",
      tagline: "किसानलाई सशक्त बनाउँदै। समुदायलाई जोड्दै। तल बाट आफ्नो बाटो छान्नुहोस्:",
      farmer: "किसान",
      consumer: "उपभोक्ता"
    },
    hi: {
      welcome: "खेतबारी में आपका स्वागत है 🌾",
      tagline: "किसानों को सशक्त बनाना। समुदायों को जोड़ना। नीचे अपना रास्ता चुनें:",
      farmer: "किसान",
      consumer: "उपभोक्ता"
    }
  };

  const t = translations[lang];
  document.querySelector("h1").textContent = t.welcome;
  document.querySelector("p").textContent = t.tagline;
  document.querySelectorAll(".role-card h2")[0].textContent = t.farmer;
  document.querySelectorAll(".role-card h2")[1].textContent = t.consumer;
}

