// Base URL for Binance API
const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";
const BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines";

// DOM Elements
const cryptoDropdown = document.getElementById("cryptoDropdown");
const priceDisplay = document.getElementById("realTimePrice");
const chartCanvas = document.getElementById("chart").getContext("2d");

// Initialize Chart
let priceChart = new Chart(chartCanvas, {
  type: "line",
  data: {
    labels: [], // Timestamps
    datasets: [
      {
        label: "Price",
        data: [], // Prices
        backgroundColor: "rgba(30, 41, 59, 0.2)", // Light blue fill
        borderColor: "rgba(30, 41, 59, 1)", // Dark blue line
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: "Time", color: "#F5F5F5" },
        ticks: { color: "#F5F5F5" },
      },
      y: {
        title: { display: true, text: "Price (USD)", color: "#F5F5F5" },
        ticks: { color: "#F5F5F5" },
      },
    },
    plugins: {
      legend: { display: false },
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
    return null;
  }
}

// Update Real-Time Price Display
async function updatePrice() {
  const selectedSymbol = cryptoDropdown.value; // Get selected cryptocurrency
  priceDisplay.textContent = "Loading..."; // Show loading state
  const price = await fetchPrice(selectedSymbol);
  if (price) {
    priceDisplay.textContent = `Current Price: $${price}`;
  } else {
    priceDisplay.textContent = "Error fetching price";
  }
}

// Fetch Historical Data for Chart
async function fetchHistoricalData(symbol) {
  try {
    const interval = "1h"; // 1-hour interval
    const limit = 50; // Fetch 50 data points
    const response = await fetch(
      `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch historical data");
    const data = await response.json();
    return data.map((candle) => ({
      time: new Date(candle[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // Format timestamp
      price: parseFloat(candle[4]), // Closing price
    }));
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
}

// Update Chart Data
async function updateChart() {
  const selectedSymbol = cryptoDropdown.value; // Get selected cryptocurrency
  const historicalData = await fetchHistoricalData(selectedSymbol);

  if (historicalData.length > 0) {
    priceChart.data.labels = historicalData.map((entry) => entry.time); // Update timestamps
    priceChart.data.datasets[0].data = historicalData.map(
      (entry) => entry.price
    ); // Update prices
    priceChart.update(); // Redraw chart
  } else {
    console.error("No data available for chart.");
  }
}

// Event Listener for Dropdown
cryptoDropdown.addEventListener("change", async () => {
  await updatePrice(); // Update price when selection changes
  await updateChart(); // Update chart when selection changes
});

// Initial Load
window.addEventListener("DOMContentLoaded", async () => {
  await updatePrice(); // Fetch price for the default selection on page load
  await updateChart(); // Fetch chart data for the default selection on page load
});
