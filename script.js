// Base URLs for Binance API
const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";
const BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines";

// DOM Elements
const cryptoDropdown = document.getElementById("crypto-dropdown");
const priceDisplay = document.getElementById("price-display");
const chartCanvas = document.getElementById("chart").getContext("2d");

// Initialize Chart
let priceChart = new Chart(chartCanvas, {
  type: "line",
  data: {
    labels: [], // Timestamps
    datasets: [
      {
        label: "Price (USD)",
        data: [], // Prices
        borderColor: "rgba(243, 186, 47, 1)", // Binance Yellow
        backgroundColor: "rgba(243, 186, 47, 0.1)", // Light yellow fill
        borderWidth: 2,
        tension: 0.4, // Smooth line
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: "Time" },
      },
      y: {
        title: { display: true, text: "Price (USD)" },
      },
    },
  },
});

// Fetch Real-Time Price
async function fetchPrice(symbol) {
  try {
    const response = await fetch(`${BINANCE_API_URL}?symbol=${symbol}`);
    if (!response.ok) throw new Error("Failed to fetch price data");
    const data = await response.json();
    return parseFloat(data.price).toFixed(2); // Format price to 2 decimal places
  } catch (error) {
    console.error("Error fetching price:", error);
    return "Error fetching price";
  }
}

// Fetch Historical Data for Chart
async function fetchHistoricalData(symbol) {
  const interval = "1h"; // 1-hour interval
  const limit = 50; // Fetch last 50 data points
  try {
    const response = await fetch(
      `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch historical data");
    const data = await response.json();
    return data.map((candle) => ({
      time: new Date(candle[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      price: parseFloat(candle[4]), // Close price
    }));
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
}

// Update Real-Time Price Display
async function updatePrice() {
  const selectedSymbol = cryptoDropdown.value; // Get selected cryptocurrency
  priceDisplay.textContent = "Loading..."; // Show loading state
  const price = await fetchPrice(selectedSymbol);
  if (price !== "Error fetching price") {
    priceDisplay.textContent = `Current Price: $${price}`;
  } else {
    priceDisplay.textContent = price;
  }
}

// Update Chart with Historical Data
async function updateChart() {
  const selectedSymbol = cryptoDropdown.value;
  const historicalData = await fetchHistoricalData(selectedSymbol);

  if (historicalData.length > 0) {
    priceChart.data.labels = historicalData.map((entry) => entry.time); // Update timestamps
    priceChart.data.datasets[0].data = historicalData.map((entry) => entry.price); // Update prices
    priceChart.update(); // Redraw chart
  } else {
    console.error("No data available for chart.");
  }
}

// Event Listener for Dropdown Change
cryptoDropdown.addEventListener("change", () => {
  updatePrice();
  updateChart();
});

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
  updatePrice(); // Fetch price for the default selection on page load
  updateChart(); // Load chart for default selection
});
