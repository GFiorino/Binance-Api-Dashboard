const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";
const BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines";

const elements = {
  chartCanvas: document.getElementById("chart").getContext("2d"),
  investmentInput: document.getElementById("investment-input"),
  simulateButton: document.getElementById("simulate-button"),
  tradeResult: document.getElementById("trade-result"),
};

// Cryptocurrency symbols to track
const cryptoSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
const cryptoLabels = ["Bitcoin (BTC)", "Ethereum (ETH)", "Binance Coin (BNB)"];

const priceChart = new Chart(elements.chartCanvas, {
  type: "line",
  data: {
    labels: [],
    datasets: cryptoSymbols.map((symbol, index) => ({
      label: cryptoLabels[index],
      data: [],
      borderColor: `rgba(${(index + 1) * 80}, ${(index + 1) * 60}, 200, 1)`,
      backgroundColor: `rgba(${(index + 1) * 80}, ${(index + 1) * 60}, 200, 0.1)`,
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
          text: "Price (USD)",
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
          color: "#F5F5F5", // Ensure the legend matches the theme
        },
      },
    },
  },
});

async function fetchHistoricalData(symbol) {
  const interval = "1h";
  const limit = 50;
  const url = `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.map((candle) => ({
      time: new Date(candle[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      price: parseFloat(candle[4]),
    }));
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    return [];
  }
}

async function updateChart() {
  const historicalData = await Promise.all(
    cryptoSymbols.map((symbol) => fetchHistoricalData(symbol))
  );

  if (historicalData.length > 0 && historicalData[0].length > 0) {
    priceChart.data.labels = historicalData[0].map((entry) => entry.time); // Use timestamps from the first cryptocurrency
    priceChart.data.datasets.forEach((dataset, index) => {
      dataset.data = historicalData[index].map((entry) => entry.price);
    });
    priceChart.update();
  } else {
    console.error("Failed to fetch historical data or no data available.");
  }
}

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
      return `${cryptoLabels[index]}: ${holdings} (${price.toFixed(2)} USD)`;
    });

    elements.tradeResult.textContent = `With $${investment}, you can buy:\n` + tradeResults.join("\n");
  } catch (error) {
    console.error("Error simulating trade:", error);
    elements.tradeResult.textContent = "Error simulating trade. Try again.";
  }
}
async function updateChart() {
  const historicalData = await Promise.all(
    cryptoSymbols.map((symbol) => fetchHistoricalData(symbol))
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
    console.error("Failed to fetch historical data or no data available.");
  }
}
elements.simulateButton.addEventListener("click", simulateTrade);

// Automatically load and update the chart on page load
window.addEventListener("DOMContentLoaded", updateChart);
