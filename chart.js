// Base URL for Binance API
const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";
const BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines";

// DOM Elements
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
        backgroundColor: "rgba(243, 186, 47, 0.2)", // Light yellow fill
        borderWidth: 2,
        tension: 0.4, // Smooth line
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#F5F5F5", // Light text
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "#F5F5F5",
        },
        ticks: {
          color: "#F5F5F5",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
          color: "#F5F5F5",
        },
        ticks: {
          color: "#F5F5F5",
        },
      },
    },
  },
});

// Fetch Historical Data from Binance API
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
      time: new Date(candle[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // Format timestamp
      price: parseFloat(candle[4]), // Close price
    }));
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
}

// Update Chart Data
async function updateChart(symbol) {
  const historicalData = await fetchHistoricalData(symbol);

  if (historicalData.length > 0) {
    priceChart.data.labels = historicalData.map((entry) => entry.time); // Update timestamps
    priceChart.data.datasets[0].data = historicalData.map((entry) => entry.price); // Update prices
    priceChart.update(); // Redraw chart
  } else {
    console.error("No data available for chart.");
  }
}

// On Dropdown Change, Update Chart
document.getElementById("crypto-dropdown").addEventListener("change", (event) => {
  const selectedSymbol = event.target.value;
  updateChart(selectedSymbol);
});

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
  const defaultSymbol = document.getElementById("crypto-dropdown").value;
  updateChart(defaultSymbol); // Load chart for default selection
});
