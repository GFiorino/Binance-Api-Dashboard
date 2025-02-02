const BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines";

async function fetchHistoricalData(symbol) {
  try {
    const interval = "1h";
    const limit = 50;
    const response = await fetch(
      `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch historical data");
    const data = await response.json();
    return data.map((candle) => ({
      time: new Date(candle[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      price: parseFloat(candle[4]),
    }));
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
}

function updateChart(priceChart, data) {
  priceChart.data.labels = data.map((entry) => entry.time);
  priceChart.data.datasets[0].data = data.map((entry) => entry.price);
  priceChart.update();
}

export { fetchHistoricalData, updateChart };
