// Base URLs for Binance API with optional CORS Proxy
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"; // Use only if needed
const BINANCE_API_URL = `${CORS_PROXY}https://api.binance.com/api/v3/ticker/price`;
const BINANCE_KLINES_URL = `${CORS_PROXY}https://api.binance.com/api/v3/klines`;

// DOM Elements
const elements = {
  cryptoDropdown: document.getElementById("crypto-dropdown"),
  priceDisplay: document.getElementById("price-display"),
  chartCanvas: document.getElementById("chart").getContext("2d"),
  investmentInput: document.getElementById("investment-input"),
  simulateButton: document.getElementById("simulate-button"),
  tradeResult: document.getElementById("trade-result"),
};

// Initialize Chart
const priceChart = new Chart(elements.chartCanvas, {
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
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Price (USD)" } },
    },
  },
});

// Fetch Data from API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
    const data = await response.json();
    console.log("API Response:", data); // Log API response for debugging
    return data;
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return null;
  }
}

// Fetch Real-Time Price
async function fetchPrice(symbol) {
  const url = `${BINANCE_API_URL}?symbol=${symbol}`;
  const data = await fetchData(url);
  return data ? parseFloat(data.price).toFixed(2) : null;
}

// Fetch Historical Data for Chart
async function fetchHistoricalData(symbol) {
  const interval = "1h"; // 1-hour interval
  const limit = 50; // Fetch last 50 data points
  const url = `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const data = await fetchData(url);

  return data
    ? data.map((candle) => ({
        time: new Date(candle[0]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        price: parseFloat(candle[4]), // Close price
      }))
    : [];
}

// Update Real-Time Price Display
async function updatePrice() {
  const symbol = elements.cryptoDropdown.value;
  elements.priceDisplay.textContent = "Loading...";
  const price = await fetchPrice(symbol);

  elements.priceDisplay.textContent =
    price !== null ? `Current Price: $${price}` : "Unable to fetch price. Check your connection or try again.";
}

// Update Chart with Historical Data
async function updateChart() {
  const symbol = elements.cryptoDropdown.value;
  const historicalData = await fetchHistoricalData(symbol);

  if (historicalData.length) {
    priceChart.data.labels = historicalData.map((entry) => entry.time);
    priceChart.data.datasets[0].data = historicalData.map((entry) => entry.price);
    priceChart.update();
  } else {
    console.error("No historical data available for chart.");
  }
}

// Simulate Trade Function
async function simulateTrade() {
  const investment = parseFloat(elements.investmentInput.value);
  const symbol = elements.cryptoDropdown.value;

  if (isNaN(investment) || investment <= 0) {
    elements.tradeResult.textContent = "Please enter a valid investment amount.";
    return;
  }

  const price = await fetchPrice(symbol);
  if (!price) {
    elements.tradeResult.textContent = "Error fetching price. Try again.";
    return;
  }

  const holdings = (investment / price).toFixed(6);
  elements.tradeResult.textContent = `With $${investment}, you can buy ${holdings} ${symbol.slice(0, 3)} at the current price of $${price}.`;
}

// Event Listeners
elements.cryptoDropdown.addEventListener("change", () => {
  updatePrice();
  updateChart();
});
elements.simulateButton.addEventListener("click", simulateTrade);

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
  updatePrice();
  updateChart();
});
