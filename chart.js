// Import Chart.js via CDN (Add this script tag in index.html)
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

// DOM Element for Chart
const chartCanvas = document.getElementById("chart").getContext("2d");

// Initialize Chart
let priceChart = new Chart(chartCanvas, {
  type: "line",
  data: {
    labels: [], // Timestamps
    datasets: [
      {
        data: [], // Prices
        backgroundColor: "rgba(30, 41, 59, 0.2)", // Light blue fill
        borderColor: "rgba(30, 41, 59, 1)", // Dark blue line
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart adjusts properly to its container
    plugins: {
      legend: {
        display: false, // Hides the legend to eliminate redundant text
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
          font: {
            size: 14,
          },
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    animation: {
      duration: 800, // Smooth transition for data updates
    },
  },
});

// Fetch Historical Data from Binance API
async function fetchHistoricalData(symbol) {
  const BASE_URL = "https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v3/klines";
  const interval = "1h"; // 1-hour interval
  const limit = 50; // Fetch 50 data points

  try {
    const response = await fetch(
      `${BASE_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch historical data");
    const data = await response.json();
    return data.map((candle) => ({
      time: new Date(candle[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // Format timestamp for readability
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
    priceChart.data.datasets[0].data = historicalData.map(
      (entry) => entry.price
    ); // Update prices
    priceChart.update(); // Redraw chart
  } else {
    console.error("No data available for chart.");
  }
}

// Event Listener: Update Chart on Dropdown Change
cryptoDropdown.addEventListener("change", () => {
  const selectedSymbol = cryptoDropdown.value;
  updateChart(selectedSymbol);
});

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
  const defaultSymbol = cryptoDropdown.value;
  updateChart(defaultSymbol); // Load chart for default selection
});
