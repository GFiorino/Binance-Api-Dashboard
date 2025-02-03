const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";
const BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines";

const elements = {
  chartCanvas: document.getElementById("chart").getContext("2d"),
  investmentInput: document.getElementById("investment-input"),
  simulateButton: document.getElementById("simulate-button"),
  tradeResult: document.getElementById("trade-result"),
  timeframeDropdown: document.getElementById("timeframe-dropdown"),
};

// Cryptocurrency symbols to track
const cryptoSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
const cryptoLabels = ["Bitcoin (BTC)", "Ethereum (ETH)", "Binance Coin (BNB)"];

const colorPalette = [
  "rgba(243, 186, 47, 1)", // Bitcoin color
  "rgba(75, 192, 192, 1)", // Ethereum color
  "rgba(255, 99, 132, 1)", // Binance Coin color
];

// Timeframe options for Binance API
const timeframes = {
  "Last 24h": { interval: "1h", limit: 24 },
  "Last Week": { interval: "1d", limit: 7 },
  "Last Month": { interval: "1d", limit: 30 },
  "Last 3 Months": { interval: "1d", limit: 90 },
  "Last Year": { interval: "1w", limit: 52 },
};

// Chart Initialization
const priceChart = new Chart(elements.chartCanvas, {
  type: "line",
  data: {
    labels: [],
    datasets: cryptoSymbols.map((symbol, index) => ({
      label: cryptoLabels[index],
      data: [],
      borderColor: colorPalette[index],
      backgroundColor: `${colorPalette[index].replace("1)", "0.2)")}`,
      borderWidth: 2,
      fill: true,
    })),
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
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
          text: "Normalized Price (%)",
          color: "#F5F5F5",
        },
        ticks: {
          color: "#F5F5F5",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#F5F5F5", // Match legend with the theme
        },
      },
    },
  },
});

// Function to fetch historical data for a specific timeframe
async function fetchHistoricalData(symbol, timeframe) {
  const { interval, limit } = timeframes[timeframe];
  const url = `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.map((candle) => ({
      time: new Date(candle[0]).toLocaleDateString([], { month: "short", day: "numeric" }),
      price: parseFloat(candle[4]),
    }));
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return [];
  }
}

// Function to update the chart
async function updateChart(timeframe = "Last 24h") {
  const historicalData = await Promise.all(
    cryptoSymbols.map((symbol) => fetchHistoricalData(symbol, timeframe))
  );

  if (historicalData.length > 0 && historicalData[0].length > 0) {
    priceChart.data.labels = historicalData[0].map((entry) => entry.time); // Use timestamps from the first cryptocurrency

    priceChart.data.datasets.forEach((dataset, index) => {
      const maxPrice = Math.max(...historicalData[index].map((entry) => entry.price)); // Find max price for normalization
      dataset.data = historicalData[index].map((entry) => (entry.price / maxPrice) * 100); // Normalize to percentage
      dataset.label = `${cryptoLabels[index]} (Normalized)`;
    });

    priceChart.update();
  } else {
    console.error("No data available for the selected timeframe.");
  }
}

// Simulated trade functionality
async function simulateTrade() {
  const investment = parseFloat(elements.investmentInput.value);
  if (isNaN(investment) || investment <= 0) {
    elements.tradeResult.textContent = "Please enter a valid investment amount.";
    return;
  }

  try {
    const responses = await Promise.all(
      cryptoSymbols.map((symbol) =>
        fetch(`${BINANCE_API_URL}?symbol=${symbol}`).then((res) => res.json())
      )
    );

    const tradeResults = responses.map((response, index) => {
      const price = parseFloat(response.price);
      const holdings = (investment / price).toFixed(6);
      return `<span style="color:${colorPalette[index]}">${cryptoLabels[index]}:</span> ${holdings}`;
    });

    elements.tradeResult.innerHTML = `With $${investment}, you can buy:<br>` + tradeResults.join("<br>");
  } catch (error) {
    console.error("Error simulating trade:", error);
    elements.tradeResult.textContent = "Error simulating trade. Try again.";
  }
}

// Event listener for timeframe dropdown
elements.timeframeDropdown.addEventListener("change", (e) => {
  const selectedTimeframe = e.target.value;
  updateChart(selectedTimeframe);
});

// Automatically load the chart on page load with the default timeframe
window.addEventListener("DOMContentLoaded", () => {
  updateChart("Last 24h");
});
// Ensure the simulate button exists before adding the event listener
if (elements.simulateButton) {
  elements.simulateButton.addEventListener("click", simulateTrade);
} else {
  console.error("Simulate button not found in the DOM.");
}
