// CORS Proxy (if needed)
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"; // For development only
const BINANCE_API_URL = `${CORS_PROXY}https://api.binance.com/api/v3/ticker/price`;
const BINANCE_KLINES_URL = `${CORS_PROXY}https://api.binance.com/api/v3/klines`;

// DOM Elements
const cryptoDropdown = document.getElementById("crypto-dropdown");
const priceDisplay = document.getElementById("price-display");
const investmentInput = document.getElementById("investment-input");
const simulateButton = document.getElementById("simulate-button");
const tradeResult = document.getElementById("trade-result");
const chartCanvas = document.getElementById("chart").getContext("2d");

// Initialize Chart
const priceChart = new Chart(chartCanvas, {
  type: "line",
  data: {
    labels: [], // Timestamps
    datasets: [
      {
        label: "Price (USD)",
        data: [],
        borderColor: "rgba(243, 186, 47, 1)",
        backgroundColor: "rgba(243, 186, 47, 0.1)",
        borderWidth: 2,
        tension: 0.4,
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
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Fetch Real-Time Price
async function fetchPrice(symbol) {
  const url = `${BINANCE_API_URL}?symbol=${symbol}`;
  const data = await fetchData(url);
  return data ? parseFloat(data.price).toFixed(2) : null;
}

// Fetch Historical Data
async function fetchHistoricalData(symbol) {
  const url = `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=1h&limit=50`;
  const data = await fetchData(url);

  return data
    ? data.map((candle) => ({
        time: new Date(candle[0]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        price: parseFloat(candle[4]),
      }))
    : [];
}

// Update Real-Time Price Display
async function updatePrice() {
  const symbol = cryptoDropdown.value;
  const price = await fetchPrice(symbol);
  priceDisplay.textContent =
    price !== null ? `Current Price: $${price}` : "Error fetching price";
}

// Update Chart with Historical Data
async function updateChart() {
  const symbol = cryptoDropdown.value;
  const historicalData = await fetchHistoricalData(symbol);

  if (historicalData.length) {
    priceChart.data.labels = historicalData.map((entry) => entry.time);
    priceChart.data.datasets[0].data = historicalData.map((entry) => entry.price);
    priceChart.update();
  } else {
    console.error("No historical data available for chart.");
  }
}

// Simulate Trade
async function simulateTrade() {
  const investment = parseFloat(investmentInput.value);
  const symbol = cryptoDropdown.value;

  if (isNaN(investment) || investment <= 0) {
    tradeResult.textContent = "Please enter a valid investment amount.";
    return;
  }

  const price = await fetchPrice(symbol);
  if (!price) {
    tradeResult.textContent = "Error fetching price.";
    return;
  }

  const holdings = (investment / price).toFixed(6);
  tradeResult.textContent = `With $${investment}, you can buy ${holdings} ${symbol.slice(
    0,
    3
  )} at the current price of $${price}.`;
}

// Event Listeners
cryptoDropdown.addEventListener("change", () => {
  updatePrice();
  updateChart();
});
simulateButton.addEventListener("click", simulateTrade);

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
  updatePrice();
  updateChart();
});
