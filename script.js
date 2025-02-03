// List of cryptocurrencies to compare
const CRYPTOCURRENCIES = [
  { symbol: "BTCUSDT", name: "Bitcoin" },
  { symbol: "ETHUSDT", name: "Ethereum" },
  { symbol: "BNBUSDT", name: "Binance Coin" },
];

// Initialize Chart with multiple datasets
const priceChart = new Chart(elements.chartCanvas, {
  type: "line",
  data: {
    labels: [], // Timestamps
    datasets: CRYPTOCURRENCIES.map((crypto) => ({
      label: crypto.name,
      data: [], // Prices
      borderColor: getRandomColor(), // Assign random color
      backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
      borderWidth: 2,
      tension: 0.4, // Smooth line
    })),
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Price (USD)" } },
    },
    plugins: {
      legend: { display: true, position: "top" },
    },
  },
});

// Fetch historical data for multiple cryptocurrencies
async function fetchHistoricalDataForMultiple() {
  const interval = "1h";
  const limit = 50;
  const requests = CRYPTOCURRENCIES.map((crypto) =>
    fetch(`${BINANCE_KLINES_URL}?symbol=${crypto.symbol}&interval=${interval}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) =>
        data.map((candle) => ({
          time: new Date(candle[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          price: parseFloat(candle[4]),
        }))
      )
  );
  return Promise.all(requests);
}

// Update chart with data for multiple cryptocurrencies
async function updateChart() {
  const historicalData = await fetchHistoricalDataForMultiple();
  const timestamps = historicalData[0]?.map((entry) => entry.time) || []; // Use timestamps from the first dataset

  priceChart.data.labels = timestamps;
  CRYPTOCURRENCIES.forEach((crypto, index) => {
    priceChart.data.datasets[index].data = historicalData[index]?.map((entry) => entry.price) || [];
  });
  priceChart.update();
}

// Helper function to generate random colors
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Initial load
window.addEventListener("DOMContentLoaded", updateChart);
