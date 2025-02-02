import { fetchHistoricalData, updateChart } from "./chart.js";

const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";

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
    labels: [],
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

// Fetch Real-Time Price
async function fetchPrice(symbol) {
  try {
    const response = await fetch(`${BINANCE_API_URL}?symbol=${symbol}`);
    if (!response.ok) throw new Error("Failed to fetch price data");
    const data = await response.json();
    return parseFloat(data.price).toFixed(2);
  } catch (error) {
    console.error("Error fetching price:", error);
    return null;
  }
}

// Update Real-Time Price
async function updatePrice() {
  const symbol = cryptoDropdown.value;
  const price = await fetchPrice(symbol);
  priceDisplay.textContent = price ? `Current Price: $${price}` : "Error fetching price";
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
  tradeResult.textContent = `With $${investment}, you can buy ${holdings} ${symbol.slice(0, 3)}.`;
}

// Event Listeners
cryptoDropdown.addEventListener("change", async () => {
  updatePrice();
  const symbol = cryptoDropdown.value;
  const data = await fetchHistoricalData(symbol);
  updateChart(priceChart, data);
});

simulateButton.addEventListener("click", simulateTrade);

// Initial Load
window.addEventListener("DOMContentLoaded", async () => {
  updatePrice();
  const symbol = cryptoDropdown.value;
  const data = await fetchHistoricalData(symbol);
  updateChart(priceChart, data);
});
