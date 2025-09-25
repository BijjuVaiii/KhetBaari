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

// Store data in localStorage
const PRODUCTS_KEY = 'farmer_products';
const ORDERS_KEY = 'farmer_orders';

// Initialize data
let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
let orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');

// Theme handling
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active button
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add('active');

    // Refresh data when switching to sections
    if (sectionId === 'products') {
        displayProducts();
    } else if (sectionId === 'orders') {
        displayOrders();
    } else if (sectionId === 'analytics') {
        updateAnalytics();
    }
}

// Product Form
function showAddProductForm() {
    document.getElementById('form-title').textContent = 'Add New Product';
    document.getElementById('product-id').value = '';
    document.getElementById('product-form').classList.add('active');
    document.getElementById('add-product-form').reset();
}

function showEditProductForm(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('form-title').textContent = 'Edit Product';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-quantity').value = product.quantity;
    document.getElementById('product-image').value = product.image;
    document.getElementById('product-form').classList.add('active');
}

function closeProductForm() {
    document.getElementById('product-form').classList.remove('active');
    document.getElementById('add-product-form').reset();
}

// Product Management
function handleProductSubmit(event) {
    event.preventDefault();
    
    const productId = document.getElementById('product-id').value;
    const product = {
        id: productId || Date.now().toString(),
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        quantity: parseInt(document.getElementById('product-quantity').value),
        image: document.getElementById('product-image').value
    };

    if (productId) {
        // Edit existing product
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = product;
        }
    } else {
        // Add new product
        products.push(product);
    }

    // Save to localStorage
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    
    closeProductForm();
    displayProducts();
    updateAnalytics();
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        displayProducts();
        updateAnalytics();
    }
}

function displayProducts() {
    const productsContainer = document.getElementById('products-list');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ₹${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <div class="form-actions">
                <button onclick="showEditProductForm('${product.id}')" class="action-button">Edit</button>
                <button onclick="deleteProduct('${product.id}')" class="cancel-button">Delete</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Order Management
function filterOrders() {
    const status = document.getElementById('order-status-filter').value;
    displayOrders(status);
}

function displayOrders(statusFilter = 'all') {
    const ordersContainer = document.getElementById('orders-list');
    ordersContainer.innerHTML = '';

    const filteredOrders = statusFilter === 'all' 
        ? orders 
        : orders.filter(order => order.status === statusFilter);

    filteredOrders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-card';
        orderElement.innerHTML = `
            <h3>Order #${order.id}</h3>
            <p>Customer: ${order.customerName}</p>
            <p>Products: ${order.products.map(p => p.name).join(', ')}</p>
            <p>Total: ₹${order.total}</p>
            <p>Status: ${order.status}</p>
            <select onchange="updateOrderStatus('${order.id}', this.value)">
                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
            </select>
        `;
        ordersContainer.appendChild(orderElement);
    });
}

function updateOrderStatus(orderId, newStatus) {
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        displayOrders();
        updateAnalytics();
    }
}

// Analytics
function updateAnalytics() {
    // Calculate total sales
    const totalSales = orders
        .filter(order => order.status === 'delivered')
        .reduce((sum, order) => sum + order.total, 0);
    document.getElementById('total-sales').textContent = `₹${totalSales.toFixed(2)}`;

    // Count active products
    document.getElementById('active-products').textContent = products.length;

    // Count pending orders
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    document.getElementById('pending-orders').textContent = pendingOrders;

    // Update sales chart
    updateSalesChart();
}

function updateSalesChart() {
    const ctx = document.getElementById('sales-chart').getContext('2d');
    
    // Group orders by date
    const salesByDate = {};
    orders.forEach(order => {
        const date = new Date(order.date).toLocaleDateString();
        if (!salesByDate[date]) {
            salesByDate[date] = 0;
        }
        salesByDate[date] += order.total;
    });

    // Create chart data
    const labels = Object.keys(salesByDate);
    const data = Object.values(salesByDate);

    // If Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Sales',
                    data: data,
                    borderColor: '#2e7d32',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayOrders();
    updateAnalytics();
});